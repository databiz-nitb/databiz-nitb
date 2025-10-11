import React, { useEffect, useState } from "react";
import { getBlogs } from "../../services/blog.service";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    getBlogs().then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((b) => (
        <Link key={b._id} to={`/blogs/${b._id}`}>
          <Card title={b.title} description={b.summary} />
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
