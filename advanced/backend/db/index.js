const mongoose = require("mongoose");

mongoose.connect("MONGO_URL");

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    BusinessCard: {
        name: String,
        description: String,
        interests: [String],
        LinkedInURL: String,
        TwitterURL: String,
    }
})

const BusinessCardSchema = new mongoose.Schema({
    username: String,
    description: String,
    interests: [String],
    LinkedInURL: String,
    TwitterURL: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Card = mongoose.model('Card', BusinessCardSchema);

module.exports = {
    Admin, User, Card
}