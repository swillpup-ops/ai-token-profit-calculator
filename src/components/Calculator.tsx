"use client";

import { useMemo, useState } from "react";

type AIModel = {
  id: string;
  name: string;
  provider: string;
  inputCostPerMillion: number;
  outputCostPerMillion: number;
  category: "Popular" | "Budget" | "Premium" | "Advanced" | "Custom";
};

const TOKEN_SAVING_PROMPT = `Answer in the shortest possible way while still being correct.
Use plain language.
Limit your response to 2–3 sentences max.
No explanations unless absolutely necessary.
No filler, no repetition, no examples unless asked.`;

const AI_MODELS: AIModel[] = [
  { id: "chatgpt-5-4", name: "ChatGPT-5.4", provider: "OpenAI", inputCostPerMillion: 5, outputCostPerMillion: 15, category: "Popular" },
  { id: "chatgpt-5-mini", name: "ChatGPT-5 Mini", provider: "OpenAI", inputCostPerMillion: 0.6, outputCostPerMillion: 2.4, category: "Budget" },
  { id: "chatgpt-5-nano", name: "ChatGPT-5 Nano", provider: "OpenAI", inputCostPerMillion: 0.15, outputCostPerMillion: 0.6, category: "Budget" },
  { id: "chatgpt-o3", name: "ChatGPT o3 (Reasoning)", provider: "OpenAI", inputCostPerMillion: 10, outputCostPerMillion: 40, category: "Premium" },
  { id: "chatgpt-o4-mini", name: "ChatGPT o4-mini", provider: "OpenAI", inputCostPerMillion: 1.1, outputCostPerMillion: 4.4, category: "Popular" },

  { id: "claude-opus-4-6", name: "Claude Opus 4.6", provider: "Anthropic", inputCostPerMillion: 15, outputCostPerMillion: 75, category: "Premium" },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", provider: "Anthropic", inputCostPerMillion: 3, outputCostPerMillion: 15, category: "Popular" },
  { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", provider: "Anthropic", inputCostPerMillion: 0.8, outputCostPerMillion: 4, category: "Budget" },

  { id: "gemini-2-5-pro", name: "Gemini 2.5 Pro", provider: "Google", inputCostPerMillion: 1.25, outputCostPerMillion: 10, category: "Premium" },
  { id: "gemini-2-5-flash", name: "Gemini 2.5 Flash", provider: "Google", inputCostPerMillion: 0.3, outputCostPerMillion: 2.5, category: "Popular" },
  { id: "gemini-2-0-flash", name: "Gemini 2.0 Flash", provider: "Google", inputCostPerMillion: 0.1, outputCostPerMillion: 0.4, category: "Budget" },
  { id: "gemini-2-0-flash-lite", name: "Gemini 2.0 Flash-Lite", provider: "Google", inputCostPerMillion: 0.075, outputCostPerMillion: 0.3, category: "Budget" },

  { id: "grok-3", name: "Grok 3", provider: "xAI", inputCostPerMillion: 3, outputCostPerMillion: 15, category: "Advanced" },
  { id: "grok-3-mini", name: "Grok 3 Mini", provider: "xAI", inputCostPerMillion: 0.3, outputCostPerMillion: 0.5, category: "Budget" },

  { id: "mistral-large", name: "Mistral Large", provider: "Mistral", inputCostPerMillion: 2, outputCostPerMillion: 6, category: "Advanced" },
  { id: "mistral-small", name: "Mistral Small", provider: "Mistral", inputCostPerMillion: 0.2, outputCostPerMillion: 0.6, category: "Budget" },
  { id: "mistral-nemo", name: "Mistral Nemo", provider: "Mistral", inputCostPerMillion: 0.15, outputCostPerMillion: 0.15, category: "Budget" },

  { id: "deepseek-v3-2", name: "DeepSeek V3.2", provider: "DeepSeek", inputCostPerMillion: 0.27, outputCostPerMillion: 1.1, category: "Budget" },
  { id: "command-r-plus", name: "Command R+", provider: "Cohere", inputCostPerMillion: 3, outputCostPerMillion: 15, category: "Advanced" },
  { id: "qwen-3-5-plus", name: "Qwen 3.5 Plus", provider: "Alibaba", inputCostPerMillion: 1, outputCostPerMillion: 3, category: "Advanced" },
  { id: "llama-4-maverick", name: "Llama 4 Maverick", provider: "Meta", inputCostPerMillion: 0.5, outputCostPerMillion: 1.5, category: "Advanced" },

  { id: "custom", name: "Custom Model", provider: "Custom", inputCostPerMillion: 0, outputCostPerMillion: 0, category: "Custom" },
];

const PRESETS = [
  {
    name: "Etsy Listing Tool",
    requestsPerDay: 50,
    pricePerRequest: 0.25,
    inputTokens: 800,
    outputTokens: 600,
  },
  {
    name: "TikTok Caption Tool",
    requestsPerDay: 100,
    pricePerRequest: 0.1,
    inputTokens: 400,
    outputTokens: 300,
  },
  {
    name: "Customer Support Replies",
    requestsPerDay: 300,
    pricePerRequest: 0.05,
    inputTokens: 1000,
    outputTokens: 500,
  },
  {
    name: "SaaS AI Feature",
    requestsPerDay: 1000,
    pricePerRequest: 0.02,
    inputTokens: 1500,
    outputTokens: 700,
  },
  {
    name: "Long Report Generator",
    requestsPerDay: 25,
    pricePerRequest: 2,
    inputTokens: 6000,
    outputTokens: 3000,
  },
];

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function percent(value: number) {
  return `${value.toFixed(1)}%`;
}

export default function Calculator() {
  const [requestsPerDay, setRequestsPerDay] = useState(100);
  const [pricePerRequest, setPricePerRequest] = useState(0.25);
  const [inputTokens, setInputTokens] = useState(800);
  const [outputTokens, setOutputTokens] = useState(600);
  const [selectedModelId, setSelectedModelId] = useState("chatgpt-5-mini");

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPromptTip, setShowPromptTip] = useState(false);

  const [customInputCost, setCustomInputCost] = useState(1);
  const [customOutputCost, setCustomOutputCost] = useState(4);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const selectedModel = useMemo(() => {
    return AI_MODELS.find((model) => model.id === selectedModelId) || AI_MODELS[0];
  }, [selectedModelId]);

  const activeInputCost =
    selectedModel.id === "custom" ? customInputCost : selectedModel.inputCostPerMillion;

  const activeOutputCost =
    selectedModel.id === "custom" ? customOutputCost : selectedModel.outputCostPerMillion;

  const dailyRevenue = requestsPerDay * pricePerRequest;
  const monthlyRevenue = dailyRevenue * 30;

  const costPerRequest =
    (inputTokens / 1_000_000) * activeInputCost +
    (outputTokens / 1_000_000) * activeOutputCost;

  const dailyAiCost = costPerRequest * requestsPerDay;
  const monthlyAiCost = dailyAiCost * 30;
  const monthlyProfit = monthlyRevenue - monthlyAiCost;

  const aiCostPercent =
    monthlyRevenue > 0 ? (monthlyAiCost / monthlyRevenue) * 100 : 0;

  const profitPerRequest = pricePerRequest - costPerRequest;

  const sanity =
    aiCostPercent < 5
      ? {
          title: "Healthy margin",
          message: "AI cost is low compared to revenue. This idea has breathing room.",
          color: "bg-green-50 border-green-200 text-green-800",
        }
      : aiCostPercent < 15
      ? {
          title: "Watch it",
          message: "Margins are okay, but keep an eye on longer AI answers and expensive models.",
          color: "bg-yellow-50 border-yellow-200 text-yellow-800",
        }
      : aiCostPercent < 30
      ? {
          title: "Risky margin",
          message: "AI cost is taking a serious bite. Raise price or use a cheaper model.",
          color: "bg-orange-50 border-orange-200 text-orange-800",
        }
      : {
          title: "Bad margin",
          message: "This setup is burning too much money. Fix pricing, tokens, or model choice.",
          color: "bg-red-50 border-red-200 text-red-800",
        };

  const bestFix =
    activeOutputCost > activeInputCost * 2
      ? "Your fastest win is reducing answer length. Output tokens are usually the expensive little goblins."
      : aiCostPercent > 15
      ? "Your fastest win is switching to a cheaper model or raising your price per request."
      : "Your setup looks reasonable. Now test whether real people will actually pay for it.";

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setRequestsPerDay(preset.requestsPerDay);
    setPricePerRequest(preset.pricePerRequest);
    setInputTokens(preset.inputTokens);
    setOutputTokens(preset.outputTokens);
  }

  async function copyTokenSavingPrompt() {
    try {
      await navigator.clipboard.writeText(TOKEN_SAVING_PROMPT);
      setCopiedPrompt(true);

      window.setTimeout(() => {
        setCopiedPrompt(false);
      }, 1600);
    } catch {
      setCopiedPrompt(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-semibold text-blue-600">
            AI Token Profit Calculator
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
  Are you making money with AI
  <br />
  or just burning tokens?
</h1>

<p className="mt-3 text-lg font-bold text-slate-600">
  See your real costs before you build the thing.
</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 space-y-6">
            <div>
              <h2 className="text-xl font-bold">Start with a real-world example</h2>
              <p className="mt-1 text-sm text-slate-500">
                Pick a preset, then adjust the numbers.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:bg-blue-50 hover:border-blue-200"
                  >
                    <div className="font-semibold">{preset.name}</div>
                    <div className="text-sm text-slate-500">
                      {preset.requestsPerDay} requests/day at{" "}
                      {money(preset.pricePerRequest)} each
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="font-semibold">Requests per day</span>
                <input
                  type="number"
                  min="0"
                  value={requestsPerDay}
                  onChange={(e) => setRequestsPerDay(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-lg"
                />
                <p className="text-sm text-slate-500">
                  How many times people use the AI feature daily.
                </p>
              </label>

              <label className="space-y-2">
                <span className="font-semibold">Price per request</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={pricePerRequest}
                  onChange={(e) => setPricePerRequest(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-lg"
                />
                <p className="text-sm text-slate-500">
                  What you charge each time someone uses it.
                </p>
              </label>

              <label className="space-y-2">
                <span className="font-semibold">Prompt size</span>
                <input
                  type="number"
                  min="0"
                  value={inputTokens}
                  onChange={(e) => setInputTokens(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-lg"
                />
                <p className="text-sm text-slate-500">
                  How much information the user sends in.
                </p>
              </label>

              <label className="space-y-2">
                <span className="font-semibold">AI answer length</span>
                <input
                  type="number"
                  min="0"
                  value={outputTokens}
                  onChange={(e) => setOutputTokens(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-lg"
                />
                <p className="text-sm text-slate-500">
                  Longer answers usually cost more.
                </p>
              </label>
            </div>

            <label className="space-y-2 block">
              <span className="font-semibold">Model</span>
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-lg bg-white"
              >
                <option value="chatgpt-5-mini">ChatGPT-5 Mini</option>
                <option value="claude-sonnet-4-6">Claude Sonnet 4.6</option>
                <option value="gemini-2-5-flash">Gemini 2.5 Flash</option>
                <option value="chatgpt-o4-mini">ChatGPT o4-mini</option>
              </select>
              <p className="text-sm text-slate-500">
                Keep this simple for most users. More models are under Advanced Settings.
              </p>
            </label>

            <div>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="rounded-2xl border border-slate-300 px-4 py-3 font-semibold hover:bg-slate-100"
              >
                {showAdvanced ? "Hide Advanced Settings" : "Advanced Settings"}
              </button>
            </div>

            {showAdvanced && (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 space-y-5">
                <div>
                  <h3 className="text-lg font-bold">Advanced Model Picker</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Use this when you want the full model list.
                  </p>
                </div>

                <label className="space-y-2 block">
                  <span className="font-semibold">All AI Models</span>
                  <select
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-lg bg-white"
                  >
                    {AI_MODELS.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} · {model.provider}
                      </option>
                    ))}
                  </select>
                </label>

                {selectedModel.id === "custom" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="font-semibold">
                        Custom input cost / 1M tokens
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={customInputCost}
                        onChange={(e) => setCustomInputCost(Number(e.target.value))}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-lg"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="font-semibold">
                        Custom output cost / 1M tokens
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={customOutputCost}
                        onChange={(e) => setCustomOutputCost(Number(e.target.value))}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-lg"
                      />
                    </label>
                  </div>
                )}

                <div className="rounded-2xl bg-white border border-slate-200 p-4 text-sm text-slate-600">
                  Prices are estimates. Always check current API pricing before
                  making real business decisions.
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold">Profit Snapshot</h2>

              <div className="mt-5 grid gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Monthly Revenue</p>
                  <p className="text-3xl font-bold">{money(monthlyRevenue)}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Monthly AI Cost</p>
                  <p className="text-3xl font-bold">{money(monthlyAiCost)}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Estimated Monthly Profit</p>
                  <p className="text-3xl font-bold">{money(monthlyProfit)}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">AI Cost of Revenue</p>
                  <p className="text-3xl font-bold">{percent(aiCostPercent)}</p>
                </div>
              </div>
            </section>

            <section className={`rounded-3xl border p-6 ${sanity.color}`}>
              <h2 className="text-xl font-bold">{sanity.title}</h2>
              <p className="mt-2">{sanity.message}</p>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold">Best Fix</h2>

              <p className="mt-2 text-slate-600">{bestFix}</p>

              <button
                onClick={() => setShowPromptTip(!showPromptTip)}
                className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
              >
                {showPromptTip
                  ? "Hide token-saving tip"
                  : "Show me how to reduce token costs"}
              </button>

              {showPromptTip && (
                <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-3">
                  <p className="text-sm text-slate-600">
                    Add this to the end of your AI prompts to encourage shorter answers:
                  </p>

                  <div className="rounded-xl bg-white border border-slate-200 p-3 text-sm font-mono text-slate-700 whitespace-pre-line">
                    {TOKEN_SAVING_PROMPT}
                  </div>

                  <button
                    onClick={copyTokenSavingPrompt}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    {copiedPrompt ? "Copied!" : "Copy prompt"}
                  </button>
                </div>
              )}

              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <p>
                  Current model: <strong>{selectedModel.name}</strong>
                </p>
                <p>
                  Cost per request: <strong>{money(costPerRequest)}</strong>
                </p>
                <p>
                  Profit per request: <strong>{money(profitPerRequest)}</strong>
                </p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}