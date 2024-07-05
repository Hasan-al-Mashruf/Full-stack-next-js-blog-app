"use client";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBox = () => {
  // useSearchparams hook give s search query
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    // URLSearchParams js method ios for manipulate query in url live
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("searchQuery", term);
    } else {
      params.delete("searchQuery");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <input
      type="email"
      placeholder="Search..."
      className="w-full outline-none bg-white text-sm px-5 py-3"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default SearchBox;
