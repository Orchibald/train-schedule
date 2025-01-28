import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { Train } from '@prisma/client';

@Injectable()
export class TrainService {
  constructor(private readonly prisma: PrismaService) {}

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

  async findAll(): Promise<Train[]> {
    return this.prisma.train.findMany();
  }

  async findOne(id: string): Promise<Train | null> { 
    return this.prisma.train.findUnique({
      where: { id },
    });
  }
}
