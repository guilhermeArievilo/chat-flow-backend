import { Attendant, AttendantProps } from '@application/entities/attendant';
import { genSaltSync } from 'bcrypt';

type Override = Partial<AttendantProps>;

export function makeAttendant(override: Override = {}) {
  return new Attendant({
    name: 'Fulano de Tal',
    email: 'fulano@gmail.com',
    password: 'teste123',
    hash: genSaltSync(16),
    ...override,
  });
}
