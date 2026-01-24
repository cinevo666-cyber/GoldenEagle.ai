
export enum SignalStatus {
  COMPLETED = 'COMPLETED',
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
}

export interface Signal {
  time: Date;
  confidence: number;
  result?: number;
}

export interface AISignal {
  predictedTime: string;
  confidence: number;
  targetMultiplier: string;
}

export interface AnalysisResult {
  pattern?: string;
  lastMultipliers?: string[];
  prediction?: {
    range: string;
    probability: string;
    timing: string;
  };
  confidence?: 'Alta' | 'Média' | 'Baixa' | 'Insuficiente';
  feedback?: string;
  error?: string;
  signals?: AISignal[];
}

export interface GeneratedSignal {
  time: string;
  percentage: number;
  multiplier: string;
}