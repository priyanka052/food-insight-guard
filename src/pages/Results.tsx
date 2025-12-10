import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { IngredientTag } from '@/components/IngredientTag';
import { HealthScoreGauge } from '@/components/HealthScoreGauge';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, Lightbulb, RefreshCw } from 'lucide-react';
import type { AnalysisResult } from '@/utils/healthAnalyzer';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useApp();
  
  const { result, ingredients } = (location.state as { result: AnalysisResult; ingredients: string[] }) || {};

  if (!result) {
    navigate('/dashboard');
    return null;
  }

  // Get computed CSS colors for chart
  const getComputedColor = (varName: string): string => {
    if (typeof window !== 'undefined') {
      const hsl = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      if (hsl) return `hsl(${hsl})`;
    }
    // Fallback colors
    const fallbacks: Record<string, string> = {
      '--safe': 'hsl(142, 71%, 45%)',
      '--caution': 'hsl(45, 93%, 47%)',
      '--avoid': 'hsl(0, 84%, 60%)',
    };
    return fallbacks[varName] || 'hsl(0, 0%, 50%)';
  };

  // Prepare chart data
  const chartData = [
    { name: t.safe, count: result.ingredients.filter(i => i.riskLevel === 'safe').length, color: getComputedColor('--safe') },
    { name: t.caution, count: result.ingredients.filter(i => i.riskLevel === 'caution').length, color: getComputedColor('--caution') },
    { name: t.avoid, count: result.ingredients.filter(i => i.riskLevel === 'avoid').length, color: getComputedColor('--avoid') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </button>

          {/* Health Score Section */}
          <div className="mb-8 rounded-2xl border border-border bg-card p-8 shadow-card text-center">
            <h1 className="text-2xl font-bold mb-6">{t.healthScoreFor}</h1>
            
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12">
              <HealthScoreGauge score={result.healthScore} size="lg" />
              
              {/* Bar Chart */}
              <div className="w-full max-w-xs h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      width={70}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Ingredients List */}
          <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {t.detectedIngredients}
              <span className="text-sm font-normal text-muted-foreground">
                ({result.ingredients.length} items)
              </span>
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {result.ingredients.map((ingredient, index) => (
                <IngredientTag
                  key={index}
                  name={ingredient.name}
                  riskLevel={ingredient.riskLevel}
                />
              ))}
            </div>
          </div>

          {/* Summary & Concerns */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* Summary */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                {t.summary}
              </h2>
              <p className="text-muted-foreground">{result.summary}</p>
            </div>

            {/* Concerns */}
            {result.concerns.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-caution" />
                  Key Concerns
                </h2>
                <ul className="space-y-2">
                  {result.concerns.map((concern, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="h-4 w-4 text-avoid mt-0.5 shrink-0" />
                      {concern}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Diet Suggestions */}
          <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-card">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-accent" />
              {t.dietSuggestions}
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* Foods to Include */}
              <div>
                <h3 className="font-semibold text-safe mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  {t.foodsToInclude}
                </h3>
                <ul className="space-y-2">
                  {result.suggestions.include.slice(0, 6).map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-safe mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Foods to Avoid */}
              <div>
                <h3 className="font-semibold text-avoid mb-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  {t.foodsToAvoid}
                </h3>
                <ul className="space-y-2">
                  {result.suggestions.avoid.slice(0, 6).map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-avoid mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <Button
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="gap-2"
            >
              <RefreshCw className="h-5 w-5" />
              {t.scanAnother}
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            This analysis is for educational purposes only and should not be considered medical advice.
            Always consult with healthcare professionals for dietary decisions.
          </p>
        </div>
      </main>
    </div>
  );
}
