import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Express } from 'express';
import { SignerService } from './signer.service';
import {
  SuccessResponse,
  SuccessMsgResponse,
} from 'src/helpers/response.helper';
import { ResponseDto } from 'src/dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import path from 'path';
// import * as fs from 'fs';
import { SignAndVerifyDto, VerifyDocumentDto } from './signer.dto';

@Controller('signer')
@ApiTags('Signer')
@ApiResponse({
  status: HttpStatus.OK,
  type: ResponseDto,
  description: 'Successful response with data',
})
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class SignerController {
  constructor(private readonly signerService: SignerService) {}

  @Post('sign')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Sign a file/document' })
  async signDocument(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');

    console.log(file);

    const { buffer, mimetype } = file;

    const base64Content = buffer.toString('base64'); // Convert the file to base64 format

    if (!base64Content)
      throw new BadRequestException('Invalid or bad file uploaded');

    const digitalSignature = await this.signerService.signDocument(
      base64Content,
    );

    if (!digitalSignature)
      throw new InternalServerErrorException('Failed to sign the document');

    // Delete the uploaded file after processing
    // fs.unlinkSync(file.path);

    return SuccessResponse(digitalSignature);
  }

  @Post('verify')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        digital_signature: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Verify a signed document' })
  @UseInterceptors(FileInterceptor('file'))
  async verifyDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: VerifyDocumentDto,
  ) {
    const { digital_signature } = body;

    if (!file) throw new BadRequestException('No file uploaded');

    const { buffer, mimetype } = file;

    const base64Content = buffer.toString('base64'); // Convert the file to base64 format

    if (!base64Content)
      throw new BadRequestException('Invalid or bad file uploaded');

    const isSignatureValid = await this.signerService.verifyDocument(
      base64Content,
      digital_signature,
    );

    // Delete the uploaded file after processing
    // fs.unlinkSync(file.path);

    if (isSignatureValid) return SuccessMsgResponse('Signature is valid');

    return SuccessMsgResponse('Signature is not valid');
  }
}
