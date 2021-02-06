import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Movie } from './entities/movies.entities';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly movieService: MoviesService) {}

    @Get()
    getAllMovies():Movie[] {
        return this.movieService.getAllMovies();
    }

    @Get("/search")
    searchForMovie(@Query('year') searchYear:string) {
        return `searching for movie from year ${searchYear}`;
    }

    @Get('/:id')
    getSingleMovie(@Param('id') movieID:string): Movie {
        return this.movieService.getSingleMovie(movieID)
    }

    @Post()
    createMovie(@Body() movieData) {
        return this.movieService.createMovie(movieData)
    }

    @Delete("/:id")
    deleteMovie(@Param("id") movieID:string) {
        return this.movieService.deleteMovie(movieID);
    }

    @Patch("/:id")
    patchMovie(@Param("id") movieID:string, @Body() movieUpdate) {
        return {
            movieID,
            ...movieUpdate
        }
    }
}
