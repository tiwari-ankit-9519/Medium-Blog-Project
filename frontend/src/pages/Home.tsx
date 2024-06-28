import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import LoadingComponent from "../components/LoadingComponent";
import BlogCard from "../components/BlogCard";
import Topbar from "../components/Topbar";

interface BlogPost {
  id: number;
  title: string;
  author: {
    name: string;
  };
  created_at: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const getAllBlogs = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://backend.pt713138.workers.dev/api/v1/blog/blog",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setBlogs(response.data.posts);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);

  console.log(blogs);

  return (
    <>
      {error && <p>Error fetching blogs</p>}
      {loading && <LoadingComponent />}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 min-h-screen">
        <div className="border-r-2 col-span-2">
          <div className="flex flex-col gap-10 mt-10">
            <Topbar />
            {blogs?.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog?.title}
                name={blog?.author?.name}
                created_at={blog?.created_at}
              />
            ))}
          </div>
        </div>
        <div className="hidden md:block lg:block lg:col-span-1">Hello</div>
      </div>
    </>
  );
}
