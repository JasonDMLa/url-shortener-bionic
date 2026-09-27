import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module.js';

describe('URL shortener (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST / returns a short URL for a valid URL', async () => {
    const response = await request(app.getHttpServer())
      .post('/')
      .send({ url: 'http://www.makeitcheaper.com' })
      .expect(201);

    expect(response.body).toEqual({
      url: 'http://www.makeitcheaper.com',
      short_url: expect.stringMatching(/^\/[a-z0-9]{6}$/),
    });
  });
});
