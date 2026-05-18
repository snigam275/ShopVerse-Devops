variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "ap-south-1"
}

variable "vpc_id" {
  description = "VPC ID where resources will be created"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs (must be in different AZs for RDS)"
  type        = list(string)
}

variable "db_name" {
  description = "Name of the PostgreSQL database"
  type        = string
  default     = "shopverse"
}

variable "db_username" {
  description = "Master username for the RDS instance"
  type        = string
  default     = "shopverse"
}

variable "db_password" {
  description = "Master password for the RDS instance"
  type        = string
  sensitive   = true
}

# ── EC2 Variables ──

variable "ec2_instance_type" {
  description = "EC2 instance type (t3.medium minimum for Docker + Jenkins)"
  type        = string
  default     = "t3.medium"
}

variable "ssh_public_key" {
  description = "SSH public key content (leave empty to use existing_key_pair_name)"
  type        = string
  default     = ""
}

variable "existing_key_pair_name" {
  description = "Name of an existing AWS key pair (used if ssh_public_key is empty)"
  type        = string
  default     = ""
}

variable "repo_url" {
  description = "Git repository URL to clone on EC2"
  type        = string
  default     = "https://github.com/utkarshraj1/ShopVerse.git"
}
