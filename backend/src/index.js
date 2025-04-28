// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import http from 'http';
// import { Server } from 'socket.io'; // Correct import for socket.io
// import caferoute from './route/cafeRoute.js';

// dotenv.config();
// const PORT = process.env.PORT;

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",  
//     methods: ["GET", "POST"], 
//   }
// });

// app.use(express.json());
// app.use(cors());


// const connectMongo = async () => {
//   try {
//     await mongoose.connect(process.env.DB_STRING);
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// };

// connectMongo();


// app.use('/api', caferoute);
// app.set('io', io);


// io.on('connection', (socket) => {
//     console.log('A user connected');
    
//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });


// server.listen(PORT, () => {
//   console.log(`App is running on port ${PORT}`);
// });
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import caferoute from './route/cafeRoute.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

app.use(express.json());
app.use(cors());

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectMongo();

app.use('/api', caferoute);
app.set('io', io);

// 👉 Correct: io.on, not just on
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
