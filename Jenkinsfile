pipeline {
    agent any

    environment {
        REMOTE_SERVER_HOST = '192.168.64.5'
        REMOTE_SERVER_USERNAME = 'root'
        BASE_API_URL = "http://${REMOTE_SERVER_HOST}:8080/api/v1"
        CHECKING_HEALTH_USER_SERVICE_URL = "${BASE_API_URL}/user-api/health"
        CHECKING_HEALTH_STORY_SERVICE_URL = "${BASE_API_URL}/story-api/health"
        CHECKING_HEALTH_COMMENT_SERVICE_URL = "${BASE_API_URL}/comment-api/health"
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Thực hiện clone dự án từ github về workspace khi một sự kiện xảy ra (push event)
                git 'https://github.com/datptithcm/mangatoon-api.git'
            }
        }

        stage('Prepare Remote Directory and Transfer Workspace') {
            steps {
                // Sử dụng sshagent với thông tin xác thực 'ssh-remote'
                sshagent(['ssh-remote']) {
                    // Xóa các file và thư mục con trong thư mục đích từ xa
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_SERVER_USERNAME@$REMOTE_SERVER_HOST 'rm -rf /root/mangatoon-api/*'"
                    
                    // Sau khi dọn dẹp, chuyển các file từ workspace đến server từ xa
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'remote-server', 
                                transfers: [
                                    sshTransfer(
                                        cleanRemote: false, 
                                        excludes: '', 
                                        execCommand: '', 
                                        execTimeout: 120000, 
                                        flatten: false, 
                                        makeEmptyDirs: false, 
                                        noDefaultExcludes: false, 
                                        patternSeparator: '[, ]+', 
                                        remoteDirectory: '', 
                                        remoteDirectorySDF: false, 
                                        removePrefix: '', 
                                        sourceFiles: '**'
                                    )
                                ], 
                                usePromotionTimestamp: false, 
                                useWorkspaceInPromotion: false, 
                                verbose: false
                            )
                        ]
                    )

                    // Yêu cầu remote server sao chép serviceAccountKey.json và paste vào các service
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_SERVER_USERNAME@$REMOTE_SERVER_HOST 'cp -r /root/serviceAccountKey.json /root/mangatoon-api/user-api/src/firebase'"
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_SERVER_USERNAME@$REMOTE_SERVER_HOST 'cp -r /root/serviceAccountKey.json /root/mangatoon-api/story-api/src/firebase'"
                }
            }
        }

        stage('Testing') {
            steps {
                sshagent(['ssh-remote']) {
                   // Ngưng lại và xoá tất cả các container đã chạy trước đó
                    sh """
                    ssh -o StrictHostKeyChecking=no ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_HOST} '
                    cd /root/mangatoon-api
                    if docker compose -f compose.yaml ps -q | grep -q .; then
                        docker compose -f compose.yaml down
                    else
                        echo "No containers running from compose.yaml"
                    fi'
                    """

                    // Xoá các images đã được build trước đó
                    sh """
                    ssh -o StrictHostKeyChecking=no ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_HOST} '
                    IMAGES=\$(docker images -q "mangatoon-api-*")
                    if [ -n "\$IMAGES" ]; then
                        docker rmi -f \$IMAGES
                    else
                        echo "No images to remove."
                    fi'
                    """

                    // Chạy file cấu hình compose.yaml để tiến hành build và chạy các container như đã cấu hình
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_SERVER_USERNAME@$REMOTE_SERVER_HOST 'docker compose -f mangatoon-api/compose.yaml up -d --build'"

                    // Tiến hành đợi cho đến khi các service đã sẵn sàng làm việc, hoặc sẽ ném lỗi nếu các service bị lỗi hoặc không hoạt động
                    script {
                        def maxRetries = 60
                        def checkInterval = 1
                        def services = [
                            CHECKING_HEALTH_USER_SERVICE_URL,
                            CHECKING_HEALTH_STORY_SERVICE_URL,
                            CHECKING_HEALTH_COMMENT_SERVICE_URL
                        ]
                        def allServicesUp = false
                        
                        for (int i = 0; i < maxRetries; i++) {
                            allServicesUp = true
                            for (service in services) {
                                def status = sh(script: """
                                    HTTP_STATUS=\$(curl --silent --write-out "HTTPSTATUS:%{http_code}" --output /dev/null ${service})
                                    echo "\$HTTP_STATUS" | grep -q "HTTPSTATUS:200" && echo 0 || echo 1
                                """, returnStdout: true).trim().toInteger()
                                if (status != 0) {
                                    allServicesUp = false
                                    break
                                }
                            }
                            if (allServicesUp) {
                                println 'All services are up.'
                                break
                            }
                            sleep(1)
                        }
                        if (!allServicesUp) {
                            error 'One or more services did not become available in time'
                        }
                    }

                    // Tiến hành kiểm thử
                    sh """
                    ssh -o StrictHostKeyChecking=no ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_HOST} '
                    cd /root/mangatoon-api/user-api && yarn install && yarn test
                    cd /root/mangatoon-api/story-api && yarn install && yarn test
                    cd /root/mangatoon-api/comment-api && yarn install && yarn test'
                    """
                    sh "scp -o StrictHostKeyChecking=no ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_HOST}:/root/mangatoon-api/user-api/tests/reports/junit.xml ./user-api/tests/reports/junit.xml"
                    sh "scp -o StrictHostKeyChecking=no ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_HOST}:/root/mangatoon-api/story-api/tests/reports/junit.xml ./story-api/tests/reports/junit.xml"
                    sh "scp -o StrictHostKeyChecking=no ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_HOST}:/root/mangatoon-api/comment-api/tests/reports/junit.xml ./comment-api/tests/reports/junit.xml"
                    archiveArtifacts artifacts: '**/reports/*.xml', allowEmptyArchive: true
                    junit '**/reports/*.xml'

                    // Ngưng lại và xoá tất cả các container đã chạy trước đó
                    sh """
                    ssh -o StrictHostKeyChecking=no ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_HOST} '
                    cd /root/mangatoon-api
                    if docker compose -f compose.yaml ps -q | grep -q .; then
                        docker compose -f compose.yaml down
                    else
                        echo "No containers running from compose.yaml"
                    fi'
                    """

                    // Xoá các images đã được build trước đó
                    sh """
                    ssh -o StrictHostKeyChecking=no ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_HOST} '
                    IMAGES=\$(docker images -q "mangatoon-api-*")
                    if [ -n "\$IMAGES" ]; then
                        docker rmi -f \$IMAGES
                    else
                        echo "No images to remove."
                    fi'
                    """
                }
            }
        }


        stage ('Deployment') {
            steps {
                sshagent(['ssh-remote']) {
                    // Thay đổi NODE_ENV sang production
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_SERVER_USERNAME@$REMOTE_SERVER_HOST 'echo 'NODE_ENV=prod' > /root/mangatoon-api/user-api/.env'"
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_SERVER_USERNAME@$REMOTE_SERVER_HOST 'echo 'NODE_ENV=prod' > /root/mangatoon-api/story-api/.env'"
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_SERVER_USERNAME@$REMOTE_SERVER_HOST 'echo 'NODE_ENV=prod' > /root/mangatoon-api/comment-api/.env'"

                    // Tiến hành build và khởi chạy container dựa vào compose.yaml
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_SERVER_USERNAME@$REMOTE_SERVER_HOST 'docker compose -f mangatoon-api/compose.yaml up -d --build'"
                }
            }
        } 
    }
}
