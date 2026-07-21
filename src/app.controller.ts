import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

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

  @Post('users')
  async createUser(@Body() body: { name: string; email: string }) {
    return this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
  }

  @Get('users')
  async getUsers() {
    return this.prisma.user.findMany();
  }
}