import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module.js';

const TEST_URL = 'http://www.makeitcheaper.com';

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

  describe('POST /', () => {
    it('returns a short URL for a valid URL', async () => {
      const response = await request(app.getHttpServer())
        .post('/')
        .send({ url: TEST_URL })
        .expect(200);

      expect(response.body).toEqual({
        url: TEST_URL,
        short_url: expect.stringMatching(/^\/[a-z0-9]{6}$/),
      });
    });

    it('returns the same short URL for a duplicate', async () => {
      const first = await request(app.getHttpServer())
        .post('/')
        .send({ url: TEST_URL })
        .expect(200);

      const second = await request(app.getHttpServer())
        .post('/')
        .send({ url: TEST_URL })
        .expect(200);

      expect(second.body.short_url).toBe(first.body.short_url);
    });

    it('returns 400 for an invalid URL', async () => {
      await request(app.getHttpServer())
        .post('/')
        .send({ url: 'not-a-url' })
        .expect(400);
    });

    it('returns 400 for a URL without http or https', async () => {
      await request(app.getHttpServer())
        .post('/')
        .send({ url: 'www.example.com' })
        .expect(400);
    });
  });

  describe('GET /:shortCode', () => {
    it('redirects to the original URL', async () => {
      const created = await request(app.getHttpServer())
        .post('/')
        .send({ url: TEST_URL });

      const response = await request(app.getHttpServer())
        .get(created.body.short_url)
        .expect(301);

      expect(response.headers.location).toBe(TEST_URL);
      expect(response.body).toEqual({ url: TEST_URL });
    });

    it('returns 404 for an unknown code', async () => {
      await request(app.getHttpServer()).get('/unknown').expect(404);
    });
  });
});
