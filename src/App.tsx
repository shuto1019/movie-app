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

  const heroTitle = "君の名は。";
  const heroYear = 2016;
  const heroOverview = "高校生の瀧と三葉は、ある朝突然お互いの体が入れ替わってしまう。最初は戸惑う二人だったが、次第に入れ替わった生活を楽しむようになる。しかし、ある日を境に二人の入れ替わりは起こらなくなり...。";
  const heroImage = 
  "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/yLglTwyFOUZt5fNKm0PWL1PK5gm.jpg";
  return (
   <div>
      <section className="hero-section">
        {heroImage && (
          <>
            <img className="hero-section-bg" src={heroImage} alt={heroTitle} />
            <div className="hero-section-gradient" />
          </>
        )}
        <div className="hero-section-content">
          <h1 className="hero-section-title">{heroTitle}</h1>
          <div className="hero-section-badges">
            <span className="hero-section-badge">{heroYear}</span>
          </div>
          {heroOverview && (
            <p className="hero-section-overview">{heroOverview}</p>
          )}
          <div className="hero-section-actions">
            <button className="hero-section-btn hero-section-btn-primary">
              <span>:再生ボタン: Play</span>
            </button>
            <button className="hero-section-btn hero-section-btn-secondary">
              <span>More Info</span>
            </button>
          </div>
        </div>
      </section>
      <section className="movie-row-section">
        <h2 className="movie-row-title">
          {keyWord ? `「${keyWord}」の検索結果` : "人気映画"}
        </h2>
        <div className="movie-row-scroll">
          {movieList.map((movie) => (
            <Link to={`/movies/${movie.id}`}>
              <div className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                  alt={movie.original_title}
                />
                <h3 className="movie-card-title">{movie.original_title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div className="app-search-wrap">
        <input
          type="text"
          className="app-search"
          placeholder="映画タイトルで検索..."
          onChange={(e) => setKeyWord(e.target.value)}
        />
      </div>
   </div>
        
  );
}

export default App
