import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        // Here ! this is used for that it will come 100 percent guranted
        // Otherwise you can use the if else statements
    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;
        // There are events on connection.
    
        connection.on("connected", ()=>{
            console.log("MongoDb has been connected");
        })
        // if error
        connection.on("error", (error)=>{
            console.log("MongoDb has not been connected", error);
        })
    } catch (error) {
        console.log("MongoDb has not been connected", error);
    }
}