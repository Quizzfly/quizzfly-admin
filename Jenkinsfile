pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/Quizzfly/quizzfly-admin.git'
            }
        }
        stage('Stop Existing Container') {
            steps {
                script {
                    sh 'docker-compose down || true'
                }
            }
        }
        stage('Build and Deploy with Docker Compose') {
            steps {
                sh 'docker-compose up --build -d'
            }
        }
    }
    post {
        always {
            script {
                sh 'docker-compose logs'
            }
        }
    }
}