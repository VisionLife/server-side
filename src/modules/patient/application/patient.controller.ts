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
import { AllowRoles } from 'src/modules/auth/role/role.decorator';
import { UserRoles } from 'src/modules/user/models/enums/user.enum';
import { JwtGuard } from '../../auth/jwt/jwt.guard';
import { RolesGuard } from '../../auth/role/role.guard';
import { PatientBasicsDTO } from '../models/dto/patient-basics.dto';
import { PatientDTO } from '../models/dto/patient.dto';
import { PatientUpdateDTO } from '../models/dto/patient.update.dto';
import { Patient } from '../models/entity/patient.entity';
import { PatientService } from '../usecase/patient.service';
  
@Controller('patients')
export class PatientController {
    constructor(private patientService: PatientService) {}

    @Get(':id')
    @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.OPERATOR)
    getPatient(@Param('id') id: number) {
        return this.patientService.getPatientById(id);
    }

    @Get()
    @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.OPERATOR)
    @UseGuards(JwtGuard, RolesGuard)
    getPatients() {
        return this.patientService.getPatients();
    }

    @Post('register')
    @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.OPERATOR)
    registerPatient(@Body() patient: PatientDTO) {
        return this.patientService.addPatient(patient);
    }

    @Delete('delete/:id')
    @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.OPERATOR)
    @UseGuards(JwtGuard, RolesGuard)
    deletePatient(@Param('id') id: number) {
        return this.patientService.deletePatient(id);
    }

    @Put('update/:id')
    @AllowRoles(UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.OPERATOR)
    @UseGuards(JwtGuard, RolesGuard)
    updatePatient(@Param('id') id: number, @Body() patientDto: PatientUpdateDTO) {
        return this.patientService.updatePatient(id, patientDto);
    }
}