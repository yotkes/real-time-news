import { Controller, Get, Body, Post } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsDto } from './news.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { validateOrReject } from 'class-validator';

@ApiTags('news')
@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Consume news from RabbitMQ' })
  async consumeNews(@Body() newsDto: NewsDto) {
    try {
      await validateOrReject(newsDto);  // Validate incoming data
      this.newsService.storeNewsItem(newsDto);  // Store the valid news
    } catch (errors) {
      throw new Error('Validation failed');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get last 20 news items' })
  getAllNews() {
    return this.newsService.getAllNews();
  }
}