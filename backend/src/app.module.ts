import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { TrainModule } from './train/train.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
			envFilePath: '.env',
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    EmailModule,
    TrainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
