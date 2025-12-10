import { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { HealthScoreGauge } from '@/components/HealthScoreGauge';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  AlertTriangle,
  GitCompare,
  Calendar,
  X,
  Check
} from 'lucide-react';

interface HistoryItem {
  id: string;
  timestamp: Date;
  ingredients: string[];
  healthScore: number;
  symptoms: string[];
  summary: string;
}

export function HistoryAnalytics() {
  const { history } = useApp();
  const [compareMode, setCompareMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Calculate monthly analytics
  const monthlyReport = useMemo(() => {
    if (history.length === 0) return null;

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyItems = history.filter(item => item.timestamp >= monthStart);

    if (monthlyItems.length === 0) return null;

    // Best and worst products
    const sortedByScore = [...monthlyItems].sort((a, b) => b.healthScore - a.healthScore);
    const bestProduct = sortedByScore[0];
    const worstProduct = sortedByScore[sortedByScore.length - 1];

    // Average score
    const avgScore = Math.round(
      monthlyItems.reduce((sum, item) => sum + item.healthScore, 0) / monthlyItems.length
    );

    // Score trend (compare first half vs second half of month)
    const midpoint = Math.floor(monthlyItems.length / 2);
    const firstHalf = monthlyItems.slice(midpoint);
    const secondHalf = monthlyItems.slice(0, midpoint);
    
    const firstAvg = firstHalf.length > 0 
      ? firstHalf.reduce((sum, item) => sum + item.healthScore, 0) / firstHalf.length 
      : 0;
    const secondAvg = secondHalf.length > 0 
      ? secondHalf.reduce((sum, item) => sum + item.healthScore, 0) / secondHalf.length 
      : 0;
    const trend = secondAvg - firstAvg;

    // Top risky ingredients
    const ingredientCounts: Record<string, number> = {};
    monthlyItems.forEach(item => {
      item.ingredients.forEach(ing => {
        ingredientCounts[ing] = (ingredientCounts[ing] || 0) + 1;
      });
    });
    
    const topRepeated = Object.entries(ingredientCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      totalScans: monthlyItems.length,
      bestProduct,
      worstProduct,
      avgScore,
      trend,
      topRepeated,
    };
  }, [history]);

  // Handle item selection for comparison
  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(prev => prev.filter(i => i !== id));
    } else if (selectedItems.length < 2) {
      setSelectedItems(prev => [...prev, id]);
    }
  };

  // Get selected items for comparison
  const comparisonItems = useMemo(() => {
    return history.filter(item => selectedItems.includes(item.id));
  }, [history, selectedItems]);

  // Find common ingredients between compared items
  const commonIngredients = useMemo(() => {
    if (comparisonItems.length !== 2) return [];
    const set1 = new Set(comparisonItems[0].ingredients.map(i => i.toLowerCase()));
    return comparisonItems[1].ingredients.filter(i => set1.has(i.toLowerCase()));
  }, [comparisonItems]);

  if (history.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Monthly Health Report */}
      {monthlyReport && (
        <div className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-primary/10">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">📊 Monthly Health Report</h3>
              <p className="text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 inline mr-1" />
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Scans */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Total Scans</p>
              <p className="text-2xl font-bold text-foreground">{monthlyReport.totalScans}</p>
            </div>

            {/* Average Score */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Average Score</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-foreground">{monthlyReport.avgScore}%</p>
                {monthlyReport.trend !== 0 && (
                  <span className={`flex items-center text-xs ${monthlyReport.trend > 0 ? 'text-safe' : 'text-avoid'}`}>
                    {monthlyReport.trend > 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {Math.abs(Math.round(monthlyReport.trend))}%
                  </span>
                )}
              </div>
            </div>

            {/* Best Product */}
            <div className="p-4 rounded-xl bg-safe/5 border border-safe/20">
              <div className="flex items-center gap-1 mb-1">
                <Award className="h-3 w-3 text-safe" />
                <p className="text-xs text-safe">Best Product</p>
              </div>
              <p className="text-sm font-medium text-foreground truncate">
                {monthlyReport.bestProduct.ingredients.slice(0, 2).join(', ')}
              </p>
              <p className="text-lg font-bold text-safe">{monthlyReport.bestProduct.healthScore}%</p>
            </div>

            {/* Worst Product */}
            <div className="p-4 rounded-xl bg-avoid/5 border border-avoid/20">
              <div className="flex items-center gap-1 mb-1">
                <AlertTriangle className="h-3 w-3 text-avoid" />
                <p className="text-xs text-avoid">Needs Attention</p>
              </div>
              <p className="text-sm font-medium text-foreground truncate">
                {monthlyReport.worstProduct.ingredients.slice(0, 2).join(', ')}
              </p>
              <p className="text-lg font-bold text-avoid">{monthlyReport.worstProduct.healthScore}%</p>
            </div>
          </div>

          {/* Top Repeated Ingredients */}
          {monthlyReport.topRepeated.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-caution/5 border border-caution/20">
              <p className="text-xs text-caution mb-2 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Most Scanned Ingredients
              </p>
              <div className="flex flex-wrap gap-2">
                {monthlyReport.topRepeated.map(([ingredient, count]) => (
                  <span 
                    key={ingredient}
                    className="px-3 py-1 rounded-full bg-caution/10 text-sm text-foreground"
                  >
                    {ingredient} <span className="text-muted-foreground">×{count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compare Products Button */}
      {history.length >= 2 && (
        <div className="flex items-center justify-between">
          <Button
            variant={compareMode ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setCompareMode(!compareMode);
              setSelectedItems([]);
            }}
            className="gap-2"
          >
            <GitCompare className="h-4 w-4" />
            {compareMode ? 'Exit Compare Mode' : 'Compare Products'}
          </Button>
          
          {compareMode && (
            <p className="text-sm text-muted-foreground">
              Select 2 products to compare ({selectedItems.length}/2)
            </p>
          )}
        </div>
      )}

      {/* Comparison View */}
      {compareMode && comparisonItems.length === 2 && (
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card p-6 shadow-card animate-slide-up">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-primary" />
            Side-by-Side Comparison
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {comparisonItems.map((item, index) => (
              <div key={item.id} className="space-y-4">
                <div className="text-center">
                  <HealthScoreGauge score={item.healthScore} size="sm" />
                  <p className="mt-2 text-sm font-medium text-foreground">
                    Product {index + 1}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </div>

                {/* Ingredients */}
                <div className="p-3 rounded-xl bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Ingredients ({item.ingredients.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {item.ingredients.slice(0, 8).map((ing, i) => (
                      <span 
                        key={i}
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          commonIngredients.includes(ing) 
                            ? 'bg-primary/20 text-primary font-medium' 
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 8 && (
                      <span className="px-2 py-0.5 text-xs text-muted-foreground">
                        +{item.ingredients.length - 8} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Risk Flags */}
                <div className="p-3 rounded-xl bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Conditions</p>
                  <div className="flex flex-wrap gap-1">
                    {item.symptoms.slice(0, 4).map((symptom, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-avoid/10 text-avoid text-xs"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Common Ingredients */}
          {commonIngredients.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm font-medium text-primary mb-2">
                🔗 Common Ingredients ({commonIngredients.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {commonIngredients.map((ing, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedItems([])}
            className="mt-4"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Comparison
          </Button>
        </div>
      )}

      {/* Selectable History List (when in compare mode) */}
      {compareMode && (
        <div className="space-y-2">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItemSelection(item.id)}
              disabled={selectedItems.length >= 2 && !selectedItems.includes(item.id)}
              className={`w-full rounded-xl border p-3 text-left transition-all ${
                selectedItems.includes(item.id)
                  ? 'border-primary bg-primary/5'
                  : selectedItems.length >= 2
                    ? 'border-border bg-muted/30 opacity-50 cursor-not-allowed'
                    : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedItems.includes(item.id) 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground'
                }`}>
                  {selectedItems.includes(item.id) && (
                    <Check className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.ingredients.slice(0, 3).join(', ')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Score: {item.healthScore}%
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
