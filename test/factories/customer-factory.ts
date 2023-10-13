import { Costumer, CustomerProps } from '@application/entities/customer';

type Override = Partial<CustomerProps>;

export function makeCustomer(override: Override = {}) {
  return new Costumer({
    name: 'Fulano de Tal',
    contact: '74999302829',
    ...override,
  });
}
