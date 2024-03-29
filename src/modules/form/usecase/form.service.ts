import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRoles } from 'src/modules/user/models/enums/user.enum';
import { UserService } from 'src/modules/user/usecase/user.service';
import { Repository } from 'typeorm';
import { RegisterFormDTO } from '../models/dtos/register-form.dto';
import { Form } from '../models/entities/form.entity';

@Injectable()
export class FormService {
  constructor(
    @Inject('FORM_REPOSITORY')
    private formRepository: Repository<Form>,
    private readonly userService: UserService
  ) {}

  /**
   * adds new form
   * 
   * @param formDto 
   * @returns added Form
   */
  async addForm(formDto: RegisterFormDTO): Promise<Form> {
    return this.formRepository.save( await this.createForm(formDto));
  }

  /**
   * getForm
   * 
   * @param formId number 
   * @returns Form
   */
  async getForm( formId: string ) {
    return await this.formRepository.findOneBy({ id: formId })
  }

  /**
   * returns forms list
   * 
   * @returns forms list
   */
  async getForms(userId: number): Promise<Form[]> {
    const user = await this.userService.getUserById(userId);
    if(!user) {
      throw new BadRequestException('User not found');
    }

    let forms: Form[] = [];

    if (user.role === UserRoles.ADMIN) {
      forms = await this.formRepository.find({ relations: ['examiner', 'patient'] });
    } else if (user.role === UserRoles.MANAGER) {
      forms = await this.formRepository.find({
        relations: ['examiner', 'patient'],
        where: {
          examiner: {
            domain: {
              cnpj: user.domain.cnpj,
            },
          },
        },
      });
    } else if (user.role === UserRoles.OPERATOR) {
      console.log('user' + user.role)
      forms = await this.formRepository.find({
        relations: ['examiner', 'patient'],
        where: {
          examinerId: userId,
        },
      });
    }

    return forms;
  }

  /**
   * returns forms list by cnpj
   * 
   * @returns forms list by cnpj
   */
  async getFormsByCnpj(cnpj: string): Promise<Form[]> {
    return this.formRepository.createQueryBuilder('form')
      .innerJoin('form.user', 'user')
      .innerJoin('user.domain', 'domain')
      .where('domain.cnpj = :cnpj', { cnpj })
      .getMany();
  }

  /**
   * deletes form based on id
   * 
   * @param id 
   */
  async deleteForm(id: number): Promise<void> {
    await this.formRepository.delete(id);
  }

