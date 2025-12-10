import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { HealthScoreGauge } from '@/components/HealthScoreGauge';
import { HistoryAnalytics } from '@/components/HistoryAnalytics';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Clock, ChevronRight } from 'lucide-react';
import { analyzeIngredients } from '@/utils/healthAnalyzer';

export default function History() {
  const { t, history, clearHistory, userProfile } = useApp();
  const navigate = useNavigate();

  const handleViewDetails = (item: typeof history[0]) => {
    if (!userProfile) return;
    
    const result = analyzeIngredients(item.ingredients, item.symptoms);
    navigate('/results', { state: { result, ingredients: item.ingredients } });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-foreground">{t.history}</h1>
            </div>
            
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm('Clear all history?')) {
                    clearHistory();
                  }
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          {/* Analytics Section */}
          <HistoryAnalytics />

          {/* History List */}
          {history.length === 0 ? (
            <div className="text-center py-16">
              <Clock className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-lg text-muted-foreground">{t.noHistory}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => navigate('/dashboard')}
              >
                Start Scanning
              </Button>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">📋 Scan History</h3>
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleViewDetails(item)}
                  className="w-full rounded-2xl border border-border bg-card p-4 shadow-card transition-all duration-200 hover:shadow-lg hover:border-primary/30 text-left"
                >
                  <div className="flex items-center gap-4">
                    <HealthScoreGauge score={item.healthScore} size="sm" />
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground mb-1 truncate">
                        {item.ingredients.slice(0, 3).join(', ')}
                        {item.ingredients.length > 3 && ` +${item.ingredients.length - 3} more`}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {item.summary}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(item.timestamp)}
                      </p>
                    </div>
                    
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
