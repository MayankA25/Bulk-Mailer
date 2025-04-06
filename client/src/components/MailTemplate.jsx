import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useEmailStore } from "../store/useEmailStore";
import toast from "react-hot-toast";
import * as xlsx from "xlsx"


const MailTemplate = () => {
  const { sendMail } = useEmailStore();

  const [language, setLanguage] = useState("plaintext");
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const ref = useRef(null);
  const ref2 = useRef(null);

  const updatePreview = (newValue) => {
    if (language === "html") {
      // console.log("Inside html")
      console.log(newValue);
      text ? ref.current.innerHTML = newValue: null;
    } else {
      text ? ref.current.innerText = newValue: null;
    }
  };
  const handleFileUpload = (event)=>{
    const file = event.target.files[0];

    if(!file) return; 

    const reader = new FileReader();

    
    reader.onload = (e)=>{
        let readRecipients = []
        const data = new Uint8Array(e.target.result);
        const workbook = xlsx.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);

        // console.log(workbook);
        console.log(jsonData);


        jsonData.forEach((element)=>{
            console.log(element)
            readRecipients.push(element.Email);
        });
        setRecipients(readRecipients.join(" "))
    }
    reader.readAsArrayBuffer(file);
}

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-[80vw] m-auto p-5 gap-3">
        <div className="info-1 bg-base-300 text-base-content p-3 rounded-lg flex flex-col gap-3">
          <div className="flex gap-4">
            <h2 className="font-bold">Subject: </h2>
            <input
              className="input input-primary"
              placeholder="Enter Subject"
              type="text"
              size={100}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="flex gap-5">
            <h2 className="font-bold">To: </h2>
            <textarea
              ref={ref2}
              className="w-full textarea textarea-primary"
              placeholder="Enter Recipents"
              type="text"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-base-content">Upload Excel File:</h2>
            <input className="file-input file-input-primary" type="file" onChange={(e)=>{const readRecipients = handleFileUpload(e); }} />
          </div>
        </div>
        <div className="flex flex-col w-full rounded gap-3">
          <div className="flex bg-base-300 w-[100%] rounded-lg p-3 text-base-content flex-col gap-2">
            <h2 className="font-bold">Body:</h2>
            <h2 className="font-bold text-accent" >*If Copy Pasting Text, Dont Forget To Format Document To See The Preview*</h2>
            {/* <textarea placeholder='Enter Email Body Here' rows={20} value={text} onChange={(e)=>setText(e.target.value)}></textarea> */}
            <select
              onChange={(e) => {setLanguage(e.target.value);}}
              value={language}
              className="menu dropdown-content bg-base-100 rounded-box z-1 w-full p-2 shadow-sm"
            >
              <option className="text-base-content" value="plaintext">
                Plain Text
              </option>
              <option className="text-base-content" value="html">
                HTML - Use Inline CSS
              </option>
            </select>
            <Editor
              height={"500px"}
              language={language}
              defaultValue=""
              theme="vs-dark"
              value={text}
              onChange={(newValue) => {
                updatePreview(newValue);
                setText(newValue);
              }}
              options={{ wordWrap: "on", autoClosingTags: language === "html" }}
            ></Editor>
          </div>
          {text && <div className="flex bg-base-300 w-[100%] rounded-lg p-3 text-base-content flex-col gap-2">
            <h2 className="font-bold text-center border-b-2">Body Preview</h2>
            <div
              ref={ref}
              className="h-full preview my-3 overflow-auto px-3"
            ></div>
          </div>}
        </div>
      </div>
      <div className="flex">
        <button
          className="btn bg-primary font-bold border-none rounded-md"
          onClick={() => {
            let val = true;
            let email = true
            if(!recipients) return toast.error("Provide at least one recipient or upload an excel file with 'Email' field")
            if(!text) return toast.error("Provide The Email Body");

            for(let recipient of recipients.split(" ")){
              console.log(recipient)
              if(!recipient.includes("@") || !recipient.includes(".com")){
                email = false
              }
            }
            if(!email) return toast.error("Provide valid recipients")

            if(!subject){
              let value = confirm("Are you sure you want to send mails to the recipients without subject?");

              if(value === false){
                val = false
              }
            
            } 
            
            
            if(val && email){

              toast.promise(sendMail(recipients.split(" "), subject, text), {
                loading: "Sending Mail...",
                success: "Mail Sent Successfully",
                error: "Error While Sending Mail",
              });
            }
          }}
        >
          Send Mail
        </button>
      </div>
    </div>
  );
};

export default MailTemplate;
