import { DeploymentRecord } from './types';

// In-memory mock store. Resets on cold start / redeploy.
// Active only when VERCEL_TOKEN / VERCEL_PROJECT_ID are not configured.
export const mockDeployments: Record<string, DeploymentRecord> = {};
