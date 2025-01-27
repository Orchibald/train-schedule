import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

interface ErrorResponse {
  message: string | string[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    
    const message = exception.getResponse();

    let responseMessage = '';

    if (typeof message === 'object' && (message as ErrorResponse).message) {
      const messageContent = (message as ErrorResponse).message;
      responseMessage = Array.isArray(messageContent) ? messageContent.join(', ') : messageContent;
    } else if (typeof message === 'string') {
      responseMessage = message;
    }

    response.status(status).json({
      statusCode: status,
      message: responseMessage,
    });
  }
}
