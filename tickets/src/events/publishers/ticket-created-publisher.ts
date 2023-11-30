import { Publisher, Subjects, TicketCreatedEvent } from '@avijay_lib/ticketing-common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}