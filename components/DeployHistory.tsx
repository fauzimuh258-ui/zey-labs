import React from 'react';
import { DeploymentRecord } from '@/lib/types';

interface DeployHistoryProps {
  deployments: DeploymentRecord[];
  onRefresh: () => void;
}

export default function DeployHistory({ deployments, onRefresh }: DeployHistoryProps) {
  return (
    <div style={{ marginTop: '20px', border: '1px solid #00ff00', padding: '15px', backgroundColor: '#151515' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ color: '#00ff00', margin: 0 }}>[ DEPLOY HISTORY ]</h3>
        <button
          onClick={onRefresh}
          style={{
            background: 'transparent',
            border: '1px solid #00ff00',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px',
            padding: '4px 8px',
            cursor: 'pointer',
          }}
        >
          REFRESH
        </button>
      </div>
      {deployments.length === 0 ? (
        <span style={{ color: '#555', fontFamily: 'monospace', fontSize: '13px' }}>No deployments recorded yet.</span>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {deployments.map((d) => (
            <div
              key={d.id}
              style={{ border: '1px dashed #00ff00', padding: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#aaa' }}
            >
              <div style={{ color: '#0f0' }}>{d.id} — {d.status}</div>
              <div>{new Date(d.createdAt).toLocaleString()} · {d.fileCount ?? '—'} file(s)</div>
              <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ color: '#00ffff' }}>
                {d.url}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
