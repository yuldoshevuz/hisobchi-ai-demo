import { Context, SessionFlavor } from "grammy";
import { ScenesFlavor } from "grammy-scenes";
import { SessionData } from "./session-data.js";

export interface MyContext
  extends Context, SessionFlavor<SessionData>, ScenesFlavor {}
