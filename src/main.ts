import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from './shared/constants';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/');

  const config = new DocumentBuilder()
    .setTitle('Tech Store Api Documentation')
    .setDescription('Official documentation of Tech Store api')
    .setVersion('1.0')
    .addServer('http://localhost:4000/', 'Local environment')
    .addTag('Your API Tag')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>(PORT) || 3000;
  await app.listen(port);
  console.log(`Nest is running at ${await app.getUrl()}`);
}
bootstrap();
