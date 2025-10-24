const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();


app.use(cors());
app.use(express.json());


const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema);


app.get('/', (req, res) => {
    res.json({ 
        message: 'Feedback Form API is running!',
        endpoints: {
            submitFeedback: 'POST /feedback',
            getFeedbacks: 'GET /feedback'
        }
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});


app.post('/feedback', async (req, res) => {
    try {
        const { name, email, message } = req.body;

       
        if (!name || !email || !message) {
            return res.status(400).json({
                error: 'All fields are required: name, email, message'
            });
        }

        if (name.trim().length === 0) {
            return res.status(400).json({
                error: 'Name cannot be empty'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Please provide a valid email address'
            });
        }

        if (message.trim().length < 10) {
            return res.status(400).json({
                error: 'Message must be at least 10 characters long'
            });
        }

        
        const feedback = new Feedback({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: message.trim()
        });

        await feedback.save();

        res.status(201).json({
            status: 'success',
            message: 'Feedback submitted successfully',
            data: {
                id: feedback._id,
                name: feedback.name,
                email: feedback.email,
                createdAt: feedback.createdAt
            }
        });

    } catch (error) {
        console.error('Error submitting feedback:', error);
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                error: errors.join(', ')
            });
        }

        res.status(500).json({
            error: 'Internal server error. Please try again later.'
        });
    }
});


app.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        
        res.json({
            status: 'success',
            results: feedbacks.length,
            data: feedbacks
        });
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({
            error: 'Failed to fetch feedback'
        });
    }
});


app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
});


app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});


app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/health`);
    console.log(` API info: http://localhost:${PORT}/`);
});
