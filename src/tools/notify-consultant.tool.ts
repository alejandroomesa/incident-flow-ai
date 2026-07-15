// Sensitive tool: only ever invoked from incident.service.ts's approval path
// (incidentService.approveAction), never from the AI agent's tool loop.
export async function notifyConsultant(input: {
  incidentId: number;
  team: string;
}): Promise<{ notificationId: string }> {
  const notificationId = `notif-${input.incidentId}-${Date.now()}`;
  console.log(`[notify_consultant] incident=${input.incidentId} team="${input.team}" -> ${notificationId}`);
  return { notificationId };
}
