"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const Pagination = ({ meta }) => {
  const [term, setTerm] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handlePagiantion = () => {
    // URLSearchParams js method ios for manipulate query in url live
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("page", String(term));
    } else {
      params.delete("page");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (term) {
      handlePagiantion();
    }
  }, [term]);
  console.log({ meta });
  return (
    <nav className="flex items-center gap-x-1">
      <Button variant="default" disabled={term <= 1}>
        <svg
          className="flex-shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span>Previous</span>
      </Button>
      {Array.from({ length: meta.total }, (_, i) => {
        const index = i + 1;

        return (
          <Button
            variant={meta?.currentPage == index ? "destructive" : "ghost"}
            onClick={() => setTerm(index)}
          >
            {index}
          </Button>
        );
      })}

      <Button variant="default" disabled={term >= meta?.total}>
        <span>Next</span>
        <svg
          className="flex-shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </Button>
    </nav>
  );
};

export default Pagination;
