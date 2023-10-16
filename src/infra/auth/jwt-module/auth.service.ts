import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SingIn } from '@application/services/auth/use-cases/sign-in';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private stepOne: SingIn,
  ) {}

  async signIn(login: string, password: string) {
    const resStepOne = await this.stepOne.execute({
      login,
      password,
    });

    if (!resStepOne) throw new UnauthorizedException();

    return {
      access_token: await this.jwtService.signAsync(resStepOne),
    };
  }
}
