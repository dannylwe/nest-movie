import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
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
    searchForMovie(@Query('year') searchYear:string): Movie {
        return this.movieService.searchForMovie(searchYear);
    }

    @Get('/:id')
    getSingleMovie(@Param('id') movieID:string): Movie {
        return this.movieService.getSingleMovie(movieID)
    }
    
    @Post()
    createMovie(@Body() movieData): Movie[] {
        return this.movieService.createMovie(movieData)
    }

    @Delete("/:id")
    deleteMovie(@Param("id") movieID:string) {
        this.getSingleMovie(movieID)
        return this.movieService.deleteMovie(movieID);
    }

    @Patch("/:id")
    patchMovie(@Param("id") movieID:string, @Body() movieUpdate) {
        return this.movieService.updateMovie(movieID, movieUpdate)
    }
}
