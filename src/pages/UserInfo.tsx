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
import { ArrowRight, User } from 'lucide-react';

interface HealthCondition {
  id: string;
  titleKey: keyof typeof import('@/i18n/translations').translations.en;
  descKey: keyof typeof import('@/i18n/translations').translations.en;
}

const healthConditions: HealthCondition[] = [
  { id: 'thyroid', titleKey: 'thyroid', descKey: 'thyroidDesc' },
  { id: 'highBP', titleKey: 'highBP', descKey: 'highBPDesc' },
  { id: 'obesity', titleKey: 'obesity', descKey: 'obesityDesc' },
  { id: 'pcos', titleKey: 'pcos', descKey: 'pcosDesc' },
  { id: 'pcod', titleKey: 'pcod', descKey: 'pcodDesc' },
  { id: 'diabetes', titleKey: 'diabetes', descKey: 'diabetesDesc' },
  { id: 'cholesterol', titleKey: 'cholesterol', descKey: 'cholesterolDesc' },
  { id: 'heartDisease', titleKey: 'heartDisease', descKey: 'heartDiseaseDesc' },
  { id: 'kidneyDisease', titleKey: 'kidneyDisease', descKey: 'kidneyDiseaseDesc' },
  { id: 'liverDisease', titleKey: 'liverDisease', descKey: 'liverDiseaseDesc' },
  { id: 'glutenIntolerance', titleKey: 'glutenIntolerance', descKey: 'glutenIntoleranceDesc' },
  { id: 'lactoseIntolerance', titleKey: 'lactoseIntolerance', descKey: 'lactoseIntoleranceDesc' },
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">{t.tellUsAboutYou}</h1>
            <p className="mt-2 text-muted-foreground">{t.healthConditionsDesc}</p>
          </div>

          {/* Age Input */}
          <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-card">
            <Label htmlFor="age" className="text-lg font-semibold">{t.yourAge}</Label>
            <Input
              id="age"
              type="number"
              min="1"
              max="120"
              placeholder={t.agePlaceholder}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-3 text-lg h-12"
            />
          </div>

          {/* Health Conditions */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-foreground">{t.selectHealthConditions}</h2>
            
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {healthConditions.map((condition) => (
                <HealthConditionCard
                  key={condition.id}
                  id={condition.id}
                  title={t[condition.titleKey] as string}
                  description={t[condition.descKey] as string}
                  selected={selectedConditions.includes(condition.id)}
                  onToggle={toggleCondition}
                />
              ))}
              
              {/* Other Option */}
              <HealthConditionCard
                id="other"
                title={t.other}
                description="Add a custom condition"
                selected={showOther}
                onToggle={toggleCondition}
              />
            </div>
            
            {/* Custom Condition Input */}
            {showOther && (
              <div className="mt-4 animate-slide-up">
                <Textarea
                  placeholder={t.otherPlaceholder}
                  value={customCondition}
                  onChange={(e) => setCustomCondition(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div className="flex justify-end">
            <Button onClick={handleContinue} size="lg" className="gap-2">
              {t.continue}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
