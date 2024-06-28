import { useRef } from "react";

const blogCategories = [
  "For you",
  "Following",
  "UX",
  "React",
  "Software Engineering",
  "Artificial Intelligence",
  "Technology",
  "Health & Wellness",
  "Food & Drink",
  "Travel",
  "Personal Finance",
  "Home & Garden",
  "Education",
  "Fashion & Beauty",
  "Sports",
  "Entertainment",
  "Parenting",
  "Career Development",
  "Environment",
  "Art & Culture",
  "Auto & Motorcycles",
  "Business & Entrepreneurship",
  "Crafts & Hobbies",
  "Science & Nature",
  "Philosophy & Spirituality",
  "History",
];

export default function Topbar() {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: string) => {
    if (scrollContainer.current) {
      const { scrollLeft, clientWidth } = scrollContainer.current;
      const scrollAmount = clientWidth / 2;

      if (direction === "left") {
        scrollContainer.current.scrollTo({
          left: scrollLeft - scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollContainer.current.scrollTo({
          left: scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="relative flex items-center mx-5 md:mx-32 lg:mx-32 px-5">
      <button
        className="absolute left-0 z-10 p-2 shadow opacity-50"
        onClick={() => handleScroll("left")}
      >
        &lt;
      </button>
      <div
        ref={scrollContainer}
        className="flex gap-4 overflow-hidden items-center p-2 border-b list-none min-w-full"
      >
        {blogCategories.map((category, index) => (
          <li
            key={category}
            className={`cursor-pointer whitespace-nowrap px-2 ${
              index === 0 ? "border-b-2 border-black" : ""
            }`}
          >
            {category}
          </li>
        ))}
      </div>
      <button
        className="absolute right-0 z-10 p-2 shadow opacity-50"
        onClick={() => handleScroll("right")}
      >
        &gt;
      </button>
    </div>
  );
}
