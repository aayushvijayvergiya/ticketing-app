import { Subjects, Publisher, PaymentCreatedEvent } from '@avijay_lib/ticketing-common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
