// Sensitive tool: only ever invoked from incident.service.ts's approval path
// (incidentService.approveAction), never from the AI agent's tool loop.
export async function createInternalTask(input: {
  incidentId: number;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}): Promise<{ taskId: string }> {
  const taskId = `task-${input.incidentId}-${Date.now()}`;
  console.log(
    `[create_internal_task] incident=${input.incidentId} priority=${input.priority} title="${input.title}" -> ${taskId}`,
  );
  return { taskId };
}
