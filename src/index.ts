import { config } from 'dotenv'
config();
import express from 'express'
import cors from 'cors';
import { Server } from "http";
import { Db } from 'mongodb'

import { connectToDB } from "./utils";
import routes from "./api";

const start = async () => {
  try {
    const db: Db = await connectToDB();
    globalThis.db = db
    const app = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use("/:api?", routes);

    const port = process.env.PORT

    const server: Server = app.listen(port, () => {
      console.log(`Listening on port: ${JSON.stringify(server.address())}`);
    })

    process.on("SIGTERM", async () => {
      await server.close();
      console.log("EXITING GRACEFULLY...");
      process.exit(0);
    });
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
}

start()

