import { Publisher, OrderCreatedEvent, Subjects } from "@avijay_lib/ticketing-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
