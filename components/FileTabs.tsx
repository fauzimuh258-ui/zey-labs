import React from 'react';
import { ProjectFile } from '@/lib/types';

interface FileTabsProps {
  files: ProjectFile[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function FileTabs({ files, activeIndex, onSelect, onAdd, onRemove }: FileTabsProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
      {files.map((f, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(idx)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 10px',
            fontFamily: 'monospace',
            fontSize: '13px',
            cursor: 'pointer',
            border: '1px solid #00ff00',
            backgroundColor: idx === activeIndex ? '#00ff00' : '#151515',
            color: idx === activeIndex ? '#000' : '#00ff00',
          }}
        >
          <span>{f.filename}</span>
          {files.length > 1 && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onRemove(idx);
              }}
              style={{ fontWeight: 'bold', padding: '0 2px' }}
            >
              ×
            </span>
          )}
        </div>
      ))}
      <button
        onClick={onAdd}
        style={{
          padding: '6px 10px',
          fontFamily: 'monospace',
          fontSize: '13px',
          cursor: 'pointer',
          border: '1px dashed #00ff00',
          backgroundColor: 'transparent',
          color: '#00ff00',
        }}
      >
        + FILE
      </button>
    </div>
  );
}
