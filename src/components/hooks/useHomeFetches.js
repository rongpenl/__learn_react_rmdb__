import { useState, useEffect } from "react";
import { POPULAR_BASE_URL } from "../../config";

export const useHomeFetch = searchTerm => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async endpoint => {
    setError(false);
    setLoading(true);

    const isLoadMore = endpoint.search("page");

    try {
      // 第一个await对应fetchMovies 第二个是因为json()函数也是异步的

      const result = await (await fetch(endpoint)).json();
      setState(prev => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? // -1 means no page, means not loading more. Loading more if true
              [...prev.movies, ...result.results]
            : [...result.results],
        heroImage: prev.heroImage || result.results[0],
        currentPage: result.page,
        totalPages: result.total_pages
      }));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStorage.homeState) {
      console.log("Grabbing from sessionStorage");
      // May contain more than first-page's content
      setState(JSON.parse(sessionStorage.homeState));
      setLoading(false);
    } else {
      console.log("Grabbing from API");
      fetchMovies(POPULAR_BASE_URL);
    }
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      // persist states
      console.log("Save States to sessionStorage");
      sessionStorage.setItem("homeState", JSON.stringify(state));
    }
  }, [searchTerm, state]);

  return [{ state, loading, error }, fetchMovies];
};
