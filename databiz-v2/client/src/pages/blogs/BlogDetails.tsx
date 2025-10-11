import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../services/blog.service";

const BlogDetails: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (id) getBlogById(id).then((res) => setBlog(res.data));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <p className="mb-2">{blog.content}</p>
      <p className="text-gray-500 text-sm">By {blog.author.name}</p>
    </div>
  );
};

export default BlogDetails;
