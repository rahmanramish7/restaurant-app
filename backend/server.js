// // server.js (or main file)
// import dotenv from 'dotenv';
// dotenv.config({ path: './config.env' }); // Adjust the path if using `config.env`

// import app from './app.js';
// import { dbConnection } from './database/dbConnection.js';

// const PORT = process.env.PORT || 3000;

// // Call the database connection
// dbConnection();

// app.listen(PORT, () => {
//   console.log(`SERVER HAS STARTED AT PORT ${PORT}`);
//   console.log('Server is ready to accept connections');
// });



// Directly set environment variables
process.env.MONGO_URI = 'mongodb+srv://rahmanramish7:1PNw2ajskE7BbfRT@cluster0.d8j1j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
process.env.PORT = '4001';
process.env.FRONTEND_URL = 'http://localhost:5173';

import app from './app.js';
import { dbConnection } from './database/dbConnection.js';

// Immediately log the variables
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

const PORT = process.env.PORT || 3000;

// Call the database connection
dbConnection();

app.listen(PORT, () => {
  console.log(`SERVER HAS STARTED AT PORT ${PORT}`);
});