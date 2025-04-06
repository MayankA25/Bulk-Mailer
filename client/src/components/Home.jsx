import React from "react";
import Grid from "./Grid";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex flex-col w-[70vw] gap-7">
        <div className="flex flex-col gap-5 items-left">
          <h2 className="font-bold text-3xl">
            Reach Your Audience In Seconds
          </h2>
          <h3 className="font-semibold text-xl">
            Effortlessly send emails to multiple recipients with just a few
            clicks. Our powerful and user-friendly app helps you streamline
            communication, save time, and boost productivity. Whether it's
            newsletters, promotions, or important updates, Bulk Mailer ensures
            your messages reach the right audience efficiently.
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn bg-primary rounded-md" onClick={()=>user ? navigate("/sendmail"): document.getElementById("google-btn").click()} >{user ? "Send Email": "Sign In To Continue"}</button>
          <button className="btn bg-primary/40 rounded-md">Learn More</button>
        </div>
        <Grid />
      </div>
    </div>
  );
};

export default Home;
