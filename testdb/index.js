const express = require('express');
const cors = require("cors");
const { connectDB, User } = require('./db');
const bcrypt = require('bcryptjs');
const {
    logRequest,
    logUsersList,
    logUsersListError,
    logUserRegistrationError,
    logUserLoginSuccess,
    logUserLoginError,
    logServerStart
} = require('./logs');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

// Log all incoming requests
app.use((req, res, next) => {
    logRequest(req.method, req.path, req.body);
    next();
});

app.get("/", async (req, resp) => {
    try {
        const users = await User.find({}, 'name email');
        logUsersList(users);
        resp.json({
            success: true,
            count: users.length,
            users: users
        });
    } catch (error) {
        logUsersListError(error.message);
        resp.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message
        });
    }
});

app.post("/register", async (req, resp) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return resp.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const user = new User({ name, email, password });
        let result = await user.save();
        result = result.toObject();
        
        // Remove password from response
        delete result.password;
        
        resp.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result
        });
    } catch (e) {
        logUserRegistrationError(e.message);
        resp.status(500).json({
            success: false,
            message: "Registration failed",
            error: e.message
        });
    }
});

app.post("/login", async (req, resp) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return resp.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Create user object without password
        const userObject = user.toObject();
        delete userObject.password;

        logUserLoginSuccess(user.email);
        
        resp.json({
            success: true,
            message: "Login successful",
            user: userObject
        });
    } catch (e) {
        logUserLoginError(e.message);
        resp.status(500).json({
            success: false,
            message: "Login failed",
            error: e.message
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    logServerStart(PORT);
});
