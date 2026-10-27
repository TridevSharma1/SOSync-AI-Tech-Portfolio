import type { Enquiry } from "./types";

export const enquiries: Enquiry[] = [
  {
    id: "e-1",
    name: "Vikram Patil",
    email: "vikram@urbanhomes.in",
    phone: "+91 98220 11223",
    company: "UrbanHomes Realty",
    subject: "Custom CRM for our sales team",
    message:
      "We're a 45-person real estate firm in Pune looking to replace our spreadsheets with a proper CRM. Can we schedule a discovery call this week?",
    date: "2026-10-20",
    read: false,
  },
  {
    id: "e-2",
    name: "Meghna Rao",
    email: "meghna.rao@freshcart.co",
    phone: "+91 90080 45671",
    company: "FreshCart",
    subject: "Grocery delivery app — Android & iOS",
    message:
      "We need a customer-facing delivery app with live order tracking. Budget approved, looking to start within a month.",
    date: "2026-10-22",
    read: false,
  },
  {
    id: "e-3",
    name: "Daniel Osei",
    email: "d.osei@accraport.org",
    phone: "+233 20 555 0199",
    company: "Accra Port Authority",
    subject: "ERP modernisation consultation",
    message:
      "Our legacy ERP is 12 years old. We'd like a migration assessment and a phased modernisation plan, possibly on AWS.",
    date: "2026-10-24",
    read: true,
  },
  {
    id: "e-4",
    name: "Snehal Wagh",
    email: "snehal@waghdental.in",
    phone: "+91 91680 33445",
    company: "Wagh Dental Clinic",
    subject: "Website + online appointment booking",
    message:
      "Small project: a modern 5-page website with appointment booking and WhatsApp integration for our three clinics.",
    date: "2026-10-25",
    read: true,
  },
  {
    id: "e-5",
    name: "Rahul Menon",
    email: "rahul@quantifai.io",
    phone: "+91 87990 22110",
    company: "QuantifAI",
    subject: "AI analytics PoC",
    message:
      "Interested in a proof-of-concept for churn prediction on our subscription data. What does a 4-week PoC look like?",
    date: "2026-10-26",
    read: false,
  },
];
