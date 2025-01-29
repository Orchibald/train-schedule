import { Controller, Get, Patch, UseGuards, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AtGuard } from 'src/common/guards/at-guard';
import { DecodedRequest } from 'src/common/dto/decoded-request';
import { PatchUserDto } from './dto/patch-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AtGuard)
  @Get('profile')
  async getUserProfile(@GetUser() decodedUser: DecodedRequest) {
    return await this.userService.getUserById(decodedUser.id);
  }

  @UseGuards(AtGuard)
  @Patch('update')
  async updateUser(
    @GetUser() decodedUser: DecodedRequest,
    @Body() patchUserDto: PatchUserDto,
  ) {
    return await this.userService.updateUserById(decodedUser.id, patchUserDto);
  }
}
