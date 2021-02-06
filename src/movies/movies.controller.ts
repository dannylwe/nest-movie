import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAllMovies() {
        return "All the movies";
    }

    @Get('/:id')
    getSingleMovie(@Param('id') movieID:string) {
        return `This is a single movie with the ID ${movieID}`;
    }

    @Post()
    createMovie() {
        return "This will create a movie";
    }

    @Delete("/:id")
    deleteMovie(@Param("id") movieID:string) {
        return `This Deletes a movie with ID ${movieID}`;
    }

    @Patch("/:id")
    patchMovie(@Param("id") movieID:string) {
        return `Movie with ID ${movieID} has been patched`
    }
}
