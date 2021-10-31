import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'
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
    userName: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    // location: {
    //     place: {
    //         type: String,
    //         default: 'default'
    //     },
    //     // type: {
    //     //     type: String,
    //     //     default: "Point",
    //     // },
    //     coordinates: [Number],
    // },
    countryCode: {
        type: String,
    },
    phoneNumber: {
        type: String
    },
    mergeContact: {
        type: String,
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

}, { timestamps: true });

userSchema.plugin(mongoosePaginate);

userSchema.index({ location: "2dsphere" });
// user data save as =>
// location: {
//     place: "Delhi",
//     coordinates: [28.7041, 77.1025]
// }

// code for nearby driver 
// var aggregate = signup_groomerModel.aggregate([{
//     "$geoNear": {
//         "near": {
//             type: "Point",
//             coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
//         },
//         // "limit": 5,
//         "maxDistance": distanceFilter,
//         "distanceField": "dist.calculated",
//         "includeLocs": "dist.location",
//         // "distanceMultiplier":1/1000,
//         "spherical": true
//     }
// }
// ])


export const User = mongoose.model('user', userSchema, 'user')
