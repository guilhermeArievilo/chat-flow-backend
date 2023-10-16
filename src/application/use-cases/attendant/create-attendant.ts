import { AttendantRepository } from '@application/repositories/attendant-repository';
import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';

interface CreateAttendantRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateAttendantResponse {
  attendant: {
    name: string;
    email: string;
  };
}

@Injectable()
export class CreateAttendant {
  constructor(private attendantRepository: AttendantRepository) {}

  async execute(
    request: CreateAttendantRequest,
  ): Promise<CreateAttendantResponse> {
    const { name, email, password } = request;

    const salt = genSaltSync(16);

    const key = hashSync(password, salt);

    try {
      const attendant = await this.attendantRepository.create({
        email,
        name,
        password: key,
        hash: salt,
      });

      return {
        attendant: {
          name: attendant.name,
          email: attendant.email,
        },
      };
    } catch (e) {
      throw new Error('[Create Attendant error]');
    }
  }
}
