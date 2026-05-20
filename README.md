<p align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.4.1-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Terraform-1.9-844FBA?logo=terraform&logoColor=white" alt="Terraform">
  <img src="https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes&logoColor=white" alt="Kubernetes">
  <img src="https://img.shields.io/badge/Prometheus-v2.54-E6522C?logo=prometheus&logoColor=white" alt="Prometheus">
  <img src="https://img.shields.io/badge/Grafana-11.1-F46800?logo=grafana&logoColor=white" alt="Grafana">
  <img src="https://img.shields.io/badge/Jenkins-LTS-D24939?logo=jenkins&logoColor=white" alt="Jenkins">
</p>

# 🛒 ShopVerse — Microservices E-Commerce Platform

A production-ready e-commerce application refactored from a monolith into a **microservices architecture** with a complete **DevOps toolchain** — containerization, orchestration, CI/CD, infrastructure-as-code, monitoring, and security scanning.

> **Built for INT377: Cloud Computing & DevOps Essentials** — covers all 6 Course Outcomes (CO1–CO6).

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Nginx :3000)                     │
│              Static HTML/CSS/JS + Reverse Proxy              │
│         /api/products → :8080    /api/cart/ → :8001          │
└──────────────┬──────────────────────────┬────────────────────┘
               │                          │
    ┌──────────▼──────────┐    ┌──────────▼──────────┐
    │   Product Service   │    │    Cart Service      │
    │  Spring Boot 3.4    │    │   Express 4 + Joi    │
    │  Java 21 + JPA      │◄───│   Node.js 20         │
    │  /actuator/prometheus│    │   /metrics            │
    └──────────┬──────────┘    └──────────────────────┘
               │
    ┌──────────▼──────────┐
    │   PostgreSQL 16     │
    │   16 seeded products│
    └─────────────────────┘

    ┌─────────────────────┐    ┌──────────────────────┐
    │    Prometheus 2.54  │───▶│   Grafana 11.1       │
    │    :9090            │    │   :3001               │
    └─────────────────────┘    └──────────────────────┘
```

## ✨ Features

- **Product Catalog** — 16 products with images, pagination (server-side, capped at 100), category filtering
- **Shopping Cart** — Add/remove items, quantity management, coupon validation (SAVE10, SHOP20, FLAT500)
- **Checkout** — Server-side price verification (prevents price tampering), tax calculation (18% GST)
- **Responsive UI** — Dark/light mode, animated product cards, glassmorphism design
- **API-First** — All data fetched from REST APIs, zero hardcoded products in frontend

## 📁 Project Structure (60 files)

```
ShopVerse/
├── product-service/            # Java 21 + Spring Boot 3.4 + JPA
│   ├── Dockerfile              #   Multi-stage Maven → JRE Alpine
│   ├── pom.xml                 #   Actuator, Micrometer, JPA, H2 (test)
│   └── src/                    #   Controller → Service → Repository → Entity
│
├── cart-service/               # Node.js 20 + Express 4 + Joi
│   ├── Dockerfile              #   Single-stage Node Alpine
│   ├── __tests__/              #   8 Jest + Supertest unit tests
│   └── src/                    #   Routes, validators, middleware
│
├── frontend/                   # Nginx 1.25 + Static assets
│   ├── nginx.conf              #   Reverse proxy config
│   └── *.html, *.css, *.js     #   4 pages, fully API-driven
│
├── k8s/                        # Kubernetes manifests (6 files)
│   ├── namespace.yaml          #   shopverse namespace
│   ├── configmap.yaml          #   ConfigMap + Secret
│   └── *-deployment.yaml       #   Deployments + Services + PVC
│
├── infra/                      # Terraform — AWS (EC2 + RDS)
│   ├── main.tf                 #   RDS PostgreSQL 16
│   ├── ec2.tf                  #   EC2 + Security Groups + auto-bootstrap
│   ├── userdata.sh.tpl         #   EC2 auto-setup script
│   ├── variables.tf / outputs.tf
│   └── terraform.tfvars.example
│
├── monitoring/                 # Prometheus + Grafana
│   ├── prometheus.yml          #   Scrape configs (3 targets)
│   └── grafana/                #   Auto-provisioned 6-panel dashboard
│
├── scripts/bootstrap.sh        # One-command EC2 setup script
├── Jenkinsfile                 # 5-stage Jenkins pipeline
├── .github/workflows/ci.yml    # 5-stage GitHub Actions pipeline
├── compose.yaml                # Docker Compose — 4 core services
├── compose.full.yaml           # + Jenkins + Prometheus + Grafana
├── compose.monitoring.yaml     # Lightweight monitoring only
├── DEPLOY_GUIDE.md             # Step-by-step deployment (3 options)
├── RUNBOOK.md                  # Operations manual (14 sections)
└── README.md                   # This file
```

## 🚀 Quick Start

```bash
# Clone and start (only Docker required)
git clone <repo-url> && cd ShopVerse
docker-compose up --build -d

