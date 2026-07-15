import { auditService } from '../audit/audit.service.js';

export async function saveAuditEvent(input: {
  incidentId: number;
  action: string;
  performedBy: string;
}): Promise<void> {
  await auditService.record({
    incidentId: input.incidentId,
    event: input.action,
    actorType: 'ai_agent',
    actorId: input.performedBy,
  });
}
