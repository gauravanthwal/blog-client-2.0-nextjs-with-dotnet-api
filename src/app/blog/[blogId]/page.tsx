/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Container from "@/components/common/Container";
import { axiosClientWithHeaders } from "@/config/axiosClient";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { HeartIcon, HeartIconFill } from "../../../components/icons/icons";
import Comments from "./Commnets";
import AddComment from "./AddComment";

const defaultImage =
  "https://fastly.picsum.photos/id/666/200/300.jpg?hmac=FfmCCw-UuMgMhTLigoNVx2auMxtw-EtixqVwwxaefq0";

const BlogPost = () => {
  const params = useParams();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [blog, setBlog] = React.useState<any>({});
  const [comments, setComments] = React.useState<any>({});

  const fetchBlogs = async (isRefresh: boolean) => {
    // Fetch blogs from the API
    if (!isRefresh) {
      setLoading(true);
    }
    try {
      const res = await axiosClientWithHeaders.get("/blog/" + params.blogId);
      // console.log(res);

      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }
      if (res?.data) {
        setBlog(res?.data);
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (isRefresh: boolean) => {
    // Fetch comments from the API
    if (!isRefresh) {
      setLoading(true);
    }
    try {
      const res = await axiosClientWithHeaders.get(
        `/Comment/${params.blogId}/commnets`
      );
      console.log(res);

      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }
      if (res?.data) {
        setComments(res?.data);
      }
    } catch (error: any) {
      console.error("Error fetching comments:", error);
      // toast.error(error?.response?.data?.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  const onLikeHandle = async () => {
    setLoading(true);
    try {
      const res = await axiosClientWithHeaders.post(
        "/blog/like/" + params.blogId
      );
      console.log(res);

      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }

      if (res?.data?.isSuccess) {
        // successfully liked/unliked the blog
        setBlog((prev: any) => ({
          ...prev,
          isLiked: !prev.isLiked,
          likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        }));
        // fetchBlogs(true); // re-fetch the blog to update like status
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (params: any) => {
    setLoading(true);
    try {
      const res = await axiosClientWithHeaders.post("/Comment/Add", params);
      console.log(res);

      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }

      if (res?.data) {
        // successfully liked/unliked the blog
        // setComments((prev: any) => ({
        //   ...prev,
        //   isLiked: !prev.isLiked,
        //   likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        // }));
        fetchComments(true); // re-fetch the blog to update like status
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    setLoading(true);
    try {
      const res = await axiosClientWithHeaders.delete(
        "/Comment/delete/" + commentId
      );
      console.log(res);

      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }

      if (res?.data) {
        // successfully liked/unliked the blog
        // setBlog((prev: any) => ({
        //   ...prev,
        //   isLiked: !prev.isLiked,
        //   likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        // }));
        fetchComments(true);
      }
    } catch (error: any) {
      console.error("Error deleting comments:", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete comment!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    setLoading(true);
    try {
      const payload = {
        content,
      };
      const res = await axiosClientWithHeaders.put(
        "/Comment/update/" + commentId,
        payload
      );
      console.log(res);

      if (res.status != 200) {
        throw new Error("Network response was not ok");
      }

      if (res?.data) {
        // successfully liked/unliked the blog
        // setBlog((prev: any) => ({
        //   ...prev,
        //   isLiked: !prev.isLiked,
        //   likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        // }));
        fetchComments(true);
      }
    } catch (error: any) {
      console.error("Error updating comments:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update comment!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(false);
    fetchComments(false);
  }, []);
  return (
    <div className="mb-16">
      <div>
        <Image
          src={defaultImage}
          alt="Blog Image"
          width={400}
          height={400}
          className="w-full h-80 object-cover mb-4"
        />
      </div>
      <Container>
        <div className="flex items-center gap-2">
          <button className="cursor-pointer" onClick={onLikeHandle}>
            <span>{blog?.isLiked ? <HeartIconFill /> : <HeartIcon />}</span>
          </button>
          {loading ? (
            <span className="text-sm text-gray-500">Syncing</span>
          ) : (
            <span className="text-sm text-gray-500">
              {blog?.likeCount} {blog?.likeCount > 1 ? "Likes" : "Like"}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold my-4">{blog?.title}</h1>
          <p className="mb-4">{blog?.body}</p>
          <hr />
        </div>

        <div className="my-2">
          <p className="text-sm text-gray-500">
            {moment(blog?.createdAt).format("MMM Do YYYY, h:mm A")}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Author: {blog?.author?.email} <br />
          </p>
        </div>
        <hr />
        <AddComment handleAddComment={handleAddComment} />
        {/* {comments?.length > 0 && ( */}
        <Comments
          comments={comments}
          handleUpdateComment={handleUpdateComment}
          handleDeleteComment={handleDeleteComment}
        />
        {/* )} */}
      </Container>
    </div>
  );
};

export default BlogPost;
