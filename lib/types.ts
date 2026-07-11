export interface ProjectFile {
  filename: string;
  content: string;
}

export interface DeploymentRecord {
  id: string;
  status: string;
  url: string;
  createdAt: number;
  fileCount: number;
  files: string[];
  logs: string[];
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  files: ProjectFile[];
}
