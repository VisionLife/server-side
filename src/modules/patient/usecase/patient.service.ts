import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PatientDTO } from '../models/dto/patient.dto';
import { PatientUpdateDTO } from '../models/dto/patient.update.dto';
import { Patient } from '../models/entity/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @Inject('PATIENT_REPOSITORY')
    private patientRepository: Repository<Patient>
  ) {}

  /**
   * adds new patient
   * 
   * @param patientDto 
   * @returns added Patient
   */
  async addPatient(patientDto: PatientDTO): Promise<Patient> {
    return this.patientRepository.save( await this.createPatient(patientDto));
  }

  /**
   * returns patient by id
   * 
   * @param id 
   * @returns patient
   */
  async getPatientById(id: number): Promise<Patient> {
    return await this.patientRepository.findOne({ where: { id: id } });
  }

  /**
   * returns patients list
   * 
   * @returns patients list
   */
  async getPatients(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  /**
   * deletes patient based on id
   * 
   * @param id 
   */
  async deletePatient(id: number): Promise<void> {
    await this.patientRepository.delete(id);
  }

  /**
   * Updates a patient
   * 
   * @param id 
   * @param patientDto 
   */
  async updatePatient(id: number, patientDto: PatientUpdateDTO): Promise<Patient> {
    const existingPatient = await this.getPatientById(id);

    if (!existingPatient) {
        throw new NotFoundException('Patient not found!');
    }

    if (patientDto.completeName) {
        existingPatient.completeName = patientDto.completeName;
    }

    if (patientDto.educationLevel) {
        existingPatient.educationLevel = patientDto.educationLevel;
    }

    if (patientDto.email) {
        existingPatient.email = patientDto.email;
    }

    if (patientDto.phone) {
        existingPatient.phone = patientDto.phone;
    }

    return this.patientRepository.save(existingPatient);
}

  /**
   * creates a new patient object based on the patientDTO provided
   * 
   * @param patientDto 
   * @returns Patient object
   */
  async createPatient(patientDto: PatientDTO): Promise<Patient> {
    const patient = new Patient();

    patient.completeName = patientDto.completeName;
    patient.email = patientDto.email;
    patient.phone = patientDto.phone;
    patient.age = this.getPatientAge(patientDto.birthDate);
    patient.birthDate = patientDto.birthDate;
    patient.educationLevel = patientDto.educationLevel;

    return patient;
  }
  
  /**
   * calculates the age of the patient
   * 
   * @param birthDate 
   * @returns number, age
   */
  getPatientAge(birthDate: Date): number {
    const currentDate = new Date();
    const ageDiffMilliseconds = currentDate.getTime() - new Date(birthDate).getTime();
    const ageDate = new Date(ageDiffMilliseconds);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}