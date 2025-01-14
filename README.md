# Real-Time News System

# Description
This is a real-time news system built with Python, NestJS, and Angular. The system includes a news generator, backend API, and frontend interface for consuming and displaying real-time news.

# Installation and Setup Instructions
Clone the Repository

git clone https://github.com/yotkes/real-time-news.git
cd real-time-news-system
Run the Application Using Docker Compose
Ensure Docker and Docker Compose are installed.
docker-compose up --build

Access the Services
Frontend: http://localhost:4200

Backend API: http://localhost:3000/api/news

Manual Setup Instructions
## 1. Core Application (Python)

Navigate to core-app:
cd core-app

Install dependencies:
pip install -r requirements.txt

Run the app:
python app.py

## 2. Backend (NestJS)

Navigate to backend:
cd backend


Install dependencies:
npm install

Run the app:
npm run start

## 3. Frontend (Angular)

Navigate to frontend:
cd frontend

Install dependencies:
npm install

Run the app:
ng serve

# Technical Choices
RabbitMQ: Chosen for efficient message brokering.

NestJS: Provides a structured backend framework with easy microservices support.

Angular: Offers a robust framework for building dynamic frontend applications.

Docker: Simplifies environment management and deployment.

# Potential Improvements
Implement Real-Time Updates: Use Socket.IO for real-time data transfer.

AI Integration: Dynamically generate realistic news content using AI models.

Database Storage: Replace in-memory storage with a persistent solution like Redis or MongoDB.

Testing: Add unit and integration tests to ensure reliability.
