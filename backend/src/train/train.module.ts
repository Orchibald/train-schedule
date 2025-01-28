import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainController } from './train.controller';
import { IsExistMiddleware } from 'src/common/middlewares/is-exist.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TrainService],
  controllers: [TrainController]
})
export class TrainModule {
  configure(consumer: MiddlewareConsumer) {
		const isExistMiddleware = new IsExistMiddleware(new PrismaService());

		consumer
			.apply(isExistMiddleware.use('train', 'id'))
			.forRoutes('trains/:id');
	}
}
