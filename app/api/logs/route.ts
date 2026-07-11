import { NextRequest, NextResponse } from 'next/server';
import { mockDeployments } from '@/lib/mockStore';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, error: 'Deployment ID missing' }, { status: 400 });
  }

  const record = mockDeployments[id];
  const logs = record?.logs?.length
    ? record.logs
    : [
        `[${new Date().toISOString()}] structural check: completed framework detection.`,
        `[${new Date().toISOString()}] optimization: optimized assets tree successfully.`,
        `[${new Date().toISOString()}] verification: system pipeline deployment validated.`,
      ];

  return NextResponse.json({ success: true, logs });
}