  /**
   * creates a new form object based on the formDTO provided
   * 
   * @param formDto 
   * @returns Form object
   */
  async createForm(formDto: RegisterFormDTO): Promise<Form> {
    const form = new Form();

    form.patientId = formDto.patientId;
    form.examinerId = formDto.examinerId;
    form.examDate = formDto.examDate;
    form.previousExams = formDto.previousExams;
    form.previousExamsTime = formDto.previousExamsTime;
    form.previousExamsObservation = formDto.previousExamsObservation;
    form.history = formDto.history;
    form.historyObservation = formDto.historyObservation;
    form.testCorrection = formDto.testCorrection
    form.testTypeCorrection = formDto.testTypeCorrection
    form.testCorrectionObservation = formDto.testCorrectionObservation
    form.difficulties = formDto.difficulties;
    form.difficultiesObservation = formDto.difficultiesObservation;
    form.corrections = formDto.corrections;
    form.correctionsObservation = formDto.correctionsObservation;
    form.symptoms = formDto.symptoms;
    form.symptomsObservation = formDto.symptomsObservation;
    form.events = formDto.events;
    form.eventsType = formDto.eventsType;
    form.eventsObservation = formDto.eventsObservation;
    form.surgery = formDto.surgery;
    form.surgeryTime = formDto.surgeryTime;
    form.surgeryObservation = formDto.surgeryObservation;
    form.health = formDto.health;
    form.healthObservation = formDto.healthObservation;
    form.testTwoHundredLeftEyeClose = formDto.testTwoHundredLeftEyeClose;
    form.testTwoHundredObservationLeftEyeClose = formDto.testTwoHundredObservationLeftEyeClose;
    form.testOneHundredLeftEyeClose = formDto.testOneHundredLeftEyeClose;
    form.testOneHundredObservationLeftEyeClose = formDto.testOneHundredObservationLeftEyeClose;
    form.testFiftyLeftEyeClose = formDto.testFiftyLeftEyeClose;
    form.testFiftyObservationLeftEyeClose = formDto.testFiftyObservationLeftEyeClose;
    form.testThirtyLeftEyeClose = formDto.testThirtyLeftEyeClose;
    form.testThirtyObservationLeftEyeClose = formDto.testThirtyObservationLeftEyeClose;
    form.testTwentyLeftEyeClose = formDto.testTwentyLeftEyeClose;
    form.testTwentyObservationLeftEyeClose = formDto.testTwentyObservationLeftEyeClose;
    form.testTwoHundredRightEyeClose = formDto.testTwoHundredRightEyeClose;
    form.testTwoHundredObservationRightEyeClose = formDto.testTwoHundredObservationRightEyeClose;
    form.testOneHundredRightEyeClose = formDto.testOneHundredRightEyeClose;
    form.testOneHundredObservationRightEyeClose = formDto.testOneHundredObservationRightEyeClose;
    form.testFiftyRightEyeClose = formDto.testFiftyRightEyeClose;
    form.testFiftyObservationRightEyeClose = formDto.testFiftyObservationRightEyeClose;
    form.testThirtyRightEyeClose = formDto.testThirtyRightEyeClose;
    form.testThirtyObservationRightEyeClose = formDto.testThirtyObservationRightEyeClose;
    form.testTwentyRightEyeClose = formDto.testTwentyRightEyeClose;
    form.testTwentyObservationRightEyeClose = formDto.testTwentyObservationRightEyeClose;

    form.testTwoHundredLeftEyeFar = formDto.testTwoHundredLeftEyeFar;
    form.testTwoHundredObservationLeftEyeFar = formDto.testTwoHundredObservationLeftEyeFar;
    form.testOneHundredLeftEyeFar = formDto.testOneHundredLeftEyeFar;
    form.testOneHundredObservationLeftEyeFar = formDto.testOneHundredObservationLeftEyeFar;
    form.testFiftyLeftEyeFar = formDto.testFiftyLeftEyeFar;
    form.testFiftyObservationLeftEyeFar = formDto.testFiftyObservationLeftEyeFar;
    form.testThirtyLeftEyeFar = formDto.testThirtyLeftEyeFar;
    form.testThirtyObservationLeftEyeFar = formDto.testThirtyObservationLeftEyeFar;
    form.testTwentyLeftEyeFar = formDto.testTwentyLeftEyeFar;
    form.testTwentyObservationLeftEyeFar = formDto.testTwentyObservationLeftEyeFar;
    form.testTwoHundredRightEyeFar = formDto.testTwoHundredRightEyeFar;
    form.testTwoHundredObservationRightEyeFar = formDto.testTwoHundredObservationRightEyeFar;
    form.testOneHundredRightEyeFar = formDto.testOneHundredRightEyeFar;
    form.testOneHundredObservationRightEyeFar = formDto.testOneHundredObservationRightEyeFar;
    form.testFiftyRightEyeFar = formDto.testFiftyRightEyeFar;
    form.testFiftyObservationRightEyeFar = formDto.testFiftyObservationRightEyeFar;
    form.testThirtyRightEyeFar = formDto.testThirtyRightEyeFar;
    form.testThirtyObservationRightEyeFar = formDto.testThirtyObservationRightEyeFar;
    form.testTwentyRightEyeFar = formDto.testTwentyRightEyeFar;
    form.testTwentyObservationRightEyeFar = formDto.testTwentyObservationRightEyeFar;

    return form;
  }
}