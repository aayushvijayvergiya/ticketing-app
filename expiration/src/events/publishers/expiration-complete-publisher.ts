import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@avijay_lib/ticketing-common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
