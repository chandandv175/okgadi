import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true
    },
    verificationCode: {
        type: Number,
    },
    uesrVerfied: {
        type: Boolean,
        default: false
    },
    userStatus: {
        type: String,
        enum: ['active', 'blocked', 'deleted'],
        default: 'active'
    },
    userRole: {
        type: String,
        enum: ['user', 'driver', 'sales', 'owner'],
        default: 'user'
    }

}, { timestamps: true })

export const user = mongoose.model('user', userSchema, 'user')
