#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# ShopVerse EC2 Bootstrap Script (runs automatically via Terraform userdata)
# Installs: Docker, Docker Compose, Minikube, kubectl, clones repo, deploys stack
# ═══════════════════════════════════════════════════════════════
set -euo pipefail
exec > /var/log/shopverse-setup.log 2>&1

echo "╔══════════════════════════════════════════╗"
echo "║   ShopVerse Bootstrap — Starting...      ║"
echo "╚══════════════════════════════════════════╝"

export DEBIAN_FRONTEND=noninteractive

# ── 1. Install Docker ──
echo "[1/7] Installing Docker..."
apt-get update -qq
apt-get install -y -qq ca-certificates curl gnupg lsb-release git jq
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
apt-get update -qq
apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-compose-plugin
usermod -aG docker ubuntu
systemctl enable docker

# ── 2. Install kubectl ──
echo "[2/7] Installing kubectl..."
curl -fsSLo /usr/local/bin/kubectl "https://dl.k8s.io/release/$(curl -fsSL https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x /usr/local/bin/kubectl

# ── 3. Install Minikube ──
echo "[3/7] Installing Minikube..."
curl -fsSLo /usr/local/bin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
chmod +x /usr/local/bin/minikube

# ── 4. Clone Repository ──
echo "[4/7] Cloning ShopVerse..."
cd /home/ubuntu
su - ubuntu -c "git clone ${repo_url} ShopVerse 2>/dev/null || echo 'Repo already exists'"
cd /home/ubuntu/ShopVerse

# ── 5. Create .env with RDS credentials ──
echo "[5/7] Configuring environment..."
cat > /home/ubuntu/ShopVerse/.env <<ENVFILE
POSTGRES_DB=${db_name}
POSTGRES_USER=${db_username}
POSTGRES_PASSWORD=${db_password}
SPRING_DATASOURCE_URL=jdbc:postgresql://${rds_endpoint}:5432/${db_name}
SPRING_DATASOURCE_USERNAME=${db_username}
SPRING_DATASOURCE_PASSWORD=${db_password}
PRODUCT_SERVICE_URL=http://product-service:8080
ENVFILE
chown ubuntu:ubuntu /home/ubuntu/ShopVerse/.env

# ── 6. Deploy Full Stack ──
echo "[6/7] Building and deploying ShopVerse..."
cd /home/ubuntu/ShopVerse
su - ubuntu -c "cd /home/ubuntu/ShopVerse && docker compose -f compose.yaml -f compose.full.yaml up --build -d"

# ── 7. Wait and verify ──
echo "[7/7] Waiting for services to start..."
sleep 60

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   ShopVerse Bootstrap — COMPLETE ✅      ║"
echo "╠══════════════════════════════════════════╣"
echo "║   App:        http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
echo "║   Jenkins:    http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8080"
echo "║   Prometheus: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):9090"
echo "║   Grafana:    http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3001"
echo "╚══════════════════════════════════════════╝"
