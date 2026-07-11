import React from 'react';

interface StatusMonitorProps {
  status: string;
  url: string;
  logs: string[];
}

export default function StatusMonitor({ status, url, logs }: StatusMonitorProps) {
  return (
    <div style={{ marginTop: '20px', border: '1px solid #00ff00', padding: '15px', backgroundColor: '#151515' }}>
      <h3 style={{ color: '#00ff00', margin: '0 0 10px 0' }}>[ REAL-TIME PLATFORM NODE TELEMETRY ]</h3>
      <p style={{ margin: '5px 0' }}>
        DEPLOYMENT STATUS: <span style={{ color: status === 'READY' ? '#00ff00' : '#ffea00', fontWeight: 'bold' }}>{status || 'IDLE'}</span>
      </p>
      {url && (
        <p style={{ margin: '5px 0' }}>
          LIVE DEPLOYMENT LINK:{' '}
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#00ffff', textDecoration: 'underline' }}>
            {url}
          </a>
        </p>
      )}

      <div style={{ marginTop: '15px' }}>
        <h4 style={{ color: '#00ff00', margin: '5px 0' }}>LOG OUTPUT STREAM:</h4>
        <div
          style={{
            backgroundColor: '#000',
            border: '1px dashed #00ff00',
            padding: '10px',
            maxHeight: '150px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#aaa',
          }}
        >
          {logs.length === 0 ? (
            <span style={{ color: '#555' }}>Empty stream connection layer. waiting for trigger pulse...</span>
          ) : (
            logs.map((log, idx) => <div key={idx} style={{ marginBottom: '4px' }}>{log}</div>)
          )}
        </div>
      </div>
    </div>
  );
}
