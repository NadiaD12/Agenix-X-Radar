export interface Lead {
  id?: number;
  name: string;
  email: string;
  company?: string;
  role?: string;
  newsletter_opt_in?: boolean;
  timestamp?: number;
}

export enum SimulationStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface AgentLog {
  timestamp: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ACTION';
  message: string;
  details?: string;
}

export interface SimulationResponse {
  scenarioName: string;
  logs: AgentLog[];
  summary: string;
}