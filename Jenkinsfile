pipeline {
    agent any
    tools { nodejs "NodeJS" }
    environment { 
        registry = "miralbarhoumi1/devopsprojectfront" 
        registryCredential = 'dockerHub' 
	
	dockerImage = '' 
    }		

    stages {
        stage('Checkout GIT') {
            steps {

                echo 'Pulling...';
                git branch: 'main',
                url : 'https://github.com/1906miral/AngularDevOps',
		credentialsId: 'github';
            }
        }
	    
        stage('Install') {
          
          steps { 
            echo 'Installing ...';
            sh 'npm install'; }
        }
      
        stage('Build') {
        steps {
          echo 'Building ...';
          sh 'npm run build --prod'; }
        }
      
        stage('show Node version') {
            steps {
                echo 'Showing Node version ...';
                sh """ node --version """;
            }
        }

      stage('Building our image') { 
            steps { 
                script { 
                    dockerImage = docker.build registry + ":latest" 
                }
            } 
        }

        stage('Deploy our image') { 
            steps { 
                script { 
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push() 
                    }
                } 
            }
        } 

        stage('Cleaning up') { 
            steps { 
                sh "docker rmi $registry:latest" 
            }
        }
      
	 stage('Docker-compose') {
            steps {
                echo 'Running docker-compose...';
                sh """ docker-compose up -d""";
               sh """ docker-compose ps """;
            }
        }

        stage('show Date') {
            steps {
                echo 'Showing Date...';
                sh """ date """;
            }
        }

    }
  
    post {
            always{
                
                emailext to: "miral.barhoumi@esprit.tn",
                subject: "[DevOps Angular]jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here:http://192.168.1.149:8080/job/Angular/",
		attachLog: true
                
            }
        }	


}
