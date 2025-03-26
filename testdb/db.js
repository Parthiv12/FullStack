const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
    logDatabaseStart,
    logDatabaseError,
    logDatabaseDisconnect,
    logDatabaseReconnect,
    logUserCreationAttempt,
    logUserCreationSuccess
} = require('./logs');

// MongoDB Atlas Connection URI
const MONGO_URI = "mongodb+srv://Testing:<1234>@cluster0.7kh0d.mongodb.net/";

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        logDatabaseStart();
    } catch (err) {
        logDatabaseError(err);
        process.exit(1);
    }
};

// Schema for users of the app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Add middleware to hash password before saving
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    logUserCreationAttempt(this.name, this.email);
    next();
});

UserSchema.post('save', function(doc) {
    logUserCreationSuccess(doc._id);
});

const User = mongoose.model('users', UserSchema);

// Set up database event listeners
mongoose.connection.on('error', err => {
    logDatabaseError(err);
});

mongoose.connection.on('disconnected', () => {
    logDatabaseDisconnect();
});

mongoose.connection.on('reconnected', () => {
    logDatabaseReconnect();
});

// Export the connection function and User model
module.exports = {
    connectDB,
    User
}; 