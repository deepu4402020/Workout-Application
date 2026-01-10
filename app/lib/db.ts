import mongoose from 'mongoose';

const MONGODB_URI=process.env.MONGODB_URI;
if(!MONGODB_URI){
    console.error("MONGODB_URI doesn't exist");
}