import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IsExistMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  use(modelType: keyof PrismaService, idField: string) {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const idValue = req.params[idField];

      if (!idValue) {
        throw new NotFoundException('ID parameter is required.');
      }

      const configuredWhere = { [idField]: String(idValue) };

      const modelDelegate = this.prisma[modelType] as unknown as ModelDelegate<
        typeof configuredWhere
      >;

      const entity = await modelDelegate.findUnique({
        where: configuredWhere,
      });

      if (!entity) {
        throw new NotFoundException(`Resource with id ${idValue} not found.`);
      }

      next();
    };
  }
}

type ModelDelegate<T> = {
  findUnique: (args: { where: T }) => Promise<unknown>;
};
