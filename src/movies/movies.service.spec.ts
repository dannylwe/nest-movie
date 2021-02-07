import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMovies', ()=> {
    it('should be an array', ()=> {
      let fakeMovie = {'title': 'test', 'year': 2020, 'genre': ['action']};
      const first = service.getAllMovies();
      expect(first.length).toEqual(0);
      service.createMovie(fakeMovie);
      service.createMovie(fakeMovie);
      const result = service.getAllMovies();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toEqual(2);
    });
  });

  describe('createMovie', ()=> {
    it('should create a movie', ()=> {
      let fakeMovie = {'title': 'test', 'year': 2020, 'genre': ['action']}
      const result = service.createMovie(fakeMovie);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(result[0]['title']).toEqual('test');
      expect(result[0]['year']).toEqual(2020);
    });
  });

  describe('updateMovie', ()=> {
    it('should update a movie', ()=> {
      let fakeMovie = {'title': 'test', 'year': 2020, 'genre': ['action']}
      const movie = service.createMovie(fakeMovie);
      const movieID = movie[0]['id'];
      service.updateMovie(movieID, {'year': 2021});
      const updatedMovie = service.getSingleMovie(movieID);
      expect(updatedMovie).toBeDefined();
      expect(updatedMovie.title).toEqual('test');
      expect(updatedMovie.year).toEqual(2021);
    });

    it('should throw error', ()=> {
      try {
        service.updateMovie(99, {'year': 2021});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    });
  });

  describe('deleteMovie', ()=> {
    it('should delete a movie', ()=> {
      let fakeMovie = {'title': 'test', 'year': 2020, 'genre': ['action']}
      const movie = service.createMovie(fakeMovie);
      expect(movie).toBeDefined();
      expect(movie).toBeInstanceOf(Array);
      const movieID = movie[0]['id'];
      const deleted = service.deleteMovie(movieID);
      const getAll = service.getAllMovies();
      expect(deleted).toBeTruthy();
      expect(getAll.length).toEqual(0);
    });
  });

  describe('searchForMovie', ()=> {
    it('should get movie by year', ()=> {
      let fakeMovie = {'title': 'test', 'year': 2020, 'genre': ['action']}
      service.createMovie(fakeMovie);
      const result = service.searchForMovie("2020");
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Object);
      expect(result['title']).toEqual('test');
      expect(result['year']).toEqual(2020);
    });

    it('should throw error', ()=> {
      try {
        service.searchForMovie("2020");
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    });
  });

  describe('getSingleMovie', ()=> {
    it('should get a movie', ()=> {
      let fakeMovie = {'title': 'test', 'year': 2020, 'genre': ['action']}
      const movie = service.createMovie(fakeMovie);
      expect(movie).toBeDefined();
      expect(movie).toBeInstanceOf(Array);
      const movieID = movie[0]['id'];
      const result = service.getSingleMovie(movieID);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Object);
      expect(result['title']).toEqual('test');
      expect(result['year']).toEqual(2020);
    });

    it('should throw error', ()=> {
      try {
        service.getSingleMovie(1);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    });
  });
});
