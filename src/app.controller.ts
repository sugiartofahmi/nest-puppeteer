import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ScrapDto } from './dto/scrap-dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@Body() scrapDto: ScrapDto) {
    return this.appService.scraping(scrapDto?.url);
  }
}
