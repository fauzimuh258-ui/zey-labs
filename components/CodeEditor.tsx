import React from 'react';

interface CodeEditorProps {
  filename: string;
  value: string;
  onChange: (val: string) => void;
  onRename: (newFilename: string) => void;
}

export default function CodeEditor({ filename, value, onChange, onRename }: CodeEditorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <label style={{ color: '#0f0', fontWeight: 'bold' }}>[ SOURCE CODE ENVIRONMENT ]</label>
        <input
          value={filename}
          onChange={(e) => onRename(e.target.value)}
          style={{
            backgroundColor: '#151515',
            color: '#00ff00',
            border: '1px solid #00ff00',
            fontFamily: 'monospace',
            fontSize: '13px',
            padding: '4px 8px',
            outline: 'none',
          }}
        />
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="// Write web engine code layout here (HTML, CSS, or JavaScript assets format)..."
        style={{
          width: '100%',
          height: '350px',
          backgroundColor: '#151515',
          color: '#00ff00',
          border: '1px solid #00ff00',
          fontFamily: 'monospace',
          fontSize: '14px',
          padding: '12px',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}