# Wait ~30s for Spring Boot startup, then open:
# 🌐 App:        http://localhost:3000
```

### Full Stack (App + Jenkins + Prometheus + Grafana)

```bash
docker-compose -f compose.yaml -f compose.full.yaml up --build -d

# 🌐 App:        http://localhost:3000
# 🔧 Jenkins:    http://localhost:9095
# 📊 Prometheus: http://localhost:9090
# 📈 Grafana:    http://localhost:3001  (admin / shopverse)
```

> 📖 **First time?** See [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) for step-by-step instructions.
> 🔧 **Need ops details?** See [RUNBOOK.md](RUNBOOK.md) for the full operations manual.

## 🧪 Testing

```bash
# Cart Service unit tests (8 tests)
cd cart-service && npm test

# Product Service unit tests (3 tests)
cd product-service && ./mvnw test

# Terraform validation
cd infra && terraform init -backend=false && terraform validate

# API smoke tests
curl http://localhost:3000/api/products          # 16 products
curl http://localhost:3000/api/products/1         # Single product
curl http://localhost:3000/api/products?limit=3   # Pagination
```

## 🎓 INT377 Course Outcome Coverage

| CO | Topic | Implementation |
|----|-------|---------------|
| **CO1** | Cloud & DevOps Fundamentals | Microservices architecture, Git workflow, `.gitignore` |
| **CO2** | Virtualization & Containers | 3 Dockerfiles, Docker Compose, 6 Kubernetes manifests |
| **CO3** | Infrastructure as Code | Terraform → AWS EC2 + RDS (auto-provisioning with userdata bootstrap) |
| **CO4** | CI/CD Pipelines | GitHub Actions (5-stage) + Jenkins (5-stage Jenkinsfile) |
| **CO5** | Monitoring & Security | Prometheus + Grafana (6-panel dashboard), Trivy container scanning |
| **CO6** | Advanced Topics | K8s Secrets, resource limits, readiness/liveness probes, DevSecOps |

## 📊 CI/CD Pipeline (GitHub Actions)

```
┌──────────┐   ┌──────────────┐   ┌──────────────┐   ┌───────────────┐   ┌──────────────┐
│  Stage 1 │──▶│   Stage 2    │──▶│   Stage 3    │──▶│   Stage 4     │   │   Stage 5    │
│  Tests   │   │  Security    │   │  Build &     │   │  Integration  │   │  Terraform   │
│  (JUnit  │   │  (Trivy      │   │  Push to     │   │  Test (curl   │   │  Validate    │
│  + Jest) │   │  Scan)       │   │  GHCR)       │   │  smoke tests) │   │              │
└──────────┘   └──────────────┘   └──────────────┘   └───────────────┘   └──────────────┘
```

## 🛡️ Security Features

- **Container Scanning** — Trivy in CI pipeline scans for CVEs
- **No Hardcoded Secrets** — Environment variables via `.env` / K8s Secrets
- **Server-Side Price Verification** — Cart Service fetches real prices from Product Service
- **Input Validation** — Joi schemas on cart, Bean Validation on products
- **Resource Limits** — K8s CPU/memory limits on all deployments
- **Health Probes** — Readiness + liveness probes prevent routing to unhealthy pods

## 📜 License

MIT

---

<p align="center">
  <b>Built with ☕ Java, 🟢 Node.js, 🐘 PostgreSQL, 🐳 Docker, ☸️ Kubernetes, 🔥 Prometheus, and 📊 Grafana</b>
</p>
# webhook test
# check
# check again
# check again
