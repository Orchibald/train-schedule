import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { EmailService } from '../email/email.service';
import { LoginDto } from './dto/login-dto';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { RegisterDto } from './dto/register-dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private emailService: EmailService,
    private userService: UserService
  ) { }

  async register(createUserDto: RegisterDto) {
    const existingUser = await this.userService.getUserByEmail(createUserDto.email, false);

    if (existingUser) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const verifyCode = Math.floor(1000 + Math.random() * 9000);

    const user = await this.userService.createUser({
      email: createUserDto.email,
      password: hashedPassword,
      fullname: createUserDto.fullname,
      phoneNumber: createUserDto.phoneNumber,
      verifyCode,
    });

    await this.emailService.sendVerificationCode(user.email, verifyCode);

    return { message: 'Registration successful. Please check your email for the verification code.' };
  }


  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    if (!user.verified) {
      throw new HttpException('Email not verified', HttpStatus.FORBIDDEN);
    }

    const accessToken = this.generateAccessToken(user.id, user.role);

    return { accessToken };
  }

  generateAccessToken(userId: string, role: Role) {
    return this.jwtService.sign({ userId, role });
  }

  async verifyCode(email: string, code: number) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.verifyCode !== code) {
      throw new HttpException('Invalid verification code', HttpStatus.BAD_REQUEST);
    }

    const updateData: UpdateUserDto = { verified: true, verifyCode: null };
    await this.userService.updateUserByEmail(email, updateData);

    return { message: 'Email verified successfully!' };
  }

  logout() {
    return { message: 'Logged out successfully' };
  }
}
