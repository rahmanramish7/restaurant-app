// import mongoose from "mongoose";
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// export const dbConnection = () => {
//   if (!process.env.MONGO_URI) {
//     console.error("MONGO_URI is not defined in environment variables");
//     process.exit(1);
//   }
  
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       dbName: "RESERVATIONS",
//     })
//     .then(() => {
//       console.log("Connected to database!");
//     })
//     .catch((err) => {
//       console.log(`Some error occurred while connecting to database: ${err}`);
//     });
// };
import mongoose from "mongoose";

export const dbConnection = () => {
  console.log("Attempting to connect to database...");
  console.log("MONGO_URI:", process.env.MONGO_URI);

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in environment variables");
    return;  // Don't exit the process, just return from the function
  }

  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "RESERVATIONS",
    })
    .then(() => {
      console.log("Connected to database successfully!");
    })
    .catch((err) => {
      console.log(`Error connecting to database: ${err}`);
    });
};