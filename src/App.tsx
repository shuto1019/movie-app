import { useEffect, useState } from 'react';
import './App.css'

function App() {
  //jsを書く

  const [keyWord, setKeyWord] = useState("");
  const [movieList, setMovieList] = useState([]);


  const fetchMovieList = async() => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ja&page=1",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    setMovieList(data.results);
  }

  
  useEffect(()=>{
    fetchMovieList();
  },[]);

  return (
    <div>
      <div>{keyWord}</div>
      <input type="text" onChange={(e)=>(setKeyWord(e.target.value))} />
      <div>       
        {movieList.filter((movie)=>movie.original_title.includes(keyWord)).map((movie)=>{
          return (
            <div key={movie.id} className="movie-card">
              <h2>{movie.original_title}</h2>
              <img src={`https://media.themoviedb.org/t/p/w600_and_h900_face/${movie.poster_path}`} alt={movie.original_title} />
              <p>{movie.overview}</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App
