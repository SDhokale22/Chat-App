import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({});

//const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './client/build')));

const corsOption={
    origin:"http://localhost:3000",
    credentials:true
};
app.use(cors(corsOption));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.use('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});
  

app.get("/", (req,res) => {
   res.send("<h1>Welcome to Real-time Chat app</h1>");
});

server.listen(PORT, () => {
    connectDB();
    console.log(`Server running on Port ${PORT}`);
});
