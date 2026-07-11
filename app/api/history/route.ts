import { NextRequest, NextResponse } from 'next/server';
import { mockDeployments } from '@/lib/mockStore';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 20;

  if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
    const records = Object.values(mockDeployments)
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
    return NextResponse.json({ success: true, deployments: records, mock: true });
  }

  try {
    const teamParam = VERCEL_TEAM_ID ? `&teamId=${VERCEL_TEAM_ID}` : '';
    const response = await fetch(
      `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&limit=${limit}${teamParam}`,
      { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
    );
    const data = await response.json();
    return NextResponse.json({ success: true, deployments: data.deployments || [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
