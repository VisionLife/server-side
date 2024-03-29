import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DomainDTO } from '../models/dtos/domain.dto';
import { Domain } from '../models/entities/domain.entity';

@Injectable()
export class DomainService {
  constructor(
    @Inject('DOMAIN_REPOSITORY')
    private domainRepository: Repository<Domain>
  ) {}

  /**
   * adds new domain
   * 
   * @param domainDto 
   * @returns added Domain
   */
  async addDomain(domainDto: DomainDTO): Promise<Domain> {
    return this.domainRepository.save( await this.createDomain(domainDto));
  }

  /**
   * returns domain by id
   * 
   * @param id 
   * @returns domain
   */
  async getDomainById(id: number): Promise<Domain> {
    return this.domainRepository.findOne({ where: { id: id } });
  }

  /**
   * returns domain by cnpj
   * 
   * @param cnpj
   * @returns domain
   */
  async getDomainByCnpj(cnpj: string): Promise<Domain> {
    return this.domainRepository.findOne({ where: { cnpj: cnpj } });
  }

  /**
   * returns domains list
   * 
   * @returns domains list
   */
  async getDomains(): Promise<Domain[]> {
    return this.domainRepository.find();
  }

  /**
   * deletes domain based on id
   * 
   * @param id 
   */
  async deleteDomain(id: number): Promise<void> {
    await this.domainRepository.delete(id);
  }

  /**
   * Updates a domain
   * 
   * @param id 
   * @param domainDto 
   */
  async updateDomain(id: number, domainDto: DomainDTO): Promise<Domain> {
    const domain = await this.getDomainById(id);
    domain.address = domainDto.address;
    domain.cnpj = domainDto.cnpj;
    domain.companyName = domainDto.companyName;
    domain.tradingName = domainDto.tradingName;
    domain.managerId = domainDto.managerId;

    await this.domainRepository.save(domain);
    return domain;
  }

  /**
   * creates a new domain object based on the domainDTO provided
   * 
   * @param domainDto 
   * @returns Domain object
   */
  async createDomain(domainDto: DomainDTO): Promise<Domain> {
    this.validateDomainCnpj(domainDto.cnpj);

    const domain = new Domain();

    domain.companyName = domainDto.companyName;
    domain.tradingName = domainDto.tradingName;
    domain.cnpj = domainDto.cnpj;
    domain.address = domainDto.address;

    return domain;
  }

  /**
   * sets the domain manager
   * 
   * @param domainId 
   * @param managerId 
   * @returns 
   */
  async setDomainManger(domainId: number, managerId: any): Promise<Domain> {
    const domain = await this.getDomainById(domainId);

    if(domain.managerId !== null && domain.managerId > 0) {
      throw new BadRequestException('Domain already has a Manager!');
    }

    domain.managerId = managerId.managerId;

    await this.domainRepository.save(domain);
    return domain;
  }
  
  async validateDomainCnpj(cnpj: string) {
    if(await this.getDomainByCnpj(cnpj)) {
      throw new BadRequestException('CNPJ already in use!');
    }
  }
}
