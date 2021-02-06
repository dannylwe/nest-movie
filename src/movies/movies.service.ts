import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './entities/movies.entities';

@Injectable()
export class MoviesService {
    private movies: Movie[] = []

    getAllMovies(): Movie[] {
        return this.movies
    }

    createMovie(movieData: CreateMovieDTO): Movie[] {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
        return this.movies;
    }

    getSingleMovie(ID:number): Movie {
        const movie =  this.movies.find(movie => movie.id === ID);
        if(!movie) {
            throw new NotFoundException("movie not found");
        }
        return movie
    }

    deleteMovie(ID:number): boolean {
        this.getSingleMovie(ID);
        this.movies = this.movies.filter(movie => movie.id !== ID)
        return true
    }

    updateMovie(ID:number, updatedMovie:Movie) {
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
