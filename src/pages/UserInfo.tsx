import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { HealthConditionCard } from '@/components/HealthConditionCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight, User, Heart, Activity, Sparkles, Shield } from 'lucide-react';

interface HealthCondition {
  id: string;
  titleKey: keyof typeof import('@/i18n/translations').translations.en;
  descKey: keyof typeof import('@/i18n/translations').translations.en;
  emoji: string;
}

const healthConditions: HealthCondition[] = [
  { id: 'thyroid', titleKey: 'thyroid', descKey: 'thyroidDesc', emoji: '🦋' },
  { id: 'highBP', titleKey: 'highBP', descKey: 'highBPDesc', emoji: '❤️' },
  { id: 'obesity', titleKey: 'obesity', descKey: 'obesityDesc', emoji: '⚖️' },
  { id: 'pcos', titleKey: 'pcos', descKey: 'pcosDesc', emoji: '🌸' },
  { id: 'pcod', titleKey: 'pcod', descKey: 'pcodDesc', emoji: '💮' },
  { id: 'diabetes', titleKey: 'diabetes', descKey: 'diabetesDesc', emoji: '🩸' },
  { id: 'cholesterol', titleKey: 'cholesterol', descKey: 'cholesterolDesc', emoji: '🫀' },
  { id: 'heartDisease', titleKey: 'heartDisease', descKey: 'heartDiseaseDesc', emoji: '💗' },
  { id: 'kidneyDisease', titleKey: 'kidneyDisease', descKey: 'kidneyDiseaseDesc', emoji: '🫘' },
  { id: 'liverDisease', titleKey: 'liverDisease', descKey: 'liverDiseaseDesc', emoji: '🫁' },
  { id: 'glutenIntolerance', titleKey: 'glutenIntolerance', descKey: 'glutenIntoleranceDesc', emoji: '🌾' },
  { id: 'lactoseIntolerance', titleKey: 'lactoseIntolerance', descKey: 'lactoseIntoleranceDesc', emoji: '🥛' },
];

export default function UserInfo() {
  const { t, setUserProfile } = useApp();
  const navigate = useNavigate();
  
  const [age, setAge] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [customCondition, setCustomCondition] = useState('');
  const [showOther, setShowOther] = useState(false);

  const toggleCondition = (id: string) => {
    if (id === 'other') {
      setShowOther(!showOther);
      return;
    }
    
    setSelectedConditions(prev => 
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    const ageNum = parseInt(age);
    
    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      toast.error(t.invalidAge);
      return;
    }

    if (selectedConditions.length === 0 && !customCondition.trim()) {
      toast.error(t.selectAtLeastOne);
      return;
    }

    setUserProfile({
      age: ageNum,
      selectedSymptoms: selectedConditions,
      customSymptoms: customCondition.trim(),
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-10 text-center relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-3">
                <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center shadow-lg animate-float">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
                <Sparkles className="h-8 w-8 text-primary" />
                {t.tellUsAboutYou}
                <Sparkles className="h-8 w-8 text-primary" />
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                {t.healthConditionsDesc}
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                1
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:inline">Your Info</span>
            </div>
            <div className="w-12 h-1 bg-muted rounded-full" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                2
              </div>
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Scan</span>
            </div>
            <div className="w-12 h-1 bg-muted rounded-full" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                3
              </div>
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Results</span>
            </div>
          </div>

          {/* Age Input - Enhanced */}
          <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative flex items-start gap-4">
              <div className="shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <Label htmlFor="age" className="text-xl font-bold flex items-center gap-2">
                  🎂 {t.yourAge}
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  This helps us provide age-appropriate recommendations
                </p>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  placeholder={t.agePlaceholder}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="text-lg h-14 max-w-xs font-semibold border-2 focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Health Conditions - Enhanced */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-avoid/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-avoid" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{t.selectHealthConditions}</h2>
                <p className="text-sm text-muted-foreground">Select all that apply to you</p>
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {healthConditions.map((condition) => (
                <button
                  key={condition.id}
                  onClick={() => toggleCondition(condition.id)}
                  className={`group relative p-5 rounded-2xl border-2 text-left transition-all duration-300 transform hover:scale-[1.02] ${
                    selectedConditions.includes(condition.id)
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  {/* Selection indicator */}
                  <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedConditions.includes(condition.id)
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground/30'
                  }`}>
                    {selectedConditions.includes(condition.id) && (
                      <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{condition.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t[condition.titleKey] as string}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {t[condition.descKey] as string}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
              
              {/* Other Option - Enhanced */}
              <button
                onClick={() => toggleCondition('other')}
                className={`group relative p-5 rounded-2xl border-2 border-dashed text-left transition-all duration-300 ${
                  showOther
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">➕</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.other}</h3>
                    <p className="text-sm text-muted-foreground">Add a custom condition</p>
                  </div>
                </div>
              </button>
            </div>
            
            {/* Custom Condition Input - Enhanced */}
            {showOther && (
              <div className="mt-6 p-6 rounded-2xl bg-muted/30 border border-border animate-slide-up">
                <Label className="text-sm font-medium mb-2 block">Describe your condition</Label>
                <Textarea
                  placeholder={t.otherPlaceholder}
                  value={customCondition}
                  onChange={(e) => setCustomCondition(e.target.value)}
                  className="min-h-[120px] resize-none border-2 focus:border-primary transition-colors"
                />
              </div>
            )}
          </div>

          {/* Selected Summary */}
          {selectedConditions.length > 0 && (
            <div className="mb-8 p-4 rounded-xl bg-safe/5 border border-safe/20 animate-fade-in">
              <div className="flex items-center gap-2 text-safe">
                <Shield className="h-5 w-5" />
                <span className="font-medium">
                  {selectedConditions.length} condition{selectedConditions.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedConditions.map(id => {
                  const condition = healthConditions.find(c => c.id === id);
                  return (
                    <span key={id} className="px-3 py-1 rounded-full bg-safe/10 text-safe text-sm">
                      {condition?.emoji} {condition ? t[condition.titleKey] as string : id}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Continue Button - Enhanced */}
          <div className="flex justify-center">
            <Button 
              onClick={handleContinue} 
              size="xl" 
              className="gap-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-12"
            >
              <span>{t.continue}</span>
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
