import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AtGuard } from 'src/common/guards/at-guard';
import { DecodedRequest } from 'src/common/dto/decoded-request';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AtGuard)
  @Get('profile')
  async getUserProfile(@GetUser() decodedUser: DecodedRequest) {
    return await this.userService.getUserById(decodedUser.id);
  }
}
