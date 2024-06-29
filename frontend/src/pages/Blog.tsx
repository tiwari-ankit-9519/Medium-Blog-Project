import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingComponent from "../components/LoadingComponent";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author: {
    name: string;
  };
  created_at: string;
}

export default function Blog() {
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getBlog = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://backend.pt713138.workers.dev/api/v1/blog/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setBlog(response.data.post);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getBlog();
  }, [getBlog]);

  return (
    <>
      {error && <p>Some Error Occurred: {error}</p>}
      {loading && <LoadingComponent />}
      <div className="flex justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/2 p-5 mt-20">
          {blog && (
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">{blog.title}</h1>
              <p>{blog.content.slice(0, 100)}</p>
              <div className="flex items-center gap-2">
                <span className="flex justify-center items-center rounded-full bg-gray-300 h-5 w-5">
                  {blog.author.name[0]}
                </span>
                <p>{blog.author.name}</p>
                <p>
                  {new Date(blog.created_at).toLocaleString("en-us", {
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-10">
                <div className="h-[0.5px] bg-slate-200"></div>
                <div className="h-[0.5px] bg-slate-200"></div>
              </div>
              <div className="border-l-4 border-black pl-5 mt-5 italic">
                If you’re a non-premium user, click here to read this article
                for free. If not, continue reading.
              </div>
              <div className="flex flex-col gap-10 mt-10">
                <img
                  src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*_689AsbPJNbSuDbL"
                  alt="image"
                />
                <p className="text-justify">{blog.content}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
