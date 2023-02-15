import { config } from "dotenv";
config();
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, Db } from "mongodb";
import { Request, Response } from "express";

import { shortUrl as testShortUrl } from ".";

jest.mock("nanoid", () => {
  return { nanoid: () => "44556" };
});

type MockMiddleware = (
  req: Request,
  res: Response,
  next: (e?: Error) => void
) => void;

const shortUrl: MockMiddleware = testShortUrl;

describe("/api/shorturl", () => {
  let memoryServer;
  let client;
  let db;
  beforeAll(async () => {
    memoryServer = await MongoMemoryServer.create();
    process.env.MONGOURL = memoryServer.getUri()
    process.env.DBNAME = 'shorturls'
    process.env.URLCOLLECTION = 'urls'
    client = new MongoClient(process.env.MONGOURL);
    await client.connect();
    db = client.db(process.env.DBNAME);
    globalThis.db = db as Db;
    process.env.TEMP = "https://temp";
  })

  afterAll(async () => {
    await memoryServer.stop()
    await client.close()
  })

  it("should run without crashing", async () => {
    const req = {
      body: {
        originUrl: "www.example.com",
      },
    } as Request;

    const res = {
      send: () => "https://temp.com/44556",
      status: function() {
        return this
      },
    } as unknown as Response;

    const mockNext = jest.fn();

    await shortUrl(req, res, mockNext);
  });

  it('should return a shorturl', async () => {
    const req = {
      body: {
        originUrl: "www.example.com",
      },
    } as Request;

    const res = {
      status: jest.fn().mockImplementation(() => res),
      send: jest.fn(() => 'https://temp.com/44556'),
    } as unknown as Response;

    const mockNext = jest.fn();

    await shortUrl(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith("https://temp.com/44556");
  })

  it('should send a 404 originUrl is not defined', async () => {
    const req = {
      body: {
        originUrl: "",
      },
    } as Request;

    const res = {
      status: jest.fn().mockImplementation(() => res),
      send: jest.fn(() => "Please send a valid url"),
    } as unknown as Response;

    const mockNext = jest.fn();

    await shortUrl(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404)
  })
  
  it("should return undefined if originUrl is not defined", async () => {
    const req = {
      body: {
        originUrl: "",
      },
    } as Request;

    const res = {
      status: jest.fn().mockImplementation(() => res),
      send: jest.fn(() => "Please send a valid url"),
    } as unknown as Response;

    const mockNext = jest.fn();

    await shortUrl(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
