import { useEffect } from "react";
import { useParams } from "react-router";

type MovieDetailJson = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: string;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
type Movie = {
  id: string;
  original_title: string;
  overview: string;
  poster_path: string;
  year: number;
  rating: number;
  runtime: number;
  score: number;
  genres: string[];
};

function MovieDetail() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);

    const fetchMovieDetail = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ja`,
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                },
            }
        )
    };

    useEffect(()=>{
        fetchMovieDetail();
    },[])
    return (
        <div>
            <h1>Movie Detail Page</h1>
            <div>Movie ID: {movieId}</div>
        </div>
    );
}

export default MovieDetail;