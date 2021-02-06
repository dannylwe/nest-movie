import { Injectable, NotFoundException } from '@nestjs/common';
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
        const movie =  this.movies.find(movie => movie.id === parseInt(ID));
        if(!movie) {
            throw new NotFoundException("movie not found");
        }
        return movie
    }

    deleteMovie(ID:string): boolean {
        this.getSingleMovie(ID);
        this.movies = this.movies.filter(movie => movie.id !== +ID)
        return true
    }

    updateMovie(ID:string, updatedMovie:Movie) {
        const movie = this.getSingleMovie(ID);
        this.deleteMovie(ID)
        this.movies.push({...movie, ...updatedMovie})
    }

    searchForMovie(year:string) {
        const movie =  this.movies.find(movie => movie.year === parseInt(year));
        if(!movie) {
            throw new NotFoundException("movie not found");
        }
        return movie
    }
}
