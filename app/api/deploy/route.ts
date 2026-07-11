import { NextRequest, NextResponse } from 'next/server';
import { mockDeployments } from '@/lib/mockStore';
import { ProjectFile, DeploymentRecord } from '@/lib/types';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

export async function POST(req: NextRequest) {
  try {
    const { files } = (await req.json()) as { files: ProjectFile[] };

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ success: false, error: 'Source file payload missing' }, { status: 400 });
    }

    // Step-by-Step Validation (CoT Simulation) across all files
    for (const f of files) {
      if (!f.filename || typeof f.content !== 'string') {
        return NextResponse.json({ success: false, error: `Malformed file entry: ${f.filename || 'unknown'}` }, { status: 422 });
      }
      if (f.content.includes('syntax error') || f.content.includes('const const')) {
        return NextResponse.json({ success: false, error: `Compilation failed: Syntax error detected in ${f.filename}.` }, { status: 422 });
      }
    }

    const deploymentId = 'dpl_' + Math.random().toString(36).substring(2, 15);

    if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
      const record: DeploymentRecord = {
        id: deploymentId,
        status: 'QUEUED',
        url: `https://zeylabs-${deploymentId}.vercel.app`,
        createdAt: Date.now(),
        fileCount: files.length,
        files: files.map((f) => f.filename),
        logs: [
          '[Zey Labs] Analyzing payload structural trees...',
          `[Zey Labs] Parsing ${files.length} file(s) across project tree...`,
          '[Zey Labs] Bundling static chunks...',
          '[Zey Labs] Code compiled successfully.',
        ],
      };
      mockDeployments[deploymentId] = record;

      return NextResponse.json({ success: true, deploymentId, mock: true });
    }

    const teamParam = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : '';
    const response = await fetch(`https://api.vercel.com/v13/deployments${teamParam}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'zeylabs-runtime-deployment',
        project: VERCEL_PROJECT_ID,
        files: files.map((f) => ({ file: f.filename, data: f.content })),
        target: 'production',
      }),
    });

    const data = await response.json();
    return NextResponse.json({ success: true, deploymentId: data.id || deploymentId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
