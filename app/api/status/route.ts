import { NextRequest, NextResponse } from 'next/server';
import { mockDeployments } from '@/lib/mockStore';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, error: 'Deployment parameter missing' }, { status: 400 });
  }

  if (!VERCEL_TOKEN) {
    const record = mockDeployments[id];
    if (record) record.status = 'READY';
    return NextResponse.json({
      success: true,
      status: 'READY',
      url: record ? record.url : `https://zeylabs-${id}.vercel.app`,
    });
  }

  try {
    const teamParam = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : '';
    const response = await fetch(`https://api.vercel.com/v13/deployments/${id}${teamParam}`, {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    });
    const data = await response.json();
    return NextResponse.json({ success: true, status: data.status, url: data.url });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
