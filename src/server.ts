import express from "express";
import "dotenv/config";
import router from "./router";
import { connectDB } from "./config/db";

const server = express();

connectDB();
//Read data from forms
server.use(express.json());

//Routing
server.use("/", router);

export default server;
