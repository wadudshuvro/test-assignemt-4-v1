import { useEffect, useState } from "react";

const useNewsQuery = (category = "", searchTerm = "") => {
  const [data, setData] = useState({ articles: [], result: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        let endpoint;
        if (searchTerm.trim()) {
          endpoint = `http://localhost:8000/v2/search?q=${encodeURIComponent(
            searchTerm
          )}`;
        } else if (category.trim()) {
          endpoint = `http://localhost:8000/v2/top-headlines?category=${category}`;
        } else {
          endpoint = "http://localhost:8000/v2/top-headlines";
        }

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchNews, 500);
    return () => clearTimeout(debounceTimeout);
  }, [category, searchTerm]);

  return { data, loading, error };
};

export default useNewsQuery;
