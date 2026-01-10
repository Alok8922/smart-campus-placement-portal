🚀 Smart Campus Placement Portal (MERN Stack)

A full-stack Campus Placement Management System built using the MERN stack that automates job postings, applications, shortlisting, and email notifications.

🔗 GitHub Repository:
https://github.com/Alok8922/smart-campus-placement-portal
 
📌 Project Overview

The Smart Campus Placement Portal is designed to digitalize and simplify the campus placement process.
It provides a centralized platform for Students, Companies, and Admins to interact efficiently.

Key highlights:

Role-based access control

Real-time job application tracking

Automatic email notifications on shortlisting

Secure authentication using JWT

🧑‍💻 User Roles & Features
👨‍🎓 Student

Register & login

Complete placement profile

Upload resume

Apply for jobs

Track application status (Applied / Shortlisted / Rejected)

Receive email notification when shortlisted

🏢 Company

Register & login

Post job openings

View applicants

Shortlist or reject students

Trigger automatic interview email

🛠 Admin

View all job postings

Approve or reject jobs

Monitor platform activities

Tech Stack
Frontend

React.js

HTML, CSS, JavaScript

Axios

Backend

Node.js

Express.js

Database

MongoDB (MongoDB Atlas)

Authentication & Security

JWT (JSON Web Token)

bcrypt.js

Role-based middleware

Additional Tools

Nodemailer (Email notifications)

Multer (Resume upload)

Postman (API testing)

✨ Special Features

🔐 Secure authentication & authorization

📧 Automatic email sent when a student is shortlisted

📄 Resume upload and viewing

🏷 Status badge system (Applied / Shortlisted / Rejected)

🧠 Duplicate application prevention

🏗 Project Structure

mern/
 ├── backend/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
 │   ├── utils/
 │   └── server.js
 │
 ├── frontend/
 │   ├── src/
 │   │   ├── pages/
 │   │   ├── components/
 │   │   ├── services/
 │   │   └── App.js
 │
 └── README.md


 
How to Run the Project Locally



1️⃣ Clone Repository
git clone https://github.com/Alok8922/smart-campus-placement-portal.git


2️⃣ Backend Setup

cd backend

npm install

npm run dev

Create a .env file in backend with:

PORT=5000
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_uri
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

3️⃣ Frontend Setup

cd frontend  

npm install

npm start

![image alt](https://github.com/Alok8922/smart-campus-placement-portal/blob/e0b52ba80c80bcb91e32074f8db7574154179b42/Screenshot%202025-12-19%20174052.png)
