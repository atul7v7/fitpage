import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from "@nestjs/common";
import { Observable, tap, catchError } from "rxjs";
import { LoggerService } from "@nestjs/common";

@Injectable()
export class ApiRequestInterceptor implements NestInterceptor {
  private logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    // Log request details
    this.logger.log(`Request started: ${req.method} ${req.url}`);

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        // Log successful response
        this.logger.log(
          `Response: ${res.statusCode} - ${Date.now() - startTime}ms`,
        );
      }),
      // catchError((error) => {
      //   // Log error details
      //   this.logger.error("Error:", error);
      //   return throwError(error);
      // }),
    );
  }
}
// function throwError(error: any): any {
//   throw new Error("Function not implemented.");
// }
