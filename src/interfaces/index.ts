import { Request, Response, NextFunction } from "express";
import { Document } from "mongodb";

export type Handler = (req: Request, res: Response, next: NextFunction) => any;

export interface Url extends Document {
  longUrl: string,
  shortUrl: string
}