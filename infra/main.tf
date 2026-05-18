terraform {
  required_version = ">= 1.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ── Security Group ──
resource "aws_security_group" "shopverse_db_sg" {
  name        = "shopverse-db-sg"
  description = "Allow PostgreSQL access from within VPC"
  vpc_id      = var.vpc_id

  ingress {
    description = "PostgreSQL from VPC"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "shopverse-db-sg"
    Project = "ShopVerse"
  }
}

# ── DB Subnet Group ──
resource "aws_db_subnet_group" "shopverse" {
  name       = "shopverse-db-subnet"
  subnet_ids = var.subnet_ids

  tags = {
    Name    = "shopverse-db-subnet"
    Project = "ShopVerse"
  }
}

# ── RDS PostgreSQL Instance ──
resource "aws_db_instance" "shopverse" {
  identifier     = "shopverse-db"
  engine         = "postgres"
  engine_version = "16.4"
  instance_class = "db.t3.micro" # Free tier eligible

  allocated_storage     = 20
  max_allocated_storage = 50
  storage_type          = "gp3"

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.shopverse.name
  vpc_security_group_ids = [aws_security_group.shopverse_db_sg.id]

  publicly_accessible = false
  skip_final_snapshot  = true

  backup_retention_period = 7
  multi_az                = false

  tags = {
    Name    = "shopverse-db"
    Project = "ShopVerse"
  }
}
