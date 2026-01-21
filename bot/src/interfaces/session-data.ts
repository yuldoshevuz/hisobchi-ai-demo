import { ScenesSessionData } from "grammy-scenes";
import { ApiUser } from "./api-user.js";

export interface SessionData extends ScenesSessionData {
  user: ApiUser;
  isLinked?: boolean;
  accessToken?: string;
  amount?: number;
  category?: string;
  description?: string;
}
