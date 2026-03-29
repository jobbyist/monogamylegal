export const CONCIERGE_DISCLAIMER =
  "Monogamy Concierge provides legal information only, not legal advice. For legal advice on your specific situation, consult a licensed attorney.";

export const policyCategories = {
  allowedInformational: "allowed_informational",
  blockedLegalAdvice: "blocked_legal_advice",
  escalationRequired: "escalation_required",
} as const;

export type PolicyCategory = (typeof policyCategories)[keyof typeof policyCategories];

export const conciergeIntents = {
  informational: "informational",
  legalAdviceBlocked: "legal_advice_blocked",
  sensitiveEscalation: "sensitive_escalation",
} as const;

export type ConciergeIntent = (typeof conciergeIntents)[keyof typeof conciergeIntents];

export const conciergeNextActions = {
  selfServeInfo: "self_serve_info",
  revisePrompt: "revise_prompt",
  escalateToAttorney: "escalate_to_human_attorney",
} as const;

export type ConciergeNextAction =
  (typeof conciergeNextActions)[keyof typeof conciergeNextActions];

export type ConciergeRequest = {
  prompt: string;
};

export type ConciergeResponse = {
  intent: ConciergeIntent;
  policy_category: PolicyCategory;
  answer: string;
  disclaimer: string;
  next_action: ConciergeNextAction;
  escalation_contact?: {
    label: string;
    href: string;
  };
};
