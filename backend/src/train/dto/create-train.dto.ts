import { IsString, IsInt, IsDateString, Min, Max } from 'class-validator';

export class CreateTrainDto {
  @IsString()
  departureCity: string;

  @IsString()
  arrivalCity: string;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  arrivalTime: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  availableSeats: number;
}
