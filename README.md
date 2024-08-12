# MANGATOON API - BACKEND
MANGATOON API is a project within the Mangatoon initiative, launched in May 2024 and concluded in August 2024. It is also part of a graduation internship project. MANGATOON-API is developed to provide APIs that enable users or other systems to interact with the Mangatoon business processing system. This project is implemented using a microservice model combined with various new technologies, and includes stringent software implementation practices to ensure stability, reliability, and strict system security.
## Technologies used
- NodeJS/ExpressJS
- Typescript
- MySQL
- Redis
- RabbitMQ
- Json Web Token (JWT)
- Sequelize
- Jest (Testing)
## Deployment
- Docker/Docker Compose
- Jenkins CI/CD
## Related
- MANGATOON UI - FRONTEND: https://github.com/datptithcm/mangatoon-ui
## Technology Application Model
![image](https://github.com/user-attachments/assets/96d40578-6e9d-4263-878f-ff83ee2b8f17)
- The system is implemented with a microservice architecture, divided into three services with distinct responsibilities:
  - User Service: Handles user authentication, personal information management, and user accounts.
  - Story Service: Manages stories, chapters, chapter content, story titles, genres, authors, reading history, following, story ratings, and statistics.
  - Comment Service: Handles viewing, creating, editing, deleting, and interacting with comments (like/dislike).
- Each service connects to a separate database and Redis instance, and services communicate and exchange information via RabbitMQ.
- The Nginx server acts as an API Gateway, responsible for receiving requests from clients, analyzing them, and forwarding them to the appropriate services.
- All components are deployed and operate within a Docker environment. Services, Nginx, databases, Redis, and RabbitMQ are packaged into images and run as independent containers, with the containers configured to be able to see each other (within the same network).
## Data Design
### Entity-Relationship Diagram (ERD) Design
#### General Entity-Relationship Diagram
![image](https://github.com/user-attachments/assets/5e9fdc47-dfbf-4d90-8462-8c659d8d494c)
#### Entity-Relationship Diagram of User Service
![image](https://github.com/user-attachments/assets/c12cdb70-e3a3-41a4-8f90-be122f6a2293)
#### Entity-Relationship Diagram of Story Service
![image](https://github.com/user-attachments/assets/df6a43af-4e60-439d-8b9f-ddb82040e989)
#### Entity-Relationship Diagram of Comment Service
![image](https://github.com/user-attachments/assets/27f7fffa-7f35-4468-9617-e5c06b4d8ded)
### Detailed Entity Design
#### Entity details of the user service
- ACCOUNT(ID, STATUS, ROLE, CREATED_AT, PROVIDER, USER_ID)
- USER(ID, NAME, GENDER, DOB, AVATAR_URL)
- EMAIL_CREDENTIAL(ID, EMAIL, PASSWORD)
- FACEBOOK_CREDENTIAL(ID, UID)
- GOOGLE_CREDENTIAL(ID, UID)
#### Entity details of the story service
- USER(ID)
- STORY(ID, TITLE, DESCRIPTION, COVER_IMAGE_URL, STATUS, CREATED_AT, UPDATED_AT, COUNTRY_ID)
- ALIAS(ID, TITLE, STORY_ID)
- GENRE(ID, NAME, DESCRIPTION)
- STORY_GENRE(STORY_ID, GENRE_ID)
- AUTHOR(ID, NAME)
- STORY_AUTHOR(STORY_ID, AUTHOR_ID)
- STORY_FOLLOW(STORY_ID, USER_ID)
- RATING(STORY_ID, USER_ID, STAR)
- COUNTRY(ID, NAME)
- CHAPTER(ID, ORDER, NAME, STATUS, CREATED_AT, UPDATED_AT, STORY_ID)
- CHAPTER_DETAIL(ID, ORDER, PATH, CHAPTER_ID)
- VIEW(ID, CREATED_AT, CLIENT_ID, CHAPTER_ID)
- HISTORY(ID, CREATED_AT, CHAPTER_ID, USER_ID)
#### Entity details of the comment service
- USER(ID)
- CHAPTER(ID, STORY_ID)
- COMMENT(ID, CONTENT, STATUS, PARENT_ID, CREATED_AT, UPDATED_AT, STORY_ID, CHAPTER_ID, USER_ID)
- COMMENT_INTERACTION(COMMENT_ID, USER_ID, INTERACTION_TYPE)
### Class Diagram Design
#### Class diagram of the user service
![image](https://github.com/user-attachments/assets/408140d7-456f-47fa-81cc-5c1807a52b14)
#### Class diagram of the story service
![image](https://github.com/user-attachments/assets/3de2539f-fd1d-4ae3-a6b1-2e18b83951f7)
#### Class diagram of the comment service
![image](https://github.com/user-attachments/assets/868c4bb8-aca4-419b-ab0f-c59dfcc6380f)
