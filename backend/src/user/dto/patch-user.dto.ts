import { IsOptional, IsString } from 'class-validator';

export class PatchUserDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
