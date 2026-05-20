// ═══════════════════════════════════════════════════════════════
// ShopVerse Jenkinsfile — Declarative CI/CD Pipeline (Unit IV)
// ═══════════════════════════════════════════════════════════════
pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'compose.yaml'
    }

    stages {
        stage('📥 Checkout') {
            steps {
                checkout scm
            }
        }

        stage('🧪 Unit Tests') {
            parallel {
                stage('Cart Service Tests') {
                    steps {
                        dir('cart-service') {
                            bat 'npm install'
                            bat 'npm test'
                        }
                    }
                }
                stage('Terraform Validate') {
                    steps {
                        dir('infra') {
                            bat 'terraform init -backend=false'
                            bat 'terraform validate'
                        }
                    }
                }
            }
        }

        stage('🐳 Build Images') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('🚀 Deploy') {
            steps {
            bat 'docker compose -f compose.yaml down'
            bat 'docker stop shopverse-devops-frontend-1 || exit 0'
            bat 'docker compose -f compose.yaml up -d'
            sleep(time: 40, unit: 'SECONDS')
            }
        }
    }

    post {
        always {
            echo '🏁 Pipeline complete'
        }
        success {
            echo '🎉 All stages passed!'
        }
        failure {
            echo '❌ Pipeline failed. Check logs above.'
        }
    }
}
