import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { PORT } from './shared/constants';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const allowedOrigins = configService.get<string>('ALLOWED_HOSTS')?.split(',');
  app.setGlobalPrefix('api/v1/');
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Tech Store Api Documentation')
    .setDescription('Official documentation of Tech Store api')
    .setVersion('1.0')
    .addServer('http://localhost:4000/', 'Local environment')
    .addTag('Your API Tag')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = configService.get<number>(PORT) || 3000;
  await app.listen(port);
  console.log(`Nest is running at ${await app.getUrl()}`);
}
bootstrap();
