# Social Media Application

A fullstack social media application built with React (frontend) and Spring Boot (backend) that allows users to create and view posts and comments.

## Features

- View list of posts on the home page
- Create new posts with title, description, and customizable title color
- View individual posts and their comments
- Add comments to posts
- Delete posts

## Technologies Used

### Frontend
- React.js with TypeScript
- Context API for state management
- React Router for navigation
- Axios for API communication

### Backend
- Java with Spring Boot
- Spring Data JPA
- Server-side validation
- Exception handling

## Getting Started

Clone the repository: git clone [https://github.com/VihanPamudya/SocialMediaApplication.git](https://github.com/VihanPamudya/SocialMediaApplication.git)

### Running the Frontend

1. Navigate to the frontend directory:
cd SocialMediaApplication/social-media-frontend

2. Install dependencies:
npm install

3. Start the frontend application:
npm start

4. The application will be available at `http://localhost:3000`

### Running the Backend

1. Navigate to the backend directory:
cd SocialMediaApplication/social-media-backend

2. Run the Spring Boot application:
./mvnw spring-boot
or with Maven installed:
mvn spring-boot

3. The API will be available at `http://localhost:8080`
