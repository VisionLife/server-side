/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { JwtGuard } from '../../auth/jwt/jwt.guard';
import { RolesGuard } from '../../auth/role/role.guard';
import { AllowRoles } from 'src/modules/auth/role/role.decorator';
import { DomainService } from '../usecase/domain.service';
import { UserRoles } from 'src/modules/user/models/enums/user.enum';
import { DomainDTO } from '../models/dtos/domain.dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('domains')
export class DomainController {
  constructor(private domainService: DomainService) {}

  @Get(':id')
  @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.OPERATOR)
  getDomain(@Param('id') id: number) {
    return this.domainService.getDomainById(id);
  }

  @Get()
  @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.OPERATOR)
  getDomains() {
    return this.domainService.getDomains();
  }

  @Post('register')
  @AllowRoles(UserRoles.ADMIN)
  registerDomain(@Body() domain: DomainDTO) {
    return this.domainService.addDomain(domain);
  }

  @Delete('delete/:id')
  @AllowRoles(UserRoles.ADMIN)
  deleteDomain(@Param('id') id: number) {
    return this.domainService.deleteDomain(id);
  }

  @Put('update/:id')
  @AllowRoles(UserRoles.ADMIN)
  updateDomain(@Param('id') id: number, @Body() domainDto: DomainDTO) {
    return this.domainService.updateDomain(id, domainDto);
  }

  @Put('set-manager/:id')
  @AllowRoles(UserRoles.ADMIN)
  setDomainManager(@Param('id') domainId: number, @Body() managerId: number) {
    return this.domainService.setDomainManger(domainId, managerId);
  }
}