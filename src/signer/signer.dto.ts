import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  digital_signature: string;
}

export class SignAndVerifyDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to sign/verify',
  })
  file: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  digital_signature: string;
}
