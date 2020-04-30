import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class OrmErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle() is an Observable of the controller's result value
    return next.handle().pipe(
      catchError(error => {
        // check jika entity not found
        if (error instanceof EntityNotFoundError) {
          throw new NotFoundException(error.message);
        }

        // check jika query error
        else if (error instanceof QueryFailedError) {
          throw new BadRequestException({
            statusCode: 400,
            error: (error as any).message,
            message: (error as any).detail,
          });
        }

        // jika err bukan dari orm, maka lanjut
        else {
          throw error;
        }
      })
    );
  }
}
