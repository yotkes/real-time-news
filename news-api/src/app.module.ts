import { Module } from '@nestjs/common';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';

import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [NewsController],
  providers: [
    NewsService,
    {
      provide: 'NEWS_SERVICE',
      useFactory: () => ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],  // RabbitMQ connection
          queue: 'news_queue',  // Your queue name
        },
      }),
    },
  ],
})
export class AppModule {}
