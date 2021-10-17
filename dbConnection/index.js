import mongoose from 'mongoose';

const host = 'localhost'
export function connectdb(params) {
    mongoose.connect(`mongodb://${host}:27017/node`)
    mongoose.connection.on('error', () => console.log('Mongo connection error '))
}

