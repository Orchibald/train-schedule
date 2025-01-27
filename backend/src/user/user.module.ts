import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { IsExistMiddleware } from 'src/common/middlewares/is-exist.middleware';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService, IsExistMiddleware],
  controllers: [UserController],
  exports: [UserService, JwtModule],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
		const isExistMiddleware = new IsExistMiddleware(new PrismaService());

		consumer
			.apply(isExistMiddleware.use('user', 'id'))
			.forRoutes('users/:id');
	}
}
