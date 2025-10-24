# Feedback Form - Full Stack Application

A complete full-stack feedback form built with Node.js, Express, MongoDB, and vanilla JavaScript. This project demonstrates how to connect a frontend interface with a backend server and store data securely in a database.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Express.js](https://img.shields.io/badge/Express.js-4.18%2B-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-8.2-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)

##  Features

- ✅ **Responsive Design** - Works perfectly on desktop and mobile devices
- ✅ **Real-time Validation** - Client-side form validation with instant feedback
- ✅ **Secure Backend** - Server-side validation and error handling
- ✅ **Database Integration** - MongoDB for secure data storage
- ✅ **RESTful API** - Clean API endpoints for CRUD operations
- ✅ **Modern UI/UX** - Beautiful gradient design with smooth animations
- ✅ **Error Handling** - Comprehensive error handling on both frontend and backend

##  Tech Stack

### Frontend
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with gradients, flexbox, and animations
- **JavaScript (ES6+)** - Vanilla JavaScript with async/await and fetch API

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB** - NoSQL database for data persistence

## 📁 Project Structure
feedback-form/
|
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
|
├── backend/
│ ├── server.js
│ └── db.js
|
├── package.json
├── .gitignore
└── README.md


## ⚡ Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)

### Installation & Setup

1. **Clone or download the project files**

2. **Install dependencies**
```bash
npm install
 ```

## Set up MongoDB ##

# Start MongoDB service
```bash
"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
```

## Start the application ##

## Terminal 1 - Start Backend Server ##
```bash
npm start
```

## Terminal 2 - Start Frontend Server: ##
```bash 
cd frontend
npx http-server -p 8000
```

## Open your browser ##
```bash
Navigate to http://localhost:8000 and start submitting feedback!
```

## 👨‍💻 Author ##
Raja Muhammad Arbab