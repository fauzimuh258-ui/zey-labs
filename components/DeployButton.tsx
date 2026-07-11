import React from 'react';

interface DeployButtonProps {
  onClick: () => void;
  loading: boolean;
  cooldown: number;
}

export default function DeployButton({ onClick, loading, cooldown }: DeployButtonProps) {
  const isButtonDisabled = loading || cooldown > 0;

  return (
    <button
      onClick={onClick}
      disabled={isButtonDisabled}
      style={{
        backgroundColor: isButtonDisabled ? '#333' : '#00ff00',
        color: isButtonDisabled ? '#888' : '#000',
        border: '1px solid #00ff00',
        padding: '12px 24px',
        fontFamily: 'monospace',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
        width: '100%',
        marginTop: '10px',
        transition: 'all 0.2s ease',
      }}
    >
      {loading ? 'INITIALIZING DEPLOYMENT BUILD PIPELINE...' : cooldown > 0 ? `COOLING DOWN: (${cooldown}s)` : 'EXECUTE PRODUCTION DEPLOYMENT'}
    </button>
  );
}
