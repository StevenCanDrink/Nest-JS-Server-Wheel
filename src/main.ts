import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import dataSource from 'data-source';
async function bootstrap() {
  dataSource.initialize();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.use(
    session({
      secret: configService.get<string>('SECRET_KEY'),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
