import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useEmailStore } from "../store/useEmailStore";
import toast from "react-hot-toast";

const MailTemplate = () => {

  const { sendMail } = useEmailStore();

  const [language, setLanguage] = useState("plaintext");
  const [recipients, setRecipients] = useState("");
  const [ subject, setSubject ] = useState("");
  const [text, setText] = useState("");
  const ref = useRef(null);

  const updatePreview = (newValue) => {
    if (language === "html") {
      // console.log("Inside html")
      console.log(newValue);
      ref.current.innerHTML = newValue;
    } else {
      ref.current.innerText = newValue;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-[80vw] m-auto p-5 gap-3">
        <div className="info-1 bg-base-300 text-base-content p-3 rounded-lg flex flex-col gap-3">
          <div className="flex gap-4">
            <h2 className="font-bold">Subject: </h2>
            <input className="border-neutral" placeholder="Enter Subject" type="text" size={100} onChange={(e)=>setSubject(e.target.value)} />
          </div>
          <div className="flex gap-5">
            <h2 className="font-bold">To: </h2>
            <textarea className="w-full" placeholder="Enter Recipents" type="text" onChange={(e)=>setRecipients(e.target.value)} />
          </div>
        </div>
        <div className="flex w-full rounded gap-3">
          <div className="flex bg-base-300 w-[50%] rounded-lg p-3 text-base-content flex-col gap-2">
            <h2 className="font-bold">Body:</h2>
            {/* <textarea placeholder='Enter Email Body Here' rows={20} value={text} onChange={(e)=>setText(e.target.value)}></textarea> */}
            <select
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
            >
              <option className="text-black" value="plaintext">Plain Text</option>
              <option className="text-black" value="html">HTML - Use TailwindCSS Classes</option>
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
          <div className="flex bg-base-300 w-[50%] rounded-lg p-3 text-base-content flex-col gap-2">
            <h2 className="font-bold text-center border-b-2">Body Preview</h2>
            <div
              ref={ref}
              className="h-full preview my-3 overflow-auto px-3"
            ></div>
          </div>
        </div>
      </div>
      <div className="flex">
        <button className="btn bg-primary font-bold border-none rounded-md" onClick={()=>{ toast.promise(sendMail(recipients.split(" "), subject, text), {
          loading: "Sending Mail...",
          success: "Mail Sent Successfully",
          error: "Error While Sending Mail"
        })}} >Send Mail</button>
      </div>
    </div>
  );
};

export default MailTemplate;
