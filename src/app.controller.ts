import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  async create() {
    await this.prisma.attendant.create({
      data: {
        name: 'Guilherme Arievilo',
        email: 'guilherme_arievilo@outlook.com',
        password: 'Teste@123',
      },
    });
  }
}
