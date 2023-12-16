import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import {register} from "./controllers/auth.js"

// Configurations
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 6001;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// File storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

//routes
app.post("/auth/register", upload.single("picture"), register);

// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Mongoose setup
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => console.error(`MongoDB connection error: ${error}`));

app.get('/', (request, response) => {
    response.json("Hello")
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`);
});
