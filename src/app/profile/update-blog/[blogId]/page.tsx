"use client";
import Container from "@/components/common/Container";
import { axiosClientWithHeaders } from "@/config/axiosClient";
// import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const UpdateBlog = () => {
  const router = useRouter();
  const params:any = useParams();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formValue, setFormValue] = React.useState({
    title: "",
    body: "",
    // image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };


  const saveBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosClientWithHeaders.put("/blog/update/"+params.blogId, formValue);
      
      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }
      if (res?.data) {
        toast.success("Blog updated successfully");
        setFormValue({ title: "", body: "" });
        router.push("/profile");
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  // TODO
  const fetchBlogById = async () => {
    setLoading(true);
    try {
      const res = await axiosClientWithHeaders.get("/blog/my-blogs");

      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }
      if (res?.data?.blogId) {
        toast.success("Blog created successfully");
        setFormValue({ title: "", body: "" });
        router.push("/profile");
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.blogId) {
      const myBlogs = JSON.parse(localStorage.getItem("myBlogs")!);

      if(myBlogs && myBlogs.length > 0) {
        const blog = myBlogs.find((b: any) => b.id == parseInt(params?.blogId));
        if (blog) {
          setFormValue({
            title: blog.title,
            body: blog.body,
            // image: blog.image,
          });
        } else {
          toast.error("Blog not found");
          router.push("/profile");
        }
      }
    }
  }, []);

  return (
    <Container>
      <h1 className="text-lg font-semibold text-gray-600 my-4">Update Blog</h1>

      <form onSubmit={saveBlog}>
        <input
          type="text"
          placeholder="Title"
          value={formValue.title}
          onChange={handleChange}
          name="title"
          id="title"
          className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
        />

        <textarea
          placeholder="Body"
          value={formValue.body}
          onChange={handleChange}
          name="body"
          id="body"
          className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
          rows={5}
        ></textarea>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-90">
          Update
        </button>
      </form>
    </Container>
  );
};

export default UpdateBlog;
