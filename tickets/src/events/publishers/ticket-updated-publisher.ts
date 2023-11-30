import { Publisher, Subjects, TicketUpdatedEvent } from '@avijay_lib/ticketing-common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}