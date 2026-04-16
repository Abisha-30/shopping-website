pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Pull code from GitHub
                git branch: 'main', url: 'https://github.com/Abisha-30/shopping-website.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Building shopping website...'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying website...'
            }
        }
    }
}
