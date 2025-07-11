export interface MovieItem {
    id: number;
    title: string;
    release_date: string; 
    poster_path: string | null;
    vote_average: number;
    overview: string;
}
