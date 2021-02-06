import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAllMovies() {
        return "All the movies";
    }

    @Get("/search")
    searchForMovie(@Query('year') searchYear:string) {
        return `searching for movie from year ${searchYear}`;
    }

    @Get('/:id')
    getSingleMovie(@Param('id') movieID:string) {
        return `This is a single movie with the ID ${movieID}`;
    }

    @Post()
    createMovie(@Body() movieData) {
        return movieData;
    }

    @Delete("/:id")
    deleteMovie(@Param("id") movieID:string) {
        return `This Deletes a movie with ID ${movieID}`;
    }

    @Patch("/:id")
    patchMovie(@Param("id") movieID:string, @Body() movieUpdate) {
        return {
            movieID,
            ...movieUpdate
        }
    }
}
