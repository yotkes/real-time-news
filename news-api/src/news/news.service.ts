import { Injectable } from '@nestjs/common';
import { NewsDto } from './news.dto';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class NewsService {
  private newsItems: NewsDto[] = [];

  constructor(@Inject('NEWS_SERVICE') private readonly client: ClientProxy) {}

  // Store and get the latest 20 news items
  storeNewsItem(news: NewsDto): void {
    this.newsItems.unshift(news);  // Add to the front
    if (this.newsItems.length > 20) {
      this.newsItems.pop();  // Remove the oldest item if there are more than 20
    }
  }

  // Consume news item from RabbitMQ
  consumeNews(): Observable<any> {
    return this.client.send('get_news', {});
  }

  // Get all news items
  getAllNews(): NewsDto[] {
    return this.newsItems;
  }
}
