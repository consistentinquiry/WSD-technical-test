import {mongoose} from '../database/mongooseInit';
const Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "fullname not provided "],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
            validator: function (v: any) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }

    },
    role: {
        type: String,
        enum: ["normal", "admin"],
        required: [true, "Please specify user role"]
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);