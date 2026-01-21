import * as dotenv from 'dotenv';
import { JwtExpires } from 'src/enums/jwt-expires';

dotenv.config();

export const HTTP_PORT = Number(process.env.HTTP_PORT) || 3000;

export const DATABASE_URL = process.env.DATABASE_URL;

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRES_IN =
  (process.env.JWT_EXPIRES_IN as JwtExpires) || '1h';
