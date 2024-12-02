import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error("Google login error:", error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();

      })
      .catch((err) => console.error("Error fetching user profile:", err));
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
    <a href="http://localhost:5173/"></a>
  };

  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <a href="/">
      <img src="/logo.svg" style={{ height: "50px" }} alt="Logo" />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
             <a href="/create-trip">
           <button
              className="border-2 border-gray-600 text-gray-600 rounded-full py-2 px-4 hover:bg-orange-600 hover:text-black"
            >
              Create trip
            </button>
            </a>
            <a href="/my-trips">
           <button
              className="border-2 border-gray-600 text-gray-600 rounded-full py-2 px-4 hover:bg-orange-600 hover:text-black"
            >
              My trip
            </button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                  alt="User"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <img src="/logo.svg" style={{ height: "50px" }} alt="Logo" />
                    <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                    <p>Sign in to the App with Google authentication securely</p>
                    <Button
                      className="w-full mt-5 flex gap-4 items-center"
                      onClick={login}
                    >
                      <FcGoogle className="w-10 h-10" />
                      SIGN IN
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
