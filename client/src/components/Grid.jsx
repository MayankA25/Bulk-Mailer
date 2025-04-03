import { LayoutTemplate, Mail, UserRound, Zap } from "lucide-react";
import React from "react";

const Grid = () => {
  const texts = [
    "Bulk Email Sending",
    "Custom Templates",
    "Personalization",
    "Fast Emailing",
  ];
  const info = [
    "Send Mails Concurrently",
    "Design Professional Emails",
    "Recipents By Email",
    "Faster Communication",
  ];

  const icons = [<Mail/>, <LayoutTemplate/>, <UserRound/>, <Zap/>]

  return (
    <div className="flex-col flex gap-3">
      <h2 className="font-bold">Key Features</h2>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => {
          return (
            <div
              key={index}
              className="flex gap-4 bg-base-300/70 p-4 rounded-lg"
            >
              <div className="flex bg-primary w-12 h-12 justify-center items-center rounded-full">
                {icons[index]}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-bold">{texts[index]}</h2>
                <h4>{info[index]}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
