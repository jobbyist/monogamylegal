import {
  conciergeIntents,
  conciergeNextActions,
  CONCIERGE_DISCLAIMER,
  policyCategories,
  type ConciergeResponse,
} from "../src/lib/conciergeTypes";

const LEGAL_ADVICE_PATTERNS = [
  /what should i do/i,
  /should i/i,
  /can i sue/i,
  /draft (a|an) (contract|motion|letter|pleading)/i,
  /tell me exactly/i,
  /specific legal advice/i,
  /what are my chances/i,
];

const ESCALATION_PATTERNS = [
  /arrest/i,
  /criminal charge/i,
  /deportation/i,
  /domestic violence/i,
  /child custody emergency/i,
  /court (date|deadline|tomorrow|next week)/i,
  /restraining order/i,
  /eviction notice/i,
  /urgent/i,
  /statute of limitations/i,
];

const informationalAnswer =
  "I can share general legal information, typical process steps, and key questions to ask counsel. I cannot provide advice tailored to your specific facts.";

function includesPattern(input: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(input));
}

export function evaluateConciergePrompt(prompt: string): ConciergeResponse {
  const trimmedPrompt = prompt.trim();

  if (!trimmedPrompt) {
    return {
      intent: conciergeIntents.informational,
      policy_category: policyCategories.allowedInformational,
      answer:
        "Please share your question and I can provide general legal information and trusted next steps.",
      disclaimer: CONCIERGE_DISCLAIMER,
      next_action: conciergeNextActions.selfServeInfo,
    };
  }

  if (includesPattern(trimmedPrompt, ESCALATION_PATTERNS)) {
    return {
      intent: conciergeIntents.sensitiveEscalation,
      policy_category: policyCategories.escalationRequired,
      answer:
        "This appears time-sensitive or high-risk. I can provide general information, but a licensed attorney should review your situation immediately.",
      disclaimer: CONCIERGE_DISCLAIMER,
      next_action: conciergeNextActions.escalateToAttorney,
      escalation_contact: {
        label: "Speak with a human attorney",
        href: "/contact",
      },
    };
  }

  if (includesPattern(trimmedPrompt, LEGAL_ADVICE_PATTERNS)) {
    return {
      intent: conciergeIntents.legalAdviceBlocked,
      policy_category: policyCategories.blockedLegalAdvice,
      answer:
        "I can’t provide direct legal advice or strategy for your specific case. If you’d like, rephrase your question for general legal information (for example: process overview, definitions, or common timelines).",
      disclaimer: CONCIERGE_DISCLAIMER,
      next_action: conciergeNextActions.revisePrompt,
    };
  }

  return {
    intent: conciergeIntents.informational,
    policy_category: policyCategories.allowedInformational,
    answer: informationalAnswer,
    disclaimer: CONCIERGE_DISCLAIMER,
    next_action: conciergeNextActions.selfServeInfo,
  };
}
