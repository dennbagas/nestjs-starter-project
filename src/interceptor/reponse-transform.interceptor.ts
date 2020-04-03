import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: string;
  message: {
    action: string;
    data: T;
  };
}

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const methodSignature = `${context.getHandler().name}`;
    return next.handle().pipe(
      map(data => ({
        status: 'success',
        message: {
          action: methodSignature,
          data: data ?? '',
        },
      }))
    );
  }
}
