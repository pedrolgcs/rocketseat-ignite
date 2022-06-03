import {
  useContext,
  useState,
  createContext,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';

// services
import { api } from '../services/api';

// types
import { Genre } from '../types/Genre';
import { Movie } from '../types/Movie';

interface MoviesContextData {
  movies: Movie[];
  genres: Genre[];
  selectedGenre: Genre;
  selectedGenreId: number;
  handleSelectGenre: (id: number) => void;
}

interface MoviesProviderProps {
  children: ReactNode;
}

const MoviesContext = createContext({} as MoviesContextData);

function MoviesProvider({ children }: MoviesProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  const handleSelectGenre = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        genres,
        selectedGenre,
        selectedGenreId,
        handleSelectGenre,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

const useMovies = () => {
  return useContext(MoviesContext);
};

export { MoviesContext, MoviesProvider, useMovies };
