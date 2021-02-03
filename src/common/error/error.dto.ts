import { ApiPropertyOptional } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class SuccessfulResponse {
  @ApiPropertyOptional({
    type: 'string',
    example: 'Successful',
  })
  readonly message?: any;

  @ApiPropertyOptional({
    type: 'number',
    example: HttpStatus.OK,
  })
  readonly status?: any;
}

export class BadRequestResponse {
  @ApiPropertyOptional({
    type: 'string',
    example: 'Bad request',
  })
  readonly message?: any;

  @ApiPropertyOptional({
    type: 'number',
    example: HttpStatus.BAD_REQUEST,
  })
  readonly status?: any;
}

export class UnauthorizedResponse {
  @ApiPropertyOptional({
    type: 'string',
    example: 'Unauthorized request',
  })
  readonly message?: any;

  @ApiPropertyOptional({
    type: 'number',
    example: HttpStatus.UNAUTHORIZED,
  })
  readonly status?: any;
}

export class NotFoundResponse {
  @ApiPropertyOptional({
    type: 'string',
    example: 'Not found',
  })
  readonly message?: any;

  @ApiPropertyOptional({
    type: 'number',
    example: HttpStatus.NOT_FOUND,
  })
  readonly status?: any;
}

export class InternalServerErrorResponse {
  @ApiPropertyOptional({
    type: 'string',
    example: 'Internal Server Error',
  })
  readonly message?: any;

  @ApiPropertyOptional({
    type: 'number',
    example: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  readonly status?: any;
}

export class BadGatewayResponse {
  @ApiPropertyOptional({
    type: 'string',
    example: 'Bad gateway',
  })
  readonly message?: any;

  @ApiPropertyOptional({
    type: 'number',
    example: HttpStatus.BAD_GATEWAY,
  })
  readonly status?: any;
}
