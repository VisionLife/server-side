/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { JwtGuard } from '../../auth/jwt/jwt.guard';
import { RolesGuard } from '../../auth/role/role.guard';
import { UserDTO } from '../models/dtos/user.dto';
import { UserRoles } from '../models/enums/user.enum';
import { UserService } from '../usecase/user.service';
import { AllowRoles } from 'src/modules/auth/role/role.decorator';
import { RegisteUserGuard } from '../guards/register-user.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.OPERATOR)
  getUsers(@Param('userId') userId: number) {
    return this.userService.getUsers(userId);
  }

  @Get('cnpj/:id')
  @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER)
  getUsersByCpnj(@Param('cnpj') cnpj: string) {
    return this.userService.getUsersByCpnj(cnpj);
  }

  @Post('register')
  @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER)
  createUser(@Body() user: UserDTO) {
    return this.userService.registerNewUser(user);
  }

  @Delete('delete/:id')
  @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER)
  deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }

  @Put('update/:id')
  @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER)
  updateUser(@Param('id') id: number, @Body() userDto: UserDTO) {
    return this.userService.updateUser(id, userDto);
  }

  @Put('deactivate/:id')
  @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER)
  deactivateUser(@Param('id') id: number) {
    return this.userService.deactivateUser(id);
  }
}