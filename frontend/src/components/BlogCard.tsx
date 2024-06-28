import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  id: number;
  name: string;
  title: string;
  created_at: string;
}

export default function BlogCard({
  name,
  title,
  created_at,
  id,
}: BlogCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <div
      className="flex flex-col gap-2 p-8 mx-5 md:mx-32 lg:mx-32 cursor-pointer h-44 border-b-2 justify-center"
      onClick={handleCardClick}
    >
      <div className="flex gap-2 items-center">
        <span className="rounded-full bg-gray-300 flex justify-center items-center h-6 w-6">
          A
        </span>
        <p>{name}</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <h2 className="font-semibold text-2xl">{title}</h2>
          <p className="text-gray-500">
            {new Date(created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <img
          src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*_689AsbPJNbSuDbL"
          className="h-24 rounded"
          alt="logo"
        />
      </div>
    </div>
  );
}
