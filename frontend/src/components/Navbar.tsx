import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="flex justify-between h-12 items-center shadow-xl px-5 py-7">
      <div className="flex gap-5 items-center">
        <img
          src="https://imgs.search.brave.com/NgoEmK5lB1A6mKd9JcV14_1h4JhjMAEz7zQWbPlrTmg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9tZWRpdW0t/aWNvbi0yNTZ4MjIx/LW5zNDFwczQ0LnBu/Zw"
          alt="medium"
          className="w-8 h-8"
        />
        <input
          type="search"
          className="border border-gray-300 focus: outline-none px-5 py-2 rounded-3xl relative pl-10"
          placeholder="Search"
        />
        <MagnifyingGlassIcon className="w-6 h-6 absolute left-20 opacity-50" />
      </div>
      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <PencilSquareIcon className="w-6 h-6 opacity-50" />
          <span className="text-gray-500">Write</span>
        </div>
        <BellIcon className="w-6 h-6 cursor-pointer opacity-50" />
        <span className="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center cursor-pointer">
          A
        </span>
      </div>
    </nav>
  );
}
