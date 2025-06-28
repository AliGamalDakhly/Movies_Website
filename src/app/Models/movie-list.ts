import { MovieItem } from "./movie-item";

export interface MovieList {
    page: number;
    results: MovieItem[];
    total_pages: number;
    total_results: number;
}
