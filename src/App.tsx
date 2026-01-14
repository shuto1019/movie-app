import { useEffect, useState } from 'react';
import './App.css'
import { Link } from 'react-router';

type Movie = {
  id: string;
  original_title: string;
  poster_path: string;
  overview: string;  
};

type MovieJson = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

function App() {
  //jsを書く

  const [keyWord, setKeyWord] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);


  const fetchMovieList = async() => {
    let url = "";
    if(keyWord){
      url = `https://api.themoviedb.org/3/search/movie?query=${keyWord}&include_adult=false&language=ja&page=1`
    } else {
      url = "https://api.themoviedb.org/3/movie/popular?language=ja&page=1";
    }
    const response = await fetch(
      url,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    setMovieList(data.results.map((movie: MovieJson)=>({
        id: movie.id,
        original_title: movie.original_title,
        overview: movie.overview,
        poster_path: movie.poster_path,
    })));
  }

  
  useEffect(()=>{
    fetchMovieList();
  },[keyWord]);

  return (
    <div>
      <div>{keyWord}</div>
      <input type="text" onChange={(e)=>(setKeyWord(e.target.value))} />
      <div>       
        {movieList.filter((movie)=>movie.original_title.includes(keyWord)).map((movie)=>{
          return (
            <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card">
              <h2>{movie.original_title}</h2>
              <img src={`https://media.themoviedb.org/t/p/w600_and_h900_face/${movie.poster_path}`} alt={movie.original_title} />
              <p>{movie.overview}</p>
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default App
