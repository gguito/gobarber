import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentService from './ListProviderAppointmentService';

let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointmentService: ListProviderAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointmentService = new ListProviderAppointmentService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list appointments in a day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 9, 0, 0),
    });

    const appointments = await listProviderAppointmentService.execute({
      provider_id: '123123',
      year: 2020,
      month: 12,
      day: 1,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
