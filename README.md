# InternMatch AI

InternMatch AI is a full-stack **resume analysis and job matching platform** built with the **MERN stack**.  
Users can upload their resumes, extract skills automatically, match them against job requirements, and calculate a compatibility score.

The platform shows **matched skills, missing skills, and job compatibility**, while also keeping a history of previous matches.

---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes

### Resume Processing
- Upload resume (PDF)
- Extract text from resume
- Store parsed resume data

### Job System
- Admin job creation
- Job listing for users
- Required skills per job

### Matching Engine
- Skill comparison algorithm
- Regex-based skill matching
- Compatibility score calculation
- Missing skills detection

### Match History
- Stores every job comparison
- Tracks match scores over time
- Displays historical match results

---

## Tech Stack

### Frontend
- React
- Vite
- TypeScript
- TailwindCSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JWT
- bcrypt

### File Processing
- Multer
- PDF parsing

---

## Project Architecture

Frontend  
React + Vite + Tailwind

Backend  
Node.js + Express

Database  
MongoDB Atlas

Main Collections:

- users
- jobs
- matches

---

## API Endpoints

### Authentication
~~~
POST /api/auth/register
POST /api/auth/login
~~~

### Resume
~~~
POST /api/resume/upload
~~~

### Jobs
~~~
POST /api/jobs
GET /api/jobs
GET /api/jobs/:jobId/match
~~~

### Match History
~~~
GET /api/matches
~~~

---

## Installation

### Clone Repository
~~~
git clone https://github.com/abiraisingh/internai.git

cd internai
~~~

---

### Backend Setup
~~~
cd backend
npm install
npm run dev

Create `.env` file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
~~~

---

### Frontend Setup
~~~
cd frontend
npm install
npm run dev
~~~

---

## Usage

1. Register a user account
2. Upload your resume
3. View available jobs
4. Match resume with job requirements
5. See compatibility score and missing skills
6. Track match history

---

## Future Improvements

- AI-based resume feedback
- Skill extraction improvements
- Job recommendation system
- Dashboard analytics
- Resume improvement suggestions

---

## Author

Abirai Singh  
Full Stack Developer

---

## License

MIT License
