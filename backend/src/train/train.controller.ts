import { Controller, Post, Get, Param, Body, NotFoundException, Delete, Put, Query } from '@nestjs/common';
import { TrainService } from './train.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { Train } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { FilterTrainsDto } from './dto/filter-trains.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateTrainDto } from './dto/update-train.dto';

@Controller('trains')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createTrainDto: CreateTrainDto): Promise<Train> {
    return this.trainService.create(createTrainDto);
  }

  @Get()
  async findAll(
    @Query() filterTrainsDto: FilterTrainsDto,  
  ): Promise<Train[]> {
    return this.trainService.findAll(filterTrainsDto);
  }
  

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Train> {
    const train = await this.trainService.findOne(id);
    if (!train) {
      throw new NotFoundException(`Train with id ${id} not found`);
    }
    return train;
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateTrainDto: UpdateTrainDto,
  ): Promise<Train> {
    const updatedTrain = await this.trainService.update(id, updateTrainDto);
    if (!updatedTrain) {
      throw new NotFoundException(`Train with id ${id} not found`);
    }
    return updatedTrain;
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string): Promise<void> {
    const deleted = await this.trainService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Train with id ${id} not found`);
    }
  }
}
