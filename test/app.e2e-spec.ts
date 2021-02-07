import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST', () => {
      let fakeMovie = { title: 'test', year: 2020, genre: ['action'] };
      return request(app.getHttpServer())
        .post('/movies')
        .send(fakeMovie)
        .expect(201)
        .expect([{ id: 1, title: 'test', year: 2020, genre: ['action'] }]);
    });
  });
  
  describe('/movies/:id', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
        .expect({ id: 1, title: 'test', year: 2020, genre: ['action'] });
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/99').expect(404);
    });

    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ year: 2025 })
        .expect(200);
    });

    it('PATCH 404', () => {
      return request(app.getHttpServer())
        .patch('/movies/99')
        .send({ year: 2025 })
        .expect(404);
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies/99').expect(404);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
