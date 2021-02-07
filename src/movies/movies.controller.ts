import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movies.entities';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAllMovies(): Movie[] {
    return this.movieService.getAllMovies();
  }

  @Get('/search')
  searchForMovie(@Query('year') searchYear: string): Movie {
    return this.movieService.searchForMovie(searchYear);
  }

  @Get('/:id')
  getSingleMovie(@Param('id') movieID: number): Movie {
    return this.movieService.getSingleMovie(movieID);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDTO): Movie[] {
    return this.movieService.createMovie(movieData);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieID: number) {
    this.getSingleMovie(movieID);
    return this.movieService.deleteMovie(movieID);
  }

  @Patch('/:id')
  patchMovie(
    @Param('id') movieID: number,
    @Body() movieUpdate: UpdateMovieDTO,
  ) {
    return this.movieService.updateMovie(movieID, movieUpdate);
  }
}
