import { Controller, Post, Get, Param, Body, NotFoundException } from '@nestjs/common';
import { TrainService } from './train.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { Role, Train } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('trains')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createTrainDto: CreateTrainDto): Promise<Train> {
    return this.trainService.create(createTrainDto);
  }

  @Get()
  async findAll(): Promise<Train[]> {
    return this.trainService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Train> {
    const train = await this.trainService.findOne(id);
    if (!train) {
      throw new NotFoundException(`Train with id ${id} not found`);
    }
    return train;
  }
}
