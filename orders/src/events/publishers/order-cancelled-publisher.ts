import { Subjects, Publisher, OrderCancelledEvent } from "@avijay_lib/ticketing-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
