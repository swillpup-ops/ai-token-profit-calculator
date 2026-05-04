import { AIModel, Preset } from '../types';

export const MODELS: AIModel[] = [
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    inputCostPer1K: 0.00015, // $0.15 per 1M tokens
    outputCostPer1K: 0.0006, // $0.60 per 1M tokens
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    inputCostPer1K: 0.0025, // $2.50 per 1M tokens
    outputCostPer1K: 0.01, // $10.00 per 1M tokens
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    inputCostPer1K: 0.003, // $3.00 per 1M tokens
    outputCostPer1K: 0.015, // $15.00 per 1M tokens
  },
  {
    id: 'gemini-1-5-flash',
    name: 'Gemini 1.5 Flash',
    inputCostPer1K: 0.000075, // $0.075 per 1M tokens
    outputCostPer1K: 0.0003, // $0.30 per 1M tokens
  },
];

export const PRESETS: Preset[] = [
  {
    name: 'Etsy Listings',
    requestsPerDay: 50,
    pricePerRequest: 2.0,
    inputTokens: 500,
    outputTokens: 1000,
    modelId: 'gpt-4o-mini',
  },
  {
    name: 'TikTok Content',
    requestsPerDay: 10,
    pricePerRequest: 15.0,
    inputTokens: 2000,
    outputTokens: 3000,
    modelId: 'gpt-4o',
  },
  {
    name: 'Client Work',
    requestsPerDay: 5,
    pricePerRequest: 100.0,
    inputTokens: 10000,
    outputTokens: 5000,
    modelId: 'claude-3-5-sonnet',
  },
  {
    name: 'Customer Support',
    requestsPerDay: 500,
    pricePerRequest: 0.5,
    inputTokens: 300,
    outputTokens: 200,
    modelId: 'gemini-1-5-flash',
  },
];