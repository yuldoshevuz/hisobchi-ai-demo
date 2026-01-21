import { ScenesComposer } from "grammy-scenes";
import { MyContext } from "../interfaces/my-context.js";
import { mainScene } from "./main.js";

export const scenes = new ScenesComposer<MyContext>(mainScene);
