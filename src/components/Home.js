import React, { useState } from "react";

// import components
import HeroImage from "./elements/HeroImage";
import SearchBar from "./elements/SearchBar";
import Grid from "./elements/Grid";
import MovieThumb from "./elements/MovieThumb";
import LoadMoreBtn from "./elements/LoadMoreBtn";
import Spinner from "./elements/Spinner";
// custom hook
import { useHomeFetch } from "./hooks/useHomeFetches";
import {
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  POPULAR_BASE_URL,
  SEARCH_BASE_URL
} from "../config";

import NoImage from "./images/no_image.jpg";

const Home = () => {
  //If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t depend on any values from props or states so it never needs to re-run. This isn’t handled as a special case — it follows directly from how the dependencies array always works.
  const [searchTerm, setSearchTerm] = useState("");
  const [
    {
      state: { movies, heroImage, currentPage, totalPages },
      loading,
      error
    },
    fetchMovies
  ] = useHomeFetch(searchTerm);
  

  const searchMovies = search => {
    // value in SearchBar;
    const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;
    // set a search term and save it in the state searchTerm
    // The search bar component use 'state' variable to keep track of value
    // the home component use 'searchTerm' variable to keep track of the same value
    setSearchTerm(search);
    fetchMovies(endpoint);
  };

  const loadMoreMovies = () => {
    //   load more will have two different end points
    //   depending on which mode, the search mode or the normal mode
    //   grab search for next page
    const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage +
      1}`;
    const popularEndpoint = `${POPULAR_BASE_URL}&page=${currentPage + 1}`;

    const endpoint = searchTerm ? searchEndpoint : popularEndpoint;
    console.log("Going to fetch more movies");
    fetchMovies(endpoint);
    // fetchMovies has a setState that set the increment the currentPage
  };

  if (!movies[0]) {
    return <Spinner />;
  }

  return (
    <>
      {!searchTerm && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
          title={heroImage.original_title}
          text={heroImage.overview}
        />
      )}
      <SearchBar callback={searchMovies} />
      <Grid header={searchTerm ? "Search Results" : "Popular Movies"}>
        {movies.map(movie => (
          <MovieThumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            movieId={movie.id}
            movieName={movie.original_title}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {currentPage < totalPages && !loading && (
        <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
      )}
    </>
  );
};

export default Home;
