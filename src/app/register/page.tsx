'use client'
import { axiosClient } from "@/config/axiosClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    c_password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Handle registration logic here

    try {
      const res = await axiosClient.post("/user/register", formData);
      if(res.status === 200) {
        toast.success("Registration successful! Please login.");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed!");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="bg-gray-50 px-12 py-8 rounded-lg">
          <h1 className="text-2xl font-bold text-indigo-500 mb-8 text-center uppercase">
            Register
          </h1>
          <form className="" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <input
                className="border rounded-md px-4 py-2 outline-indigo-500 w-[300px]"
                placeholder="Enter email"
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
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
            <div className="flex flex-col mb-4">
              <input
                className="border rounded-md px-4 py-2 outline-indigo-500  w-[300px]"
                placeholder="Confirm Password"
                type="password"
                id="c_password"
                name="c_password"
                value={formData.c_password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-500 text-white w-full py-2 rounded-lg cursor-pointer hover:bg-indigo-600"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>
          <div className="text-sm mt-4">
            <span>Already have an account?</span>
            <Link
              href="/login"
              className="text-indigo-500 hover:text-indigo-600 ml-1"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
