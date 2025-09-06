"use client";
import { defaultImage } from "@/components/common/Card";
import Container from "@/components/common/Container";
import { axiosClientWithHeaders } from "@/config/axiosClient";
// import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

// @typescript-eslint/no-unused-vars
const UpdateBlog = () => {
  const router = useRouter();
  const params: any = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formValue, setFormValue] = React.useState({
    title: "",
    body: "",
    thumbnail: "",
  });
  const [image, setImage] = React.useState<File | null>(null);

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
      const formData = new FormData();
      formData.append("title", formValue.title);
      formData.append("body", formValue.body);
      if (image) {
        formData.append("Image", image); // must match property name in DTO or API
      }

      const res = await axiosClientWithHeaders.put(
        "/blog/update/" + params.blogId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // important
          },
        }
      );

      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }
      if (res?.data) {
        toast.success("Blog updated successfully");
        setFormValue({ title: "", body: "", thumbnail: "" });
        router.push("/profile");
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (params.blogId) {
      const myBlogs = JSON.parse(localStorage.getItem("myBlogs")!);

      if (myBlogs && myBlogs.length > 0) {
        const blog = myBlogs.find((b: any) => b.id == parseInt(params?.blogId));
        if (blog) {
          setFormValue({
            title: blog.title,
            body: blog.body,
            thumbnail: blog.thumbnail,
          });
        } else {
          toast.error("Blog not found");
          router.push("/profile");
        }
      }
    }
  }, [params.blogId, router]);

  return (
    <Container>
      <h1 className="text-lg font-semibold text-gray-600 my-4">Update Blog</h1>

      <form onSubmit={saveBlog} className="pb-20">
        <img
          className="w-[150px] mb-4 rounded-2xl"
          src={formValue?.thumbnail || defaultImage}
          alt=""
        />
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
        <div className="flex">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-500 file:cursor-pointer
             file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-1
             file:text-sm file:font-semibold
             file:bg-gray-200 file:text-black"
        />
         {image && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Selected preview"
              className="h-[80px] rounded-lg border border-gray-300 object-cover"
            />
          </div>
        )}
        </div>
        <div className="border-t-1 border-gray-300 my-3"></div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-90">
          {loading? "Loading..." : "Update"} 
        </button>
      </form>
    </Container>
  );
};

export default UpdateBlog;
