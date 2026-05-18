# ── RDS Outputs ──
output "rds_endpoint" {
  description = "RDS instance endpoint (hostname)"
  value       = aws_db_instance.shopverse.endpoint
}

output "rds_port" {
  description = "RDS instance port"
  value       = aws_db_instance.shopverse.port
}

output "database_url" {
  description = "Full JDBC connection URL for Spring Boot"
  value       = "jdbc:postgresql://${aws_db_instance.shopverse.endpoint}/${var.db_name}"
  sensitive   = true
}

# ── EC2 Outputs ──
output "ec2_public_ip" {
  description = "Public IP of the ShopVerse server"
  value       = aws_instance.shopverse.public_ip
}

output "app_url" {
  description = "ShopVerse Application URL"
  value       = "http://${aws_instance.shopverse.public_ip}:3000"
}

output "jenkins_url" {
  description = "Jenkins CI/CD URL"
  value       = "http://${aws_instance.shopverse.public_ip}:9095"
}

output "prometheus_url" {
  description = "Prometheus Monitoring URL"
  value       = "http://${aws_instance.shopverse.public_ip}:9090"
}

output "grafana_url" {
  description = "Grafana Dashboard URL"
  value       = "http://${aws_instance.shopverse.public_ip}:3001"
}

output "ssh_command" {
  description = "SSH command to connect to the server"
  value       = "ssh -i your-key.pem ubuntu@${aws_instance.shopverse.public_ip}"
}
