import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movies.entities';

@Injectable()
export class MoviesService {
    private movies: Movie[] = []

    getAllMovies(): Movie[] {
        return this.movies
    }

    createMovie(movieData: Movie): Movie[] {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
        return this.movies;
    }

    getSingleMovie(ID:string): Movie {
        return this.movies.find(movie => movie.id === parseInt(ID));
    }

    deleteMovie(ID:string): boolean {
        const index = this.movies.findIndex(movie => movie.id === parseInt(ID));
        if (index > -1) {
            this.movies.splice(index, 1);
        }
        console.log(this.movies)
        return true
    }
}
