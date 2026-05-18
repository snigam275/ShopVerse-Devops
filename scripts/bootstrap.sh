#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# ShopVerse — One-Command EC2 Setup Script
# Run this AFTER SSH-ing into your EC2 instance.
#
# Usage:  chmod +x scripts/bootstrap.sh && ./scripts/bootstrap.sh
# ═══════════════════════════════════════════════════════════════
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════╗"
echo "║   ShopVerse — Full Stack Setup           ║"
echo "║   Docker + Jenkins + Prometheus + Grafana ║"
echo "╚══════════════════════════════════════════╝"
echo -e "${NC}"

# ── Check if running on Ubuntu ──
if ! command -v lsb_release &>/dev/null || [ "$(lsb_release -is)" != "Ubuntu" ]; then
  echo -e "${RED}This script requires Ubuntu 22.04. Exiting.${NC}"
  exit 1
fi

# ── Step 1: Docker ──
echo -e "\n${YELLOW}[1/5] Installing Docker...${NC}"
if ! command -v docker &>/dev/null; then
  sudo apt-get update -qq
  sudo apt-get install -y -qq ca-certificates curl gnupg lsb-release git jq
  sudo install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  sudo chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update -qq
  sudo apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-compose-plugin
  sudo usermod -aG docker "$USER"
  echo -e "${GREEN}  Docker installed ✅${NC}"
else
  echo -e "${GREEN}  Docker already installed ✅${NC}"
fi

# ── Step 2: kubectl ──
echo -e "\n${YELLOW}[2/5] Installing kubectl...${NC}"
if ! command -v kubectl &>/dev/null; then
  curl -fsSLo /tmp/kubectl "https://dl.k8s.io/release/$(curl -fsSL https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
  sudo install -o root -g root -m 0755 /tmp/kubectl /usr/local/bin/kubectl
  echo -e "${GREEN}  kubectl installed ✅${NC}"
else
  echo -e "${GREEN}  kubectl already installed ✅${NC}"
fi

# ── Step 3: Minikube ──
echo -e "\n${YELLOW}[3/5] Installing Minikube...${NC}"
if ! command -v minikube &>/dev/null; then
  curl -fsSLo /tmp/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  sudo install -o root -g root -m 0755 /tmp/minikube /usr/local/bin/minikube
  echo -e "${GREEN}  Minikube installed ✅${NC}"
else
  echo -e "${GREEN}  Minikube already installed ✅${NC}"
fi

# ── Step 4: Deploy Full Stack ──
echo -e "\n${YELLOW}[4/5] Deploying ShopVerse (App + Jenkins + Prometheus + Grafana)...${NC}"
cd "$(dirname "$0")/.."

# Use newgrp to pick up docker group if just added
if ! docker info &>/dev/null 2>&1; then
  echo -e "${YELLOW}  Docker group was just added. Re-running with sudo...${NC}"
  sudo docker compose -f compose.yaml -f compose.full.yaml up --build -d
else
  docker compose -f compose.yaml -f compose.full.yaml up --build -d
fi

# ── Step 5: Wait and verify ──
echo -e "\n${YELLOW}[5/5] Waiting for services to start (60s)...${NC}"
sleep 60

# Get public IP
PUBLIC_IP=$(curl -sf http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || hostname -I | awk '{print $1}')

echo -e "\n${GREEN}"
echo "╔══════════════════════════════════════════════════════╗"
echo "║              ShopVerse — DEPLOYED ✅                 ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║                                                      ║"
echo "║  🌐 App:        http://$PUBLIC_IP:3000               "
echo "║  🔧 Jenkins:    http://$PUBLIC_IP:9095               "
echo "║  📊 Prometheus: http://$PUBLIC_IP:9090               "
echo "║  📈 Grafana:    http://$PUBLIC_IP:3001               "
echo "║                                                      ║"
echo "║  Grafana Login:  admin / shopverse                   ║"
echo "║                                                      ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║  Jenkins Initial Password:                           ║"
echo "║  $(sudo docker exec shopverse-main-jenkins-1 cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null || echo '  (still starting, run: docker exec shopverse-main-jenkins-1 cat /var/jenkins_home/secrets/initialAdminPassword)')"
echo "╚══════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${BLUE}Next steps:${NC}"
echo "  1. Open Jenkins at http://$PUBLIC_IP:9095"
echo "  2. Paste the initial admin password shown above"
echo "  3. Install suggested plugins"
echo "  4. Create admin user"
echo "  5. Create a Pipeline job → Pipeline from SCM → Git → your repo URL"
echo ""
echo "  To start Minikube for K8s demo:"
echo "    minikube start --driver=docker --cpus=2 --memory=3000"
echo ""
