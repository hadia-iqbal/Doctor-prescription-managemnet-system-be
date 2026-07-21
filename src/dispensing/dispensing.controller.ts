import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { DispensingService } from './dispensing.service';

@Controller('dispensing')
export class DispensingController {
  constructor(private readonly dispensingService: DispensingService) {}

  @Get()
  findAll(@Query('tenantId') tenantId: string) {
    return this.dispensingService.findAll(tenantId);
  }

  @Post()
  create(@Body() data: any) {
    return this.dispensingService.create(data);
  }

  @Patch(':id/prepared')
  markPrepared(@Param('id') id: string) {
    return this.dispensingService.markPrepared(+id);
  }

  @Patch(':id/delivered')
  markDelivered(@Param('id') id: string) {
    return this.dispensingService.markDelivered(+id);
  }
}