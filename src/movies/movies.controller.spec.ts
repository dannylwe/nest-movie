import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let movieService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    movieService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all movies', () => {
    it('should return an array of movies', async () => {
      const result = [{ id: 1, title: 'test', year: 2020, genre: ['action'] }];
      jest.spyOn(movieService, 'getAllMovies').mockImplementation(() => result);
      expect(await controller.getAllMovies()).toBe(result);
    });
  });

  describe('search for movie by year', () => {
    it('should return a movie', async () => {
      const result = { id: 1, title: 'test', year: 2020, genre: ['action'] };
      jest.spyOn(movieService, 'searchForMovie').mockImplementation(() => result);
      expect(await controller.searchForMovie('2020')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const result = [{ id: 1, title: 'test', year: 2025, genre: ['action'] }];
      const movie = { id: 1, title: 'test', year: 2025, genre: ['action'] }
      jest.spyOn(movieService, 'createMovie').mockImplementation(() => result);
      expect(await controller.createMovie(movie)).toBe(result);
    });
  });

  describe('movie by id', () => {
    it('should return a movie', async () => {
      const result = { id: 1, title: 'test', year: 2020, genre: ['action'] };
      jest.spyOn(movieService, 'getSingleMovie').mockImplementation(() => result);
      expect(await controller.getSingleMovie(1)).toBe(result);
    });

    it('should update movie by id', async () => {
      const result = { id: 1, title: 'test', year: 2025, genre: ['action'] };
      jest.spyOn(movieService, 'updateMovie').mockImplementation(() => null)
      expect(await controller.patchMovie(result.id, { year: result.year })).toBe(null);
    });

    it('should delete a movie', async () => {
      const result = { id: 1, title: 'test', year: 2020, genre: ['action'] };
      jest.spyOn(movieService, 'getSingleMovie').mockImplementation(() => result);
      jest.spyOn(movieService, 'deleteMovie').mockImplementation(() => true);
      expect(await controller.deleteMovie(result.id)).toBeTruthy();
    });
  });
});
