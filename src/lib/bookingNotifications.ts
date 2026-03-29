export type BookingEmailTemplate = "booking_confirmation" | "reminder_24h" | "pre_consult_checklist";
export type BookingEmailAudience = "client" | "attorney";

export type BookingWebhookPayload = {
  bookingId: string;
  appointmentAt: string;
  timezone: string;
  rescheduleUrl: string;
  client: {
    name: string;
    email: string;
  };
  attorney: {
    name: string;
    email: string;
  };
  practiceArea?: string;
};

export type DeliveryStatus = "queued" | "delivered" | "failed" | "retrying";

export type BookingEmailDelivery = {
  id: string;
  bookingId: string;
  template: BookingEmailTemplate;
  audience: BookingEmailAudience;
  recipientName: string;
  recipientEmail: string;
  subject: string;
  body: string;
  timezone: string;
  scheduledFor: string;
  sentAt?: string;
  nextRetryAt?: string;
  attempts: number;
  status: DeliveryStatus;
  lastError?: string;
};

const STORAGE_KEY = "monogamy_booking_email_deliveries_v1";
const MAX_RETRIES = 3;

const TEMPLATE_ORDER: BookingEmailTemplate[] = ["booking_confirmation", "pre_consult_checklist", "reminder_24h"];
const AUDIENCES: BookingEmailAudience[] = ["client", "attorney"];

function readDeliveryLog(): BookingEmailDelivery[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as BookingEmailDelivery[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeDeliveryLog(deliveries: BookingEmailDelivery[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(deliveries));
}

function formatAppointment(isoDate: string, timezone: string) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: timezone,
  }).format(date);
}

function templateCopy(
  template: BookingEmailTemplate,
  audience: BookingEmailAudience,
  payload: BookingWebhookPayload,
): { subject: string; body: string } {
  const appointmentText = formatAppointment(payload.appointmentAt, payload.timezone);
  const recipientName = audience === "client" ? payload.client.name : payload.attorney.name;
  const counterpartyName = audience === "client" ? payload.attorney.name : payload.client.name;
  const practiceLine = payload.practiceArea ? `Practice area: ${payload.practiceArea}.` : "";

  if (template === "booking_confirmation") {
    return {
      subject: `Booking confirmed: ${appointmentText}`,
      body: `Hello ${recipientName}, your consultation with ${counterpartyName} is confirmed for ${appointmentText} (${payload.timezone}). ${practiceLine} If needed, reschedule here: ${payload.rescheduleUrl}`,
    };
  }

  if (template === "reminder_24h") {
    return {
      subject: `24-hour reminder: consultation on ${appointmentText}`,
      body: `Hello ${recipientName}, this is your 24-hour reminder for the legal consultation with ${counterpartyName} on ${appointmentText} (${payload.timezone}). Please review your notes and documents. Reschedule link: ${payload.rescheduleUrl}`,
    };
  }

  return {
    subject: `Pre-consult checklist for ${appointmentText}`,
    body: `Hello ${recipientName}, before your consultation with ${counterpartyName} on ${appointmentText} (${payload.timezone}), please complete this checklist: identity details, key facts timeline, and documents you want to discuss. ${practiceLine} Reschedule if required: ${payload.rescheduleUrl}`,
  };
}

function getScheduledTime(template: BookingEmailTemplate, appointmentAtIso: string): string {
  const appointment = new Date(appointmentAtIso);
  if (template === "reminder_24h") {
    return new Date(appointment.getTime() - 24 * 60 * 60 * 1000).toISOString();
  }

  if (template === "pre_consult_checklist") {
    return new Date(appointment.getTime() - 4 * 60 * 60 * 1000).toISOString();
  }

  return new Date().toISOString();
}

function pseudoDeliverySuccess(deliveryId: string, attempts: number) {
  const hash = deliveryId
    .split("")
    .reduce((acc, ch) => (acc + ch.charCodeAt(0)) % 10, 0);

  if (attempts >= 2) return true;
  return hash > 1;
}

function upsertDelivery(nextDelivery: BookingEmailDelivery) {
  const current = readDeliveryLog();
  const idx = current.findIndex((item) => item.id === nextDelivery.id);
  if (idx === -1) {
    current.unshift(nextDelivery);
  } else {
    current[idx] = nextDelivery;
  }

  writeDeliveryLog(current);
}

function processDelivery(delivery: BookingEmailDelivery): BookingEmailDelivery {
  const attempts = delivery.attempts + 1;
  const sentAt = new Date().toISOString();
  const isSuccess = pseudoDeliverySuccess(delivery.id, attempts);

  if (isSuccess) {
    const done: BookingEmailDelivery = {
      ...delivery,
      attempts,
      sentAt,
      status: "delivered",
      lastError: undefined,
      nextRetryAt: undefined,
    };
    upsertDelivery(done);
    return done;
  }

  if (attempts >= MAX_RETRIES) {
    const failed: BookingEmailDelivery = {
      ...delivery,
      attempts,
      status: "failed",
      sentAt,
      lastError: "Temporary email provider timeout",
      nextRetryAt: undefined,
    };
    upsertDelivery(failed);
    return failed;
  }

  const nextRetryAt = new Date(Date.now() + attempts * 5 * 60 * 1000).toISOString();
  const retrying: BookingEmailDelivery = {
    ...delivery,
    attempts,
    status: "retrying",
    sentAt,
    nextRetryAt,
    lastError: "Temporary email provider timeout",
  };
  upsertDelivery(retrying);
  return retrying;
}

export function handleBookingWebhook(payload: BookingWebhookPayload): BookingEmailDelivery[] {
  const generated: BookingEmailDelivery[] = TEMPLATE_ORDER.flatMap((template) => {
    return AUDIENCES.map((audience) => {
      const recipient = audience === "client" ? payload.client : payload.attorney;
      const copy = templateCopy(template, audience, payload);
      const id = `${payload.bookingId}-${template}-${audience}`;

      return {
        id,
        bookingId: payload.bookingId,
        template,
        audience,
        recipientName: recipient.name,
        recipientEmail: recipient.email,
        subject: copy.subject,
        body: copy.body,
        timezone: payload.timezone,
        scheduledFor: getScheduledTime(template, payload.appointmentAt),
        attempts: 0,
        status: "queued",
      } satisfies BookingEmailDelivery;
    });
  });

  generated.forEach((delivery) => upsertDelivery(delivery));
  return generated.map((delivery) => processDelivery(delivery));
}

export function retryFailedDelivery(id: string) {
  const delivery = readDeliveryLog().find((item) => item.id === id);
  if (!delivery) return null;
  if (delivery.status !== "failed" && delivery.status !== "retrying") return delivery;

  return processDelivery({
    ...delivery,
    status: "queued",
  });
}

export function getDeliveryLog() {
  return readDeliveryLog().sort((a, b) => +new Date(b.scheduledFor) - +new Date(a.scheduledFor));
}

export function getDeliveryFailures() {
  return readDeliveryLog().filter((item) => item.status === "failed" || item.status === "retrying");
}
