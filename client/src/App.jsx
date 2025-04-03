import Home from "./components/Home";
import MailTemplate from "./components/MailTemplate";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import Loading from "./components/Loading";

function App() {
  const { getUser, user } = useAuthStore();
  useEffect(() => {
    getUser();
  }, []);

  if (localStorage.getItem("showLoader") && user === null) {
    return <Loading />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            exact
            path="/sendmail"
            element={user ? <MailTemplate /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
