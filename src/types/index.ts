export interface AIModel {
  id: string;
  name: string;
  inputCostPer1K: number;
  outputCostPer1K: number;
}

export interface Preset {
  name: string;
  requestsPerDay: number;
  pricePerRequest: number;
  inputTokens: number;
  outputTokens: number;
  modelId: string;
}

export interface CalculationResults {
  dailyRevenue: number;
  monthlyRevenue: number;
  aiCostPerRequest: number;
  dailyAICost: number;
  monthlyAICost: number;
  monthlyNetProfit: number;
  aiCostPercentage: number;
  recommendation: 'strong' | 'low' | 'negative';
}