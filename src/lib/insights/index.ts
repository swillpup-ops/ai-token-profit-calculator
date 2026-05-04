import { CalculationResults, AIModel } from '../../types';

export interface Insight {
  id: string;
  type: 'saving' | 'revenue' | 'optimization' | 'info';
  message: string;
  impact?: string;
}

export function generateInsights(
  results: CalculationResults,
  selectedModel: AIModel,
  requestsPerDay: number,
  inputTokens: number,
  outputTokens: number,
  models: AIModel[]
): Insight[] {
  const insights: Insight[] = [];

  // 1. Model Switching (Existing + Enhanced)
  if (results.aiCostPercentage > 15) {
    const cheaperModel = models.find(m => m.id === 'gpt-4o-mini');
    if (cheaperModel && selectedModel.id !== cheaperModel.id) {
      const cheaperCostPerRequest = (inputTokens / 1000 * cheaperModel.inputCostPer1K) + 
                                     (outputTokens / 1000 * cheaperModel.outputCostPer1K);
      const monthlySavings = (results.aiCostPerRequest - cheaperCostPerRequest) * requestsPerDay * 30;
      
      if (monthlySavings > 0) {
        insights.push({
          id: 'model-switch',
          type: 'saving',
          message: `Switch to ${cheaperModel.name} to reduce overhead.`,
          impact: `Save $${monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo`
        });
      }
    }
  }

  // 2. Pricing Optimization (Existing)
  const priceIncrease = 1.0;
  const revenueBoost = requestsPerDay * priceIncrease * 30;
  insights.push({
    id: 'price-boost',
    type: 'revenue',
    message: `Raise price by $${priceIncrease.toFixed(2)} per request.`,
    impact: `+$${revenueBoost.toLocaleString()}/mo profit`
  });

  // 3. Token Ratio Optimization (New)
  const totalTokens = inputTokens + outputTokens;
  if (totalTokens > 3000) {
    const savings = results.monthlyAICost * 0.2;
    insights.push({
      id: 'token-optimization',
      type: 'optimization',
      message: 'Optimize prompt to reduce token count by 20%.',
      impact: `Save $${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo`
    });
  }

  // 4. Volume Scaling Insight (New)
  if (results.monthlyNetProfit > 0) {
    const doubledProfit = (results.monthlyRevenue * 2) - (results.monthlyAICost * 2);
    insights.push({
      id: 'volume-scale',
      type: 'info',
      message: 'Scale to 2x daily volume.',
      impact: `Profit grows to $${doubledProfit.toLocaleString()}/mo`
    });
  }

  // 5. High Margin Opportunity (New)
  if (results.aiCostPercentage < 5 && results.monthlyNetProfit > 1000) {
    insights.push({
      id: 'quality-upgrade',
      type: 'optimization',
      message: 'Your margins are high. Consider using Claude 3.5 Sonnet for better quality.',
      impact: 'Higher customer retention'
    });
  }

  return insights;
}