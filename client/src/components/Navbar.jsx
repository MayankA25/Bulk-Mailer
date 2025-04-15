import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { login, enableLoader, user, logout } = useAuthStore();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate()
  return (
    <div className="w-full bg-base-300 p-3.5 sticky top-0 z-50">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <h2 onClick={()=>navigate("/")} className="font-bold hover:cursor-pointer text-xl">
            Bulk Mailer
          </h2>
        </div>

        <div className="flex justify-center">
          {!user ? (
            <button
              id="google-btn"
              className="btn bg-zinc-800 rounded-md flex gap-3"
              onClick={() => {
                login();
                // enableLoader();
              }}
            >
              <img src="./google.png" className="w-5 h-5" />
              <h2 className="sm:text-[10px] md:text-[15px]">
                Continue With Google
              </h2>
            </button>
          ) : (
            <div className="flex items-center gap-5">
              <img
                onClick={() => {
                  setToggle(toggle ? false : true);
                }}
                src={user?.profilePic}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt=""
              />
              <button className="flex btn items-center gap-1" onClick={logout}>
                <LogOut className="size-5"/>
                <h2>LogOut</h2>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
