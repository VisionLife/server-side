import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/modules/user/models/enums/user.enum';

export const AllowRoles = (...roles: UserRoles[]) =>
  SetMetadata('allowedRoles', roles);
