import IORedis from "ioredis"

let redis;

if(!redis){
    redis = new IORedis("redis://default:s7undwoSojk5Sih5owRGLhRv9ArvCCvL@redis-12648.crce179.ap-south-1-1.ec2.redns.redis-cloud.com:12648", {
        maxRetriesPerRequest: null
    })
}



export const connection = redis;