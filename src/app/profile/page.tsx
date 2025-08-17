"use client";
import Card from "@/components/common/Card";
import Container from "@/components/common/Container";
import { axiosClientWithHeaders } from "@/config/axiosClient";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import AddBlog from "./AddBlog";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [newBlogOpen, setNewBlogOpen] = React.useState<boolean>(false);

  const fetchBlogs = async () => {
    // Fetch blogs from the API
    setLoading(true);
    try {
      const res = await axiosClientWithHeaders.get("/blog/my-blogs");

      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }
      if (res?.data?.length > 0) {
        setBlogs(res?.data);
        localStorage.setItem("myBlogs", JSON.stringify(res?.data));
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const addBlog = () => {
    router.push("/profile/add-blog");
  };

  const deleteBlog = async (blogId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!isConfirmed) return;
    setLoading(true);
    try {
      const res = await axiosClientWithHeaders.delete("/blog/delete/" + blogId);

      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }
      if (res?.data?.message) {
        toast.success("Blog deleted successfully");
        fetchBlogs(); // Refresh the blog list after deletion
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
      <div className="my-4">
        <button
          onClick={addBlog}
          className="text-white cursor-pointer bg-green-400 hover:bg-green-500 px-4 py-2 rounded-md"
        >
          Add New Blogs
        </button>
      </div>
      <div className="my-6">
        <h1 className="text-lg font-semibold text-gray-600">My Blogs</h1>
      </div>
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : blogs.length > 0 ? (
          <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <Card key={blog.id} blog={blog} isAuthor={true} deleteBlog={deleteBlog} />
            ))}
          </div>
        ) : (
          <h1>No Blog Found!</h1>
        )}
      </div>

      <AddBlog open={newBlogOpen} setOpen={setNewBlogOpen} />
      {/* AddBlog component to handle adding new blogs */}
    </Container>
  );
};

export default ProfilePage;
