import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Movie } from "../types";

interface State {
  data: Movie[] | null;
  error: string | null;
  loading: boolean;
}

const initialState: State = {
  data: null,
  error: null,
  loading: false,
};

enum ActionType {
  LOADING,
  SUCCESS,
  FAILED,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.SUCCESS; payload: Movie[] }
  | { type: ActionType.FAILED; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.FAILED:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    case ActionType.SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    default:
      return initialState;
  }
};

const useMoviesList = (offset: number) => {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetchMoviesList();
  }, [offset]);

  const fetchMoviesList = async () => {
    if (data && count && data.length >= count) return;

    dispatch({ type: ActionType.LOADING });
    try {
      const response = await axios.get(
        `http://localhost:8080/movies/list?offset=${offset}`
      );
      //   console.log(response);
      const moviesData = data
        ? [...data, ...response.data.movies]
        : response.data.movies;
      setCount(response.data.count);
      dispatch({ type: ActionType.SUCCESS, payload: moviesData });
    } catch (error) {
      dispatch({ type: ActionType.FAILED, payload: "SOMETHING WENT WRONG" });
    }
  };

  return { data, loading, error };
};

export default useMoviesList;

// loading
// {type: LOADING}
// error
// {type: ERROR, payload: string}
// success
// {type: SUCCESS, payload: Movies[]}
