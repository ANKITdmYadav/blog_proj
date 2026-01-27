import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/blogs/my-blog",
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/blogs/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Blog deleted successfully");
      setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="container mx-auto my-12 p-4 pl-0 md:pl-64">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {myBlogs.length > 0 ? (
          myBlogs.map((element) => (
            <div
              key={element._id}
              onClick={() => navigate(`/blog/${element._id}`)}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            >
              {element?.blogImage && (
                <img
                  src={element.blogImage.url}
                  alt="blogImg"
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <span className="text-sm text-gray-600">
                  {element.category}
                </span>

                <h4 className="text-xl font-semibold my-2">
                  {element.title}
                </h4>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/blog/update/${element._id}`}
                    onClick={(e) => e.stopPropagation()} // 🔑 VERY IMPORTANT
                    className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                  >
                    UPDATE
                  </Link>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 🔑 prevent card click
                      handleDelete(element._id);
                    }}
                    className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            You have not posted any blog to see!
          </p>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
