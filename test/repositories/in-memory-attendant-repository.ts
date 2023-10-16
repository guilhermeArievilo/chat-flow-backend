import { Attendant } from '@application/entities/attendant';
import { AttendantRepository } from '@application/repositories/attendant-repository';

export class InMemoryAttendantRepository implements AttendantRepository {
  public attendants: Attendant[] = [];

  async create({
    name,
    email,
    password,
    hash,
  }: {
    name: string;
    email: string;
    password: string;
    hash: string;
  }): Promise<Attendant> {
    const attendant = new Attendant({
      name,
      email,
      password,
      hash,
    });

    await this.attendants.push(attendant);

    return attendant;
  }

  async findAttendantByEmail(email: string): Promise<Attendant | null> {
    try {
      const attendant = await this.attendants.find(
        (attendant) => attendant.email === email,
      );

      if (!attendant) return null;

      return attendant;
    } catch (e) {
      throw new Error(
        '[In memory repository - Attendant] - algo deu errado aqui.',
      );
    }
  }
  async get(): Promise<Attendant[]> {
    try {
      return this.attendants;
    } catch (e) {
      throw new Error(
        '[In memory repository - Attendant] - algo deu errado aqui.',
      );
    }
  }
}
