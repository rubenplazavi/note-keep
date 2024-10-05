import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ForgotPasswordEmailRequest } from './dto/forgot-password-email-request.dto';
import { SendForgotPasswordEmail } from './services/send-forgot-password-email.service';
import { ChangePasswordService } from './services/change-password.service';
import { NewPasswordRequest } from './dto/new-password-request.dto';
import { ForgotPasswordRequestDecorator } from './decorators/forgot-password-request.decorator';
import { UpdatedPasswordDecorator } from './decorators/forgot-password-validation.decorator';

@ApiTags('forgot-password')
@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(
    private sendForgotPasswordEmail: SendForgotPasswordEmail,
    private changePasswordService: ChangePasswordService,
  ) {}

  @Post()
  @ForgotPasswordRequestDecorator()
  create(@Body() forgotPasswordEmailDto: ForgotPasswordEmailRequest) {
    return this.sendForgotPasswordEmail.run(forgotPasswordEmailDto);
  }

  @Post('/reset/:idRequest')
  @UpdatedPasswordDecorator()
  createNewPassword(
    @Body() newPassword: NewPasswordRequest,
    @Param('idRequest', ParseUUIDPipe) idRequest: string,
  ) {
    return this.changePasswordService.update(idRequest, newPassword);
  }
}
