import { Column } from 'typeorm';

export class Address {
    @Column({name: 'street'})
    street: string;
    @Column({name: 'number'})
    number: number;
    @Column({name: 'state'})
    state: string;
    @Column({name: 'city'})
    city: string;
  }