import IORedis from "ioredis"
import dotenv from "dotenv"

dotenv.config({ path:"D:\\Mayank Data\\CODING\\MERN Projects\\Bulk Mailer\\server\\.env" })

let redis;

if(!redis){
    redis = new IORedis(process.env.REDIS_URL, {
        maxRetriesPerRequest: null
    })
}
export const connection = redis;