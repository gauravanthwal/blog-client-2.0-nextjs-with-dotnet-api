import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";

const defaultImage = "https://fastly.picsum.photos/id/666/200/300.jpg?hmac=FfmCCw-UuMgMhTLigoNVx2auMxtw-EtixqVwwxaefq0";

const Card = ({ blog, isAuthor, deleteBlog }: any) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = React.useState<boolean>(false);
  const editBlog = (id: number) => {
    router.push(`/profile/update-blog/${id}`);
  };

  const navigateToBlog = () =>{
    router.push(`/blog/${blog.id}`);
  }
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {/* // eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="w-full h-30 object-cover"
        src={blog?.image || defaultImage}
        alt={blog.title}
      />
      <div className="px-3 py-2 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{blog.title}</h2>
          <p className="text-gray-600 mb-4 text-sm">{blog.body?.substring(0, 100)}</p>
        </div>
        <div className="flex justify-between items-center">
          {/* <p>
            <Link
              href={"/"}
              className="italic text-gray-500 text-sm font-semibold underline"
            >
              {blog?.author?.email}
            </Link>
          </p> */}
          <button
            onClick={navigateToBlog}
            className="px-4 py-2 bg-indigo-500 mt-2 text-white rounded-lg hover:bg-indigo-600 transition duration-200 cursor-pointer"
          >
            Read More
          </button>
          <p className="text-sm px-2 text-gray-500">
            {moment(blog?.createdAt).format("MMM Do YYYY, h:mm A")}
          </p>
        </div>
      </div>
      {isAuthor && (
        <div className="px-6 my-4 flex gap-3">
          <button
            className="bg-yellow-400 px-2 py-1 rounded-md text-sm cursor-pointer"
            onClick={() => editBlog(blog.id)}
          >
            Edit
          </button>
          <button
            className="bg-red-400 px-2 py-1 rounded-md text-sm cursor-pointer"
            onClick={() => deleteBlog(blog.id)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
