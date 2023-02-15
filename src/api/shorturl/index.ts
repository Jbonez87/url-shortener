import { Db, Collection, ObjectId } from "mongodb";
import { nanoid } from 'nanoid'

import { Handler, Url } from "@interfaces";
import { urlValidator } from "../../utils";

export const shortUrl: Handler = async (req, res, next) => {
  const { originUrl = '' } = req.body;
  if(!originUrl) {
    res.status(404).send('Please send a valid url')
  }
  const temp = process.env.TEMP;

  const db = globalThis?.db as Db;
  const urlCollection: Collection<Url> = db?.collection(process.env.URLCOLLECTION);

  if (urlValidator(originUrl)) {
    try {
      /* 
      * The $or operator allows the collection to use
      * a single query for two filters using the 
      * originUrl as the value
      */
      let url = await urlCollection.findOne({
        $or: [
          {
            longUrl: originUrl
          },
          {
            shortUrl: originUrl
          }
        ]
      })
      if (url) {
        if (originUrl === url?.longUrl) {
          res.status(200).send(url.shortUrl);
        } else if (originUrl === url?.shortUrl) {
          res.status(200).send(url.longUrl);
        }
      } else {
        const id = nanoid(5);
        let shortUrl = `${temp}.com/${id}`;

        /* 
        * This is to reduce the number of queries since 
        * collection.insertOne() no longer returns the document
        * that was saved to the database.
        */
        let { value } = await urlCollection.findOneAndUpdate(
          {
            _id: new ObjectId(),
            originUrl,
            longUrl: originUrl,
            shortUrl,
          },
          { $set: {} },
          { upsert: true, returnDocument: 'after' }
        );

        res.status(200).send(value.shortUrl);
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Server error");
    }
  }

}