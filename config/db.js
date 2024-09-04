import mongoose from "mongoose";
import dotenv from 'dotenv';

// Configure dotenv to load environment variables
dotenv.config();

const connectDB = async () => {
    try {
        // Log the MONGO_URL to ensure it's being accessed correctly
        console.log('MONGO_URL: ', process.env.MONGO_URL);

        const conn = await mongoose.connect(process.env.MONGO_URL,);

        console.log('MongoDB connection: ' + conn.connection.host);

    } catch (error) {
        console.log('MongoDB connection error: ' + error);
        process.exit(1);
    }
}

export default connectDB;










// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {

//         const connection = await mongoose.connect('mongodb+srv://anandprodev:CurdSimpleCluster@curdsimplecluster.rfzbvb1.mongodb.net/?retryWrites=true&w=majority&appName=CurdSimpleCluster');
//         // const connection = await mongoose.connect(process.env.MONGO_URL);
//         console.log('MongoDB connection:  ' + connection.connection.host);

//     } catch (error) {
//         console.log('MongoDB connection error: ' + error);
//         process.exit(1);
//     }
// }

// export default connectDB;