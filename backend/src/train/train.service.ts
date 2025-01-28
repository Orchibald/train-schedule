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

  async update(id: string, updateTrainDto: CreateTrainDto): Promise<Train | null> {
    const train = await this.prisma.train.update({
      where: { id },
      data: {
        departureCity: updateTrainDto.departureCity,
        arrivalCity: updateTrainDto.arrivalCity,
        departureTime: new Date(updateTrainDto.departureTime),
        arrivalTime: new Date(updateTrainDto.arrivalTime),
        price: updateTrainDto.price,
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
