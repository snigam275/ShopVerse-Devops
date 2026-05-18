# ═══════════════════════════════════════════════════════════════
# ShopVerse Full Stack — EC2 + RDS provisioned by Terraform
# This file adds an EC2 instance to the existing RDS setup.
# ═══════════════════════════════════════════════════════════════

# ── Data Sources ──
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-amd64/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# ── EC2 Security Group ──
resource "aws_security_group" "shopverse_ec2_sg" {
  name        = "shopverse-ec2-sg"
  description = "ShopVerse EC2 — SSH, HTTP, App ports, Jenkins, Prometheus, Grafana"
  vpc_id      = var.vpc_id

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # App (Nginx)
  ingress {
    description = "ShopVerse App"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Jenkins
  ingress {
    description = "Jenkins"
    from_port   = 9095
    to_port     = 9095
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Prometheus
  ingress {
    description = "Prometheus"
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Grafana
  ingress {
    description = "Grafana"
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # K8s NodePort range
  ingress {
    description = "K8s NodePort range"
    from_port   = 30000
    to_port     = 32767
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "shopverse-ec2-sg"
    Project = "ShopVerse"
  }
}

# ── Allow EC2 → RDS ──
resource "aws_security_group_rule" "ec2_to_rds" {
  type                     = "ingress"
  from_port                = 5432
  to_port                  = 5432
  protocol                 = "tcp"
  security_group_id        = aws_security_group.shopverse_db_sg.id
  source_security_group_id = aws_security_group.shopverse_ec2_sg.id
  description              = "Allow EC2 to connect to RDS"
}

# ── SSH Key Pair ──
resource "aws_key_pair" "shopverse" {
  count      = var.ssh_public_key != "" ? 1 : 0
  key_name   = "shopverse-key"
  public_key = var.ssh_public_key

  tags = {
    Project = "ShopVerse"
  }
}

# ── EC2 Instance ──
resource "aws_instance" "shopverse" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.ec2_instance_type
  subnet_id              = var.subnet_ids[0]
  vpc_security_group_ids = [aws_security_group.shopverse_ec2_sg.id]
  key_name               = var.ssh_public_key != "" ? aws_key_pair.shopverse[0].key_name : var.existing_key_pair_name

  root_block_device {
    volume_size = 25
    volume_type = "gp3"
  }

  user_data = templatefile("${path.module}/userdata.sh.tpl", {
    rds_endpoint = aws_db_instance.shopverse.address
    db_name      = var.db_name
    db_username  = var.db_username
    db_password  = var.db_password
    repo_url     = var.repo_url
  })

  tags = {
    Name    = "shopverse-server"
    Project = "ShopVerse"
  }

  depends_on = [aws_db_instance.shopverse]
}
