import { connection } from "./Connection.js";
import { Worker } from "bullmq";
import { sendMail } from "./Email.js";

// new QueueScheduler('mailQueue', {connection})
await connection.ping();
const worker = new Worker(
    "mailQueue",
    async (job) => {
       const { loggedInEmail, accessToken, refreshToken, recipient, subject, body } = job.data;
       console.log(loggedInEmail, accessToken, refreshToken, recipient, subject, body);
       await sendMail(loggedInEmail, accessToken, refreshToken, recipient, subject, body)
  },
  {
    connection
  }
);

worker.on("completed", (job)=>{
    console.log(`Email sent to ${job.data.recipient}`)
})

worker.on("failed", (job, err)=>{
    console.log(`Failed To Send Email To ${job.data.recipient}`)
})