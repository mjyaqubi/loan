import { ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import * as ErrorsDto  from '../error/error.dto';

export const Successful = (type: any, isArray?: boolean, message?: string): MethodDecorator => {
  return ApiResponse({
    type,
    isArray: isArray || false,
    status: HttpStatus.OK,
    description: message || 'Request processed successfuly',
  });
};

export const Created = (type: any, message?: string): MethodDecorator => {
  return ApiResponse({
    type,
    status: HttpStatus.CREATED,
    description: message || 'Request processed successfuly',
  });
};

export const BadRequest = (message?: string): MethodDecorator => {
  return ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorsDto.BadRequestResponse,
    description: message || 'Bad request',
  });
};

export const Unauthorized = (message?: string): MethodDecorator => {
  return ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: ErrorsDto.UnauthorizedResponse,
    description: message || 'Unauthorized request',
  });
};

export const InternalServerError = (message?: string): MethodDecorator => {
  return ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorsDto.InternalServerErrorResponse,
    description: message || 'Internal server error',
  });
};

export const BadGateway = (message?: string): MethodDecorator => {
  return ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    type: ErrorsDto.BadGatewayResponse,
    description: message || 'Internal communication error',
  });
};
