import { Test, TestingModule } from '@nestjs/testing';
import { SignerController } from './signer.controller';

describe('SignerController', () => {
  let controller: SignerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignerController],
    }).compile();

    controller = module.get<SignerController>(SignerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
