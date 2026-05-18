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
                            sh 'npm install'
                            sh 'npm test'
                        }
                    }
                }
                stage('Terraform Validate') {
                    steps {
                        dir('infra') {
                            sh 'terraform init -backend=false'
                            sh 'terraform validate'
                        }
                    }
                }
            }
        }

        stage('🐳 Build Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('🚀 Deploy') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d'
                sh 'sleep 40'
            }
        }

        stage('✅ Smoke Tests') {
            steps {
                script {
                    def total = sh(script: "curl -sf http://localhost:3000/api/products | python3 -c \"import sys,json; print(json.load(sys.stdin)['total'])\"", returnStdout: true).trim()
                    if (total != '16') {
                        error("Expected 16 products, got ${total}")
                    }
                    echo "✅ Products API: ${total} products"

                    def status = sh(script: """curl -sf -X POST http://localhost:3000/api/cart/checkout \
                        -H 'Content-Type: application/json' \
                        -d '{"items":[{"id":1,"qty":1}]}' | python3 -c "import sys,json; print(json.load(sys.stdin)['status'])" """, returnStdout: true).trim()
                    if (status != 'confirmed') {
                        error("Checkout failed: ${status}")
                    }
                    echo "✅ Checkout: ${status}"

                    def httpCode = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/api/products/999", returnStdout: true).trim()
                    if (httpCode != '404') {
                        error("Expected 404, got ${httpCode}")
                    }
                    echo "✅ 404 handling: correct"
                }
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
