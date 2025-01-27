import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { AtGuard } from '../common/guards/at-guard';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { RegisterDto } from './dto/register-dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: RegisterDto) {
    return await this.authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Public()
  @Post('verify')
  async verifyEmail(@Body() body: VerifyEmailDto) {
    const { email, code } = body;
    return this.authService.verifyCode(email, code);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  async logout() { }
}
