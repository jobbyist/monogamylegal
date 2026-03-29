import type { ConciergeRequest, ConciergeResponse } from "@/lib/conciergeTypes";

export async function requestConciergeResponse(
  payload: ConciergeRequest,
): Promise<ConciergeResponse> {
  const response = await fetch("/api/concierge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to reach concierge service.");
  }

  return (await response.json()) as ConciergeResponse;
}
