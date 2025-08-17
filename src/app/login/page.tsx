'use client';
import { axiosClient } from "@/config/axiosClient";
import { setUserDetails } from "@/redux/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Handle login logic here
    try {
      const res = await axiosClient.post("/user/login", formData);
      if(res.status === 200) {
        dispatch(setUserDetails(res?.data?.data));
        localStorage.setItem("token", res?.data?.data?.token);  
        toast.success("Login successful!");
        router.push("/");

      }
      
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed!");
    }finally{
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="bg-gray-50 px-12 py-8 rounded-lg">
          <h1 className="text-2xl font-bold text-indigo-500 mb-8 text-center">
            LOGIN
          </h1>
          <form className="" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <input
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 outline-indigo-500 w-[300px]"
                placeholder="Enter email"
                type="text"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                className="border rounded-md px-4 py-2 outline-indigo-500  w-[300px]"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-500 text-white w-full py-2 rounded-lg cursor-pointer hover:bg-indigo-600"
            >
            {loading ? "Loading...": "Login"}
            </button>
          </form>
          <div className="text-sm mt-4">
            <span>Dont have an account?</span>
            <Link
              href="/register"
              className="text-indigo-500 hover:text-indigo-600 ml-1"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
