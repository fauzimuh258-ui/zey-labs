'use client';

import React, { useState, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';
import FileTabs from '@/components/FileTabs';
import TemplateSelector from '@/components/TemplateSelector';
import DeployButton from '@/components/DeployButton';
import StatusMonitor from '@/components/StatusMonitor';
import DeployHistory from '@/components/DeployHistory';
import { ProjectFile, DeploymentRecord } from '@/lib/types';

const DEFAULT_FILES: ProjectFile[] = [
  {
    filename: 'index.html',
    content: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Zey Labs Deployment Instance</title>\n</head>\n<body>\n  <h1>Deployment engine operational!</h1>\n</body>\n</html>`,
  },
];

export default function ZeyLabsDashboard() {
  const [files, setFiles] = useState<ProjectFile[]>(DEFAULT_FILES);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [status, setStatus] = useState('');
  const [url, setUrl] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [history, setHistory] = useState<DeploymentRecord[]>([]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const loadHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      if (data.success) setHistory(data.deployments || []);
    } catch {
      // non-critical, ignore
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleApplyTemplate = (templateFiles: ProjectFile[]) => {
    setFiles(templateFiles.map((f) => ({ ...f })));
    setActiveIndex(0);
  };

  const handleAddFile = () => {
    const newFilename = `file${files.length + 1}.js`;
    setFiles([...files, { filename: newFilename, content: '' }]);
    setActiveIndex(files.length);
  };

  const handleRemoveFile = (idx: number) => {
    if (files.length <= 1) return;
    const updated = files.filter((_, i) => i !== idx);
    setFiles(updated);
    setActiveIndex((prev) => Math.min(prev, updated.length - 1));
  };

  const handleRenameFile = (newName: string) => {
    setFiles((prev) => prev.map((f, i) => (i === activeIndex ? { ...f, filename: newName } : f)));
  };

  const handleContentChange = (val: string) => {
    setFiles((prev) => prev.map((f, i) => (i === activeIndex ? { ...f, content: val } : f)));
  };

  const handleDeploymentPipelineExecution = async () => {
    if (cooldown > 0 || files.length === 0) return;
    setLoading(true);
    setStatus('PRE-BUILD CHUNK STRUCTURING');
    setLogs(['[Zey Labs Engine] Processing architectural validation layers...']);

    try {
      const deployResponse = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files }),
      });

      const deploymentData = await deployResponse.json();

      if (!deploymentData.success) {
        throw new Error(deploymentData.error || 'Pipeline execution failed at compilation check.');
      }

      setCooldown(60); // 1 minute deployment constraint guardrail loop execution

      const statusResponse = await fetch(`/api/status?id=${deploymentData.deploymentId}`);
      const statusData = await statusResponse.json();

      const logsResponse = await fetch(`/api/logs?id=${deploymentData.deploymentId}`);
      const logsData = await logsResponse.json();

      setStatus(statusData.status);
      setUrl(statusData.url);
      setLogs(logsData.logs || []);
      loadHistory();
    } catch (error: any) {
      setStatus('BUILD OPERATION CORRUPTED');
      setLogs((prev) => [...prev, `[CRITICAL ERROR] ${error.message}`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#00ff00', minHeight: '100vh', fontFamily: 'monospace', padding: '30px', boxSizing: 'border-box' }}>
      <header style={{ borderBottom: '2px solid #00ff00', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '2px' }}>ZEY LABS // COMPUTE CODE CLOUD INTEGRATION ARCHITECTURE</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        <TemplateSelector onApply={handleApplyTemplate} />

        <FileTabs files={files} activeIndex={activeIndex} onSelect={setActiveIndex} onAdd={handleAddFile} onRemove={handleRemoveFile} />

        <CodeEditor
          filename={files[activeIndex]?.filename ?? ''}
          value={files[activeIndex]?.content ?? ''}
          onChange={handleContentChange}
          onRename={handleRenameFile}
        />

        <div>
          <DeployButton onClick={handleDeploymentPipelineExecution} loading={loading} cooldown={cooldown} />
          <StatusMonitor status={status} url={url} logs={logs} />
        </div>

        <DeployHistory deployments={history} onRefresh={loadHistory} />
      </div>
    </div>
  );
}
