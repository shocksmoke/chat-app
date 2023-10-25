import mongoose from "mongoose";
import "dotenv/config"

mongoose.connect(process.env.DB_STRING+"chatAppDB");

