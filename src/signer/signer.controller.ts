import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignerService } from './signer.service';
import { SuccessResponse } from 'src/helpers/response.helper';
import { MESSAGES } from 'src/constants';
import { ResponseDto } from 'src/dto';

@Controller('signer')
@ApiTags('Signer')
@ApiResponse({
  status: HttpStatus.OK,
  type: ResponseDto,
  description: 'Successful response with data',
})
@ApiInternalServerErrorResponse({ description: MESSAGES.INTERNAL_ERROR })
export class SignerController {
  constructor(private readonly signerService: SignerService) {}

  @Post('sign')
  @ApiOperation({ summary: 'Sign a file/document' })
  async signDocument() {
    const data = await this.signerService.signDocument('doc');

    return SuccessResponse(data);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify a previously signed document' })
  async verifyDocument() {
    const data = await this.signerService.verifyDocument('doc', 'signature');

    return SuccessResponse(data);
  }
}
