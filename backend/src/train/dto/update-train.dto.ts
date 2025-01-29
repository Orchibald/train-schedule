import { IsString, IsInt, IsDateString, Min } from 'class-validator';

export class UpdateTrainDto {
  @IsString()
  departureCity: string;

  @IsString()
  arrivalCity: string;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  arrivalTime: string;

  @IsString()
  price: string;

  @IsInt()
  @Min(0)
  availableSeats: number;
}
