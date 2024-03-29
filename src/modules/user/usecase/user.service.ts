import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { Domain } from 'src/modules/domain/models/entities/domain.entity';
import { DomainService } from 'src/modules/domain/usecase/domain.service';
import { Repository } from 'typeorm';
import { UserDTO } from '../models/dtos/user.dto';
import { User } from '../models/entities/user.entity';
import { UserRoles } from '../models/enums/user.enum';
import { NotFoundException } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject(DomainService)
    private domainService: DomainService,
  ) {}

  /**
   * findAll
   *
   * @returns Promise<User[]>
   */
  async getUsers(userId: number): Promise<User[]> {
    const user = await this.getUserById(userId);
    if(!user) {
      throw new BadRequestException('User not found');
    }

    let users: User[] = [];

    if (user.role === UserRoles.ADMIN) {
      users = await this.userRepository.find();
    } else if (user.role === UserRoles.MANAGER || user.role === UserRoles.OPERATOR ) {
      users = await this.userRepository.find({
        where: {
          domain: {
            cnpj: user.domain.cnpj,
          },
        },
      });
    } else if (user.role === UserRoles.OPERATOR) {
      users = await this.userRepository.find({
        where: {
          id: userId,
        },
      });
    }

    return users;
  }

  /**
   * find users by cnpj
   *
   * @returns Promise<User[]>
   */
  async getUsersByCpnj(cnpj: string): Promise<User[]> {
    return this.userRepository.createQueryBuilder('user')
      .innerJoin('user.domain', 'domain')
      .where('domain.cnpj = :cnpj', { cnpj })
      .getMany();
  }

  /**
   * register new user
   * 
   * @param userDTO 
   * @returns 
   */
  async registerNewUser(userDTO: UserDTO): Promise<User> {
    return this.userRepository.save(await this.createUser(userDTO));
  }

  /**
   * returns user by id
   *
   * @param id number
   * @returns Promise<User>
   */
  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id: id } });
  }

  /**
   * update existing user
   * 
   * @param user 
   */
  async updateUser(id: number, userDto: UserDTO): Promise<User> {
    const user = await this.getUserById(id);
    
    user.email = userDto.email;
    user.name = userDto.name;
    if (user.password !== userDto.password) user.setPassword(userDto.password);
    user.role = userDto.role;
    user.isActive = userDto.isActive;

    await this.userRepository.save(user);
    return user;
  }

  /**
   * returns user by email
   * 
   * @param email 
   * @returns 
   */
  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: email } });
  }

   /**
   * deletes user based on id
   * 
   * @param id 
   */
   async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  /**
   * createUser
   *
   * @param userDTO UserRegisterDTO
   * @returns User
   */
  async createUser(userDTO: UserDTO): Promise<User> {
    const user = new User();

    const domain = await this.validateUserCreation(userDTO);

    user.name = userDTO.name;
    user.email = userDTO.email;
    user.password = userDTO.password;
    user.role = userDTO.role;
    user.domain = domain;
    user.isActive = true;

    return user;
  }

  /**
   * deactivates an user
   * if the user is a manager, deactivates the users from same domain
   * 
   * @param id 
   * @returns 
   */
  async deactivateUser(userId: number) {
    const user = await this.getUserById(userId);
    let users = [];

    user.isActive = false;
    users.push(user);

      let domainUsers = await this.getUsersByDomain(user.domain)
      domainUsers.forEach((user) => {
        user.isActive = false;

        if( user.id !== userId ) {
          users.push(user);
        }
      })

    await this.userRepository.save(users);
  }

  /**
  * returns list of users from the specified domain
  * 
  * @param domain 
  * @returns 
  */
  async getUsersByDomain(domain: Domain): Promise<User[]> {
    return this.userRepository.find({ where: { domain: domain } });
  }

  /**
   * verifies if domain has existing manager
   * 
   * @param userDTORole 
   * @param domainManagerId 
   */
  async verifyManagerByDomain(userDTORole: UserRoles, domainManagerId: number) {
    if(userDTORole === UserRoles.MANAGER && domainManagerId !== null && domainManagerId > 0) {
      throw new BadRequestException('Domain already has a Manager!');
    }
  } 
  
  /**
   * Validates the user role for domain and if email is already registered
   * 
   * @param userDTO user dto with attributes to validate  
   * @returns 
   */
  async validateUserCreation(userDTO: UserDTO): Promise<Domain> {
    const domain = await this.domainService.getDomainByCnpj(userDTO.domainCnpj);
  
    if(domain){
      this.verifyManagerByDomain(userDTO.role, domain.managerId);
    } else {
      throw new NotFoundException('Domain not found');
    }
    
    const user = await this.getUserByEmail(userDTO.email);
    if(user) {
      throw new BadRequestException('Email already in use');
    }
  
    return domain;
  }
}

