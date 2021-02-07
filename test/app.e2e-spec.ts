import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/movies', ()=> {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    it('POST', () => {
      let fakeMovie = { title: 'test', year: 2020, genre: ['action'] };
      return request(app.getHttpServer())
        .post('/movies')
        .send(fakeMovie)
        .expect(201)
        .expect([ { id: 1, title: 'test', year: 2020, genre: [ 'action' ] } ]);
    });
  });

  describe('/movies/:id', ()=> {
    it.todo('GET');
    it.todo('PATCH');
    it.todo('DELETE');
  });
});
