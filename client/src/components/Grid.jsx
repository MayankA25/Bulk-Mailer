import { Cloud, LayoutTemplate, Mail, Rows4, UserRound, Zap } from "lucide-react";
import React from "react";

const Grid = () => {
  const texts = [
    "Bulk Email Sending",
    "Queue Email System",
    "Personalization",
    "Redis Cloud",
  ];
  const info = [
    "Send Mails Concurrently",
    "Emails in Queue",
    "Recipents By Email",
    "Do Not Skip A Mail",
  ];

  const icons = [<Mail />, <Rows4 />, <UserRound />, <Cloud />];

  return (
    <div className="flex-col flex gap-3">
      <h2 className="font-bold text-xl">Key Features</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {[...Array(4)].map((element, index) => {
          return (
            <div className="flex bg-base-300 p-4 gap-4 rounded-lg items-center">
              <div className="flex justify-center items-center bg-primary rounded-full p-4 w-12 h-12">
                <i>{icons[index]}</i>
              </div>
              <div className="flex flex-col">
                <h2 className="font-bold text-lg ">{texts[index]}</h2>
                <h2 className="font-semibold text-lg text-base-content">{info[index]}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
