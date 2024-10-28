import { useMutation } from '@tanstack/react-query';
import { createAppointment } from '../services/backend';
import { Appointment } from '../model/Appointment';

export function useAppointment() {
    const createAppointmentMutation = useMutation<Appointment, Error, Appointment>({
        mutationFn: createAppointment,
        onSuccess: (data) => {
            console.log("Appointment created successfully:", data);
        },
        onError: (error) => {
            console.error("Error creating appointment:", error.message);
        }
    });

    return { createAppointmentMutation };
}
