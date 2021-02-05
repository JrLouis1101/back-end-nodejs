import Appointment from '../models/Appointment';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;
    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({provider, date}: Request): Appointment{
        const appointmentDate = startOfHour(date) 

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(date);
        
    
        if(findAppointmentInSameDate){
            throw Error('Já existe um agendamento nesse horário.')
        }
    
        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        return appointment;
    
    }

}

export default CreateAppointmentService;