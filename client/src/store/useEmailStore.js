import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useEmailStore = create((set, get)=>({
    sendMail: async (recipients, subject, body)=>{
        try{
            const response = await axiosInstance.post("/mail/sendmail", {
                recipients, subject, body
            });
            // console.log(response.data);
            
        }catch(e){
            console.log(e)
        }
    }
}))