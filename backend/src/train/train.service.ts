import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { Train } from '@prisma/client';
import { FilterTrainsDto } from './dto/filter-trains.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateTrainDto } from './dto/update-train.dto';

@Injectable()
export class TrainService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTrainDto: CreateTrainDto): Promise<Train> {
    const { departureCity, arrivalCity, departureTime, arrivalTime, price, availableSeats } = createTrainDto;

    const train = await this.prisma.train.create({
      data: {
        departureCity,
        arrivalCity,
        departureTime: new Date(departureTime),
        arrivalTime: new Date(arrivalTime),
        price,
        availableSeats,
      },
    });

    return train;
  }

  async findAll(
    filter: FilterTrainsDto,
  ): Promise<Train[]> {
    const { departureCity, arrivalCity, sort } = filter;

    const whereConditions: any = {};

    if (departureCity) {
      whereConditions.departureCity = {
        contains: departureCity,
        mode: 'insensitive',
      };
    }

    if (arrivalCity) {
      whereConditions.arrivalCity = {
        contains: arrivalCity,
        mode: 'insensitive',
      };
    }

    const orderByConditions: any = {};

    if (sort) {
      if (sort === 'price') {
        orderByConditions.price = 'asc';
      } else if (sort === 'departureTime') {
        orderByConditions.departureTime = 'asc';
      }
    }

    const trains = await this.prisma.train.findMany({
      where: whereConditions,
      orderBy: orderByConditions,
    });

    return trains;
  }



  async findOne(id: string): Promise<Train | null> {
    return this.prisma.train.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTrainDto: UpdateTrainDto): Promise<Train | null> {
    const train = await this.prisma.train.update({
      where: { id },
      data: {
        departureCity: updateTrainDto.departureCity,
        arrivalCity: updateTrainDto.arrivalCity,
        departureTime: new Date(updateTrainDto.departureTime),
        arrivalTime: new Date(updateTrainDto.arrivalTime),
        price: parseFloat(updateTrainDto.price),  
        availableSeats: updateTrainDto.availableSeats,
      },
    });
    return train;
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.train.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
