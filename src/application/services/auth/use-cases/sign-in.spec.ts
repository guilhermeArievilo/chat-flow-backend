import { CreateAttendant } from '@application/use-cases/attendant/create-attendant';
import { InMemoryAttendantRepository } from '@test/repositories/in-memory-attendant-repository';
import { SingIn } from './sign-in';

describe('Login', () => {
  it('Should be able to login', async () => {
    const attendantRepository = new InMemoryAttendantRepository();
    const createAttendant = new CreateAttendant(attendantRepository);

    await createAttendant.execute({
      email: 'guilherme_arievilo@outlook.com',
      name: 'Guilherme',
      password: 'teste',
    });

    const login = new SingIn(attendantRepository);

    const res = await login.execute({
      login: 'guilherme_arievilo@outlook.com',
      password: 'teste',
    });

    expect(res).toBeTruthy();
  });
});
