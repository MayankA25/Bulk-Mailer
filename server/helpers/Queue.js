import { Queue } from "bullmq";
import { connection } from "./Connection.js";


export const mailQueue = new Queue('mailQueue', {connection})