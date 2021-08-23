const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!');
            }
        },
        trim: true,
        lowercase: true,
        required:true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("password must included password");
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }]

},{
    timestamps:true
})

// generate Token
userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY);
        user.tokens=user.tokens.concat({token})
    await user.save();
    return token;
}
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})



// removing task when user deleted
userSchema.pre('remove', async function (next) {
    const user = this;
    
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;