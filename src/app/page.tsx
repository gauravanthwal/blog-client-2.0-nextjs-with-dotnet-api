"use client";
import Card from "@/components/common/Card";
import Container from "@/components/common/Container";
import { axiosClientWithHeaders } from "@/config/axiosClient";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const HomePage = () => {
  const [blogs, setBlogs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchBlogs = async () => {
    // Fetch blogs from the API
    setLoading(true);
    try {
      const res = await axiosClientWithHeaders.get("/blog/get-all");
      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }
      if (res?.data?.data?.blgos?.length > 0) {
        setBlogs(res?.data?.data?.blgos);
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <Container>
      {loading ? (
        <h1>Loading...</h1>
      ) : blogs.length > 0 ? (
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <Card key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <h1>No Blog Found!</h1>
      )}
    </Container>
  );
};

export default HomePage;
