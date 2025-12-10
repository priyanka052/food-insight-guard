import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { IngredientTag } from '@/components/IngredientTag';
import { HealthScoreGauge } from '@/components/HealthScoreGauge';
import { MealSuggestions } from '@/components/MealSuggestions';
import { ShareDialog } from '@/components/ShareDialog';
import { HealthIconBadge, healthIconsMap } from '@/components/HealthIcons';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, Lightbulb, RefreshCw, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import type { AnalysisResult } from '@/utils/healthAnalyzer';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, userProfile } = useApp();
  const [showMealSuggestions, setShowMealSuggestions] = useState(false);
  
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
    const fallbacks: Record<string, string> = {
      '--safe': 'hsl(142, 71%, 45%)',
      '--caution': 'hsl(45, 93%, 47%)',
      '--avoid': 'hsl(0, 84%, 60%)',
    };
    return fallbacks[varName] || 'hsl(0, 0%, 50%)';
  };

  // Prepare chart data with emojis
  const chartData = [
    { name: `✅ ${t.safe}`, count: result.ingredients.filter(i => i.riskLevel === 'safe').length, color: getComputedColor('--safe') },
    { name: `⚠️ ${t.caution}`, count: result.ingredients.filter(i => i.riskLevel === 'caution').length, color: getComputedColor('--caution') },
    { name: `❌ ${t.avoid}`, count: result.ingredients.filter(i => i.riskLevel === 'avoid').length, color: getComputedColor('--avoid') },
  ];

  // Get health score message with emoji
  const getScoreMessage = () => {
    if (result.healthScore >= 80) return { emoji: '🎉', text: 'Excellent Choice!', color: 'text-safe' };
    if (result.healthScore >= 60) return { emoji: '👍', text: 'Good Choice', color: 'text-primary' };
    if (result.healthScore >= 40) return { emoji: '⚠️', text: 'Use with Caution', color: 'text-caution' };
    return { emoji: '🚫', text: 'Not Recommended', color: 'text-avoid' };
  };

  const scoreMessage = getScoreMessage();
  const userConditions = userProfile?.selectedSymptoms || [];

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

          {/* Health Score Section - Enhanced */}
          <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-card text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h1 className="text-2xl font-bold mb-2">{t.healthScoreFor}</h1>
              <p className={`text-lg font-semibold ${scoreMessage.color} flex items-center justify-center gap-2`}>
                <span className="text-2xl">{scoreMessage.emoji}</span>
                {scoreMessage.text}
              </p>
              
              <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12 mt-6">
                <HealthScoreGauge score={result.healthScore} size="lg" />
                
                {/* Enhanced Bar Chart */}
                <div className="w-full max-w-xs h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        width={90}
                        tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 500 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                        formatter={(value) => [`${value} items`, 'Count']}
                      />
                      <Bar dataKey="count" radius={[0, 8, 8, 0]} animationDuration={1000}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick Health Icons Legend */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <HealthIconBadge iconInfo={healthIconsMap.heart} showEmoji size="sm" showLabel />
                <HealthIconBadge iconInfo={healthIconsMap.brain} showEmoji size="sm" showLabel />
                <HealthIconBadge iconInfo={healthIconsMap.bones} showEmoji size="sm" showLabel />
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

          {/* Summary & Concerns - Enhanced */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* Summary */}
            <div className="rounded-2xl border border-border bg-gradient-to-br from-safe/5 to-card p-6 shadow-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-xl">✅</span>
                {t.summary}
              </h2>
              <p className="text-muted-foreground">{result.summary}</p>
            </div>

            {/* Concerns */}
            {result.concerns.length > 0 && (
              <div className="rounded-2xl border border-avoid/20 bg-gradient-to-br from-avoid/5 to-card p-6 shadow-card">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-xl">⚠️</span>
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

          {/* Daily Meal Suggestions Toggle */}
          <div className="mb-8">
            <button
              onClick={() => setShowMealSuggestions(!showMealSuggestions)}
              className="w-full rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 via-card to-accent/5 p-6 shadow-card transition-all hover:shadow-lg group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🍽️</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-foreground">Daily Safe Meal Suggestions</h3>
                    <p className="text-sm text-muted-foreground">
                      Personalized meals based on your {userConditions.length} health condition{userConditions.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className={`p-2 rounded-full bg-primary/10 transition-transform ${showMealSuggestions ? 'rotate-180' : ''}`}>
                  <ChevronDown className="h-5 w-5 text-primary" />
                </div>
              </div>
            </button>
            
            {showMealSuggestions && (
              <div className="mt-4 animate-slide-up">
                <MealSuggestions conditions={userConditions} />
              </div>
            )}
          </div>

          {/* Diet Suggestions - Enhanced */}
          <div className="mb-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-6 shadow-card relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Sparkles className="h-6 w-6 text-primary/30" />
            </div>
            
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              {t.dietSuggestions}
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* Foods to Include */}
              <div className="p-4 rounded-xl bg-safe/5 border border-safe/20">
                <h3 className="font-semibold text-safe mb-3 flex items-center gap-2">
                  <span className="text-lg">✅</span>
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
              <div className="p-4 rounded-xl bg-avoid/5 border border-avoid/20">
                <h3 className="font-semibold text-avoid mb-3 flex items-center gap-2">
                  <span className="text-lg">❌</span>
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

          {/* Action Buttons - Enhanced */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <RefreshCw className="h-5 w-5" />
              {t.scanAnother}
            </Button>
            <ShareDialog
              title="My Health Analysis"
              text={`${scoreMessage.text} - ${result.summary}`}
              score={result.healthScore}
            />
          </div>

          {/* Disclaimer - Enhanced */}
          <div className="mt-8 p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <span>ℹ️</span>
              This analysis is for educational purposes only and should not be considered medical advice.
              Always consult with healthcare professionals for dietary decisions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
