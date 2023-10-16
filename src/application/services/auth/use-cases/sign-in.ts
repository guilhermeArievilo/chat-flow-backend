import { AttendantRepository } from '@application/repositories/attendant-repository';
import { hashSync } from 'bcrypt';

interface SingInRequest {
  login: string;
  password: string;
}

export class SingIn {
  constructor(private attendantRepository: AttendantRepository) {}

  async execute(request: SingInRequest) {
    const { login, password } = request;

    try {
      const attendant =
        await this.attendantRepository.findAttendantByEmail(login);

      if (!attendant) throw new Error('User not found');

      const hPass = this.hashPassword(password, attendant.hash);

      if (attendant.password === hPass) {
        return {
          name: attendant.name,
          email: attendant.email,
        };
      }

      return null;
    } catch (e) {
      throw new Error('[Login error] - ops, algo deu errado no login');
    }
  }

  private hashPassword(password: string, salt: string) {
    return hashSync(password, salt);
  }
}
