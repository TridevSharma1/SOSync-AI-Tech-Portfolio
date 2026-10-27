import type { ProcessStep } from "./types";

export const process: ProcessStep[] = [
  {
    id: "ps-requirements",
    title: "Requirement Gathering",
    description:
      "We dig deep into your goals, users and constraints through workshops and research — so we build the right thing, not just the thing right.",
    icon: "clipboard",
  },
  {
    id: "ps-planning",
    title: "Planning",
    description:
      "Architecture, milestones, timelines and a transparent budget are locked into a clear roadmap everyone signs off on.",
    icon: "calendar",
  },
  {
    id: "ps-design",
    title: "UI Design",
    description:
      "Wireframes evolve into polished, on-brand interfaces that you review and approve before a line of code is written.",
    icon: "pen",
  },
  {
    id: "ps-development",
    title: "Development",
    description:
      "Agile sprints with weekly demos. Clean, reviewed, tested code ships continuously — you watch the product grow.",
    icon: "code",
  },
  {
    id: "ps-testing",
    title: "Testing",
    description:
      "Automated and manual QA across devices and browsers, plus security and performance checks before anything goes live.",
    icon: "check",
  },
  {
    id: "ps-deployment",
    title: "Deployment",
    description:
      "Zero-downtime launches with monitoring, backups and rollback plans in place from minute one.",
    icon: "rocket",
  },
  {
    id: "ps-maintenance",
    title: "Maintenance",
    description:
      "24×7 support, proactive updates and continuous improvement keep your product fast, secure and ahead of the curve.",
    icon: "headset",
  },
];
