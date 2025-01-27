import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from 'src/email/email.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './strategies/at-strategy';
import { AtGuard } from '../common/guards/at-guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PrismaModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET,  
      signOptions: { expiresIn: '1h' },
    }),
    EmailModule,  
    UserModule
  ],
  providers: [AuthService, AtStrategy, AtGuard],
  controllers: [AuthController]
})
export class AuthModule {}
