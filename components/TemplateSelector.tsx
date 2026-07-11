import React, { useEffect, useState } from 'react';
import { ProjectFile, ProjectTemplate } from '@/lib/types';

interface TemplateSelectorProps {
  onApply: (files: ProjectFile[]) => void;
}

export default function TemplateSelector({ onApply }: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const res = await fetch('/api/templates');
        const data = await res.json();
        if (data.success) setTemplates(data.templates);
      } catch {
        setTemplates([]);
      } finally {
        setLoading(false);
      }
    };
    loadTemplates();
  }, []);

  return (
    <div>
      <label style={{ color: '#0f0', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
        [ PROJECT TEMPLATE ]
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {loading ? (
          <span style={{ color: '#555', fontFamily: 'monospace', fontSize: '13px' }}>Loading templates...</span>
        ) : (
          templates.map((t) => (
            <button
              key={t.id}
              onClick={() => onApply(t.files)}
              title={t.description}
              style={{
                padding: '8px 14px',
                fontFamily: 'monospace',
                fontSize: '13px',
                cursor: 'pointer',
                border: '1px solid #00ff00',
                backgroundColor: 'transparent',
                color: '#00ff00',
              }}
            >
              {t.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
