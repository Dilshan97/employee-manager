/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useDebounce = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedTerm) {
      params.set("keyword", debouncedTerm);
    } else {
      params.delete("keyword");
    }

    router.push(`?${params.toString()}`);
  }, [debouncedTerm, router]);

  return {
    setSearchTerm,
  };
};

export default useDebounce;
