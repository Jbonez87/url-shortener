import { MongoClient, Db } from "mongodb";

type ConnectToDB = () => Promise<Db>

const connectToDB: ConnectToDB = async () => {
  try {
    const client: MongoClient = new MongoClient(process.env.MONGOURL);
    await client.connect();
    const db: Db = client.db();
    return db;
  } catch (e) {
    console.error(e);
  }
};

export default connectToDB;