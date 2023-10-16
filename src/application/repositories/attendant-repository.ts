import { Attendant } from '@application/entities/attendant';

export abstract class AttendantRepository {
  abstract create({
    name,
    email,
    password,
    hash,
  }: {
    name: string;
    email: string;
    password: string;
    hash: string;
  }): Promise<Attendant>;
  abstract findAttendantByEmail(email: string): Promise<Attendant | null>;
  abstract get(): Promise<Attendant[]>;
}
