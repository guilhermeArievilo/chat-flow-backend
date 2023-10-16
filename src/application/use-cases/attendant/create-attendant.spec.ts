import { InMemoryAttendantRepository } from '@test/repositories/in-memory-attendant-repository';
import { CreateAttendant } from './create-attendant';

describe('Create Attendant', () => {
  it('Should be able to create an Attendant', async () => {
    const attendantRepository = new InMemoryAttendantRepository();
    const createAttendant = new CreateAttendant(attendantRepository);

    await createAttendant.execute({
      email: 'guilherme_arievilo@outlook.com',
      name: 'Guilherme',
      password: 'teste',
    });

    expect(attendantRepository.attendants).toHaveLength(1);
  });
});
