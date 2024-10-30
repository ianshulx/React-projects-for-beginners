const Search = () => {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        className="px-2 py-1.5 pl-6 w-48 bg-transparent border border-white rounded-full outline-none text-xs font-bold"
        placeholder="SEARCH"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute right-0 w-5 mr-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
  );
};

export default Search;
