import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Controller('/hello')
export class AppController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  getHello() {
    return 'Hello world'
  }
}
