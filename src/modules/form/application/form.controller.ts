/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { AllowRoles } from 'src/modules/auth/role/role.decorator';
import { UserRoles } from 'src/modules/user/models/enums/user.enum';
import { JwtGuard } from '../../auth/jwt/jwt.guard';
import { RolesGuard } from '../../auth/role/role.guard';
import { RegisterFormDTO } from '../models/dtos/register-form.dto';
import { FormService } from '../usecase/form.service';

@Controller('forms')
export class FormController {
  constructor(private formService: FormService) {}

  @Get(':userId')
  @UseGuards(JwtGuard, RolesGuard)
  @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.OPERATOR)
  getForms(@Param('userId') userId: number ) {
    return this.formService.getForms(userId);
  }
  
  @Get(':formId/results')
  getFormsById(@Param('formId') formId: string ) {
    return this.formService.getForm(formId);
  }

  @Get('cnpj/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER)
  getFormsByCnpj(@Param('cnpj') cnpj: string) {
    return this.formService.getFormsByCnpj(cnpj);
  }

  @Post('register')
  @UseGuards(JwtGuard, RolesGuard)
  @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.OPERATOR)
  registerForm(@Body() form: RegisterFormDTO) {
    return this.formService.addForm(form);
  }

  @Delete('delete/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @AllowRoles(UserRoles.ADMIN)
  deleteForm(@Param('id') id: number) {
    return this.formService.deleteForm(id);
  }
}