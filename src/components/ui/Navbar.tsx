"use client";
import { logoutUser } from "@/redux/slices/userSlice";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  // const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    router.push("/login");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-gray-100">
      <div className="flex justify-between max-w-[1000px] mx-auto py-3 px-2 lg:px-0">
        <div className="logo">
          <Link href={"/"}>
            <h1 className="text-xl font-bold">Blogify</h1>
          </Link>
        </div>
        {/* {pathname === "/login" || pathname === "/register" ? ( */}
        {user.token && localStorage.getItem("token") ? (
          <div className="links flex items-center gap-4 font-semibold">
            <div>
              <Link href={"/profile"}>Profile</Link>
            </div>
            <div>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="links flex gap-4 font-semibold">
            <div>
              <Link href={"/login"}>Login</Link>
            </div>
            <div>
              <Link href={"/register"}>Register</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
