pipeline {
    agent any

    tools {
        nodejs '22.3.0'
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'mangatoon-gitlab', url: 'https://gitlab.com/datnmptit/mangatoon.git'
                script {
                    unzip './volumes.zip'
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm install -g yarn'
                dir('./story-api') {
                    sh 'yarn install'
                    sh 'yarn build'
                }
            }
        }

        stage('Test') {

        }

        stage('Deploy') {

        }
    }
}