import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('salam')
  getSalam(): string {
    return 'Salam! Ye mera pehla custom route hai';
  }

  @Get('salam/:name')
  getSalamWithName(@Param('name') name: string): string {
    return `Salam ${name}! Kaisay ho?`;
  }
}