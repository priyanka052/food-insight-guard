import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChefHat, 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Timer, 
  CheckCircle2,
  ArrowLeft,
  Utensils
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface CookingStep {
  instruction: string;
  duration?: number; // in seconds
  emoji: string;
}

interface Recipe {
  name: string;
  emoji: string;
  description: string;
  totalTime: string;
  difficulty: 'Easy' | 'Medium';
  steps: CookingStep[];
}

// Health-conscious recipes database
const healthyRecipes: Record<string, Recipe[]> = {
  breakfast: [
    {
      name: 'Vegetable Omelette',
      emoji: '🥚',
      description: 'Protein-rich eggs with fresh vegetables',
      totalTime: '10 mins',
      difficulty: 'Easy',
      steps: [
        { instruction: 'Crack 2 eggs into a bowl and beat well', emoji: '🥚', duration: 30 },
        { instruction: 'Add a pinch of salt and pepper', emoji: '🧂', duration: 10 },
        { instruction: 'Chop vegetables: tomato, onion, spinach', emoji: '🍅', duration: 60 },
        { instruction: 'Heat a non-stick pan with 1 teaspoon oil', emoji: '🍳', duration: 30 },
        { instruction: 'Pour the beaten eggs into the pan', emoji: '🥚', duration: 10 },
        { instruction: 'Add chopped vegetables on top', emoji: '🥬', duration: 15 },
        { instruction: 'Cook on low heat for 2 minutes', emoji: '⏱️', duration: 120 },
        { instruction: 'Fold the omelette in half', emoji: '🍳', duration: 10 },
        { instruction: 'Cook for 1 more minute', emoji: '⏱️', duration: 60 },
        { instruction: 'Turn off the stove. Your omelette is ready!', emoji: '✅', duration: 10 },
      ],
    },
    {
      name: 'Healthy Oatmeal',
      emoji: '🥣',
      description: 'Fiber-rich oats with fruits and nuts',
      totalTime: '8 mins',
      difficulty: 'Easy',
      steps: [
        { instruction: 'Take half cup of rolled oats', emoji: '🥣', duration: 15 },
        { instruction: 'Add 1 cup of water or milk', emoji: '🥛', duration: 10 },
        { instruction: 'Place on stove on medium heat', emoji: '🔥', duration: 15 },
        { instruction: 'Stir occasionally. Cook for 5 minutes', emoji: '🥄', duration: 300 },
        { instruction: 'Add sliced banana and berries', emoji: '🍌', duration: 30 },
        { instruction: 'Sprinkle some almonds on top', emoji: '🥜', duration: 15 },
        { instruction: 'Add a drizzle of honey if desired', emoji: '🍯', duration: 15 },
        { instruction: 'Turn off stove. Enjoy your healthy oatmeal!', emoji: '✅', duration: 10 },
      ],
    },
  ],
  lunch: [
    {
      name: 'Simple Dal Tadka',
      emoji: '🍲',
      description: 'Protein-rich lentils with mild spices',
      totalTime: '25 mins',
      difficulty: 'Easy',
      steps: [
        { instruction: 'Wash 1 cup of yellow dal thoroughly', emoji: '🫘', duration: 60 },
        { instruction: 'Add dal to pressure cooker with 3 cups water', emoji: '🍲', duration: 30 },
        { instruction: 'Add turmeric and salt. Close the lid', emoji: '🧂', duration: 15 },
        { instruction: 'Cook for 3 whistles on medium heat', emoji: '⏱️', duration: 300 },
        { instruction: 'Let pressure release naturally', emoji: '💨', duration: 120 },
        { instruction: 'In a small pan, heat 1 teaspoon ghee', emoji: '🍳', duration: 30 },
        { instruction: 'Add cumin seeds and let them splutter', emoji: '🌰', duration: 20 },
        { instruction: 'Add chopped garlic and cook briefly', emoji: '🧄', duration: 30 },
        { instruction: 'Pour this tadka over the cooked dal', emoji: '🍲', duration: 10 },
        { instruction: 'Mix well. Turn off stove. Dal is ready!', emoji: '✅', duration: 15 },
      ],
    },
    {
      name: 'Vegetable Stir-Fry',
      emoji: '🥦',
      description: 'Quick healthy mixed vegetables',
      totalTime: '15 mins',
      difficulty: 'Easy',
      steps: [
        { instruction: 'Chop broccoli, carrots, and bell peppers', emoji: '🥕', duration: 120 },
        { instruction: 'Heat a pan with 1 tablespoon olive oil', emoji: '🫒', duration: 30 },
        { instruction: 'Add vegetables to the hot pan', emoji: '🥦', duration: 15 },
        { instruction: 'Stir-fry on high heat for 3 minutes', emoji: '🥄', duration: 180 },
        { instruction: 'Add a splash of soy sauce', emoji: '🥢', duration: 10 },
        { instruction: 'Toss well and cook for 2 more minutes', emoji: '⏱️', duration: 120 },
        { instruction: 'Season with salt and pepper', emoji: '🧂', duration: 15 },
        { instruction: 'Turn off stove. Serve hot!', emoji: '✅', duration: 10 },
      ],
    },
  ],
  dinner: [
    {
      name: 'Grilled Fish',
      emoji: '🐟',
      description: 'Omega-3 rich fish with lemon',
      totalTime: '20 mins',
      difficulty: 'Easy',
      steps: [
        { instruction: 'Pat dry the fish fillet with paper towel', emoji: '🐟', duration: 30 },
        { instruction: 'Season with salt, pepper, and lemon juice', emoji: '🍋', duration: 30 },
        { instruction: 'Add a little olive oil on both sides', emoji: '🫒', duration: 20 },
        { instruction: 'Heat a grill pan on medium-high heat', emoji: '🍳', duration: 60 },
        { instruction: 'Place fish on the pan. Do not move it', emoji: '🐟', duration: 10 },
        { instruction: 'Cook for 4 minutes on first side', emoji: '⏱️', duration: 240 },
        { instruction: 'Carefully flip the fish', emoji: '🔄', duration: 15 },
        { instruction: 'Cook for 3 more minutes', emoji: '⏱️', duration: 180 },
        { instruction: 'Turn off stove. Let it rest for 1 minute', emoji: '⏱️', duration: 60 },
        { instruction: 'Serve with steamed vegetables. Enjoy!', emoji: '✅', duration: 10 },
      ],
    },
    {
      name: 'Vegetable Soup',
      emoji: '🍵',
      description: 'Warm and comforting clear soup',
      totalTime: '20 mins',
      difficulty: 'Easy',
      steps: [
        { instruction: 'Chop carrots, beans, and cabbage finely', emoji: '🥕', duration: 120 },
        { instruction: 'Boil 4 cups of water in a pot', emoji: '🍲', duration: 120 },
        { instruction: 'Add all vegetables to the boiling water', emoji: '🥬', duration: 15 },
        { instruction: 'Add salt and a pinch of pepper', emoji: '🧂', duration: 10 },
        { instruction: 'Let it simmer for 10 minutes on low heat', emoji: '⏱️', duration: 600 },
        { instruction: 'Add some fresh herbs like coriander', emoji: '🌿', duration: 20 },
        { instruction: 'Turn off stove. Pour into a bowl', emoji: '🥣', duration: 15 },
        { instruction: 'Your healthy soup is ready!', emoji: '✅', duration: 10 },
      ],
    },
  ],
  snacks: [
    {
      name: 'Roasted Makhana',
      emoji: '🍿',
      description: 'Healthy fox nuts snack',
      totalTime: '8 mins',
      difficulty: 'Easy',
      steps: [
        { instruction: 'Take 2 cups of makhana (fox nuts)', emoji: '🍿', duration: 15 },
        { instruction: 'Heat a pan on low flame', emoji: '🍳', duration: 30 },
        { instruction: 'Add makhana without any oil', emoji: '🍿', duration: 10 },
        { instruction: 'Roast for 5 minutes, stirring constantly', emoji: '🥄', duration: 300 },
        { instruction: 'Makhana should become crispy and light', emoji: '✨', duration: 10 },
        { instruction: 'Add a pinch of salt and black pepper', emoji: '🧂', duration: 15 },
        { instruction: 'Turn off stove. Let it cool slightly', emoji: '❄️', duration: 60 },
        { instruction: 'Your healthy snack is ready!', emoji: '✅', duration: 10 },
      ],
    },
  ],
};

interface CompanionCookingModeProps {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  onClose: () => void;
}

export function CompanionCookingMode({ mealType, onClose }: CompanionCookingModeProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const recipes = healthyRecipes[mealType] || [];

  // Text-to-speech function using Web Speech API
  const speak = useCallback((text: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to get a good voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female')) ||
                         voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }, [isMuted]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            speak('Time is up! Move to the next step.');
            toast.success('Timer complete! ⏰');
            return 0;
          }
          // Announce at 30 seconds, 10 seconds
          if (prev === 30) speak('30 seconds remaining');
          if (prev === 10) speak('10 seconds remaining');
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timer, speak]);

  // Auto-speak current step
  useEffect(() => {
    if (isPlaying && selectedRecipe && currentStep < selectedRecipe.steps.length) {
      const step = selectedRecipe.steps[currentStep];
      speak(step.instruction);
    }
  }, [currentStep, isPlaying, selectedRecipe, speak]);

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPlaying(false);
    speak(`Let's cook ${recipe.name}. Press play when you're ready.`);
  };

  const handlePlayPause = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (selectedRecipe) {
        speak(selectedRecipe.steps[currentStep].instruction);
      }
    } else {
      setIsPlaying(false);
      window.speechSynthesis.cancel();
    }
  };

  const handleNextStep = () => {
    if (!selectedRecipe) return;
    
    // Mark current step as complete
    setCompletedSteps(prev => [...prev, currentStep]);
    setTimerActive(false);
    
    if (currentStep < selectedRecipe.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      const nextStep = selectedRecipe.steps[currentStep + 1];
      if (nextStep.duration && nextStep.duration > 30) {
        setTimer(nextStep.duration);
      }
    } else {
      speak('Congratulations! You have finished cooking. Enjoy your healthy meal!');
      toast.success('🎉 Cooking complete! Enjoy your meal!');
    }
  };

  const handleStartTimer = () => {
    if (!selectedRecipe) return;
    const step = selectedRecipe.steps[currentStep];
    if (step.duration) {
      setTimer(step.duration);
      setTimerActive(true);
      speak(`Timer started for ${Math.floor(step.duration / 60)} minutes and ${step.duration % 60} seconds.`);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = selectedRecipe 
    ? (completedSteps.length / selectedRecipe.steps.length) * 100 
    : 0;

  // Recipe selection view
  if (!selectedRecipe) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Companion Cooking Mode</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          🎙️ Select a recipe and I'll guide you step-by-step with voice instructions!
        </p>

        <div className="grid gap-3">
          {recipes.map((recipe, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-md"
              onClick={() => handleSelectRecipe(recipe)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{recipe.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-medium">{recipe.name}</h4>
                    <p className="text-sm text-muted-foreground">{recipe.description}</p>
                    <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                      <span>⏱️ {recipe.totalTime}</span>
                      <span>📊 {recipe.difficulty}</span>
                      <span>📝 {recipe.steps.length} steps</span>
                    </div>
                  </div>
                  <Utensils className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Cooking guide view
  const currentStepData = selectedRecipe.steps[currentStep];
  const isLastStep = currentStep === selectedRecipe.steps.length - 1;
  const isComplete = completedSteps.length === selectedRecipe.steps.length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{selectedRecipe.emoji}</span>
          <div>
            <h3 className="font-semibold">{selectedRecipe.name}</h3>
            <p className="text-xs text-muted-foreground">
              Step {currentStep + 1} of {selectedRecipe.steps.length}
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSelectedRecipe(null)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Recipes
        </Button>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground text-center">
          {Math.round(progress)}% complete
        </p>
      </div>

      {/* Current Step */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
        <CardContent className="p-6 text-center">
          <span className="text-4xl mb-4 block">{currentStepData.emoji}</span>
          <p className="text-lg font-medium leading-relaxed">
            {currentStepData.instruction}
          </p>
          
          {/* Timer Display */}
          {timerActive && (
            <div className="mt-4 p-4 rounded-xl bg-background/80 border border-border">
              <div className="text-3xl font-mono font-bold text-primary">
                {formatTime(timer)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Timer running...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className={isMuted ? 'text-danger' : ''}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>

        <Button
          size="lg"
          onClick={handlePlayPause}
          className="gap-2 min-w-[120px]"
        >
          {isPlaying ? (
            <>
              <Pause className="h-5 w-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              Play
            </>
          )}
        </Button>

        {currentStepData.duration && currentStepData.duration > 30 && !timerActive && (
          <Button
            variant="outline"
            onClick={handleStartTimer}
            className="gap-2"
          >
            <Timer className="h-5 w-5" />
            Start Timer
          </Button>
        )}

        <Button
          variant={isLastStep && !isComplete ? 'default' : 'outline'}
          onClick={handleNextStep}
          disabled={isComplete}
          className="gap-2"
        >
          {isComplete ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-safe" />
              Done!
            </>
          ) : (
            <>
              <SkipForward className="h-5 w-5" />
              {isLastStep ? 'Finish' : 'Next'}
            </>
          )}
        </Button>
      </div>

      {/* Step List */}
      <div className="max-h-40 overflow-y-auto space-y-2 p-2 rounded-lg bg-muted/30">
        {selectedRecipe.steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all ${
              index === currentStep 
                ? 'bg-primary/10 border border-primary/30' 
                : completedSteps.includes(index)
                  ? 'text-muted-foreground line-through'
                  : 'text-muted-foreground'
            }`}
          >
            {completedSteps.includes(index) ? (
              <CheckCircle2 className="h-4 w-4 text-safe flex-shrink-0" />
            ) : (
              <span className="w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">
                {index + 1}
              </span>
            )}
            <span className="truncate">{step.instruction}</span>
          </div>
        ))}
      </div>

      {/* Voice Info */}
      <p className="text-xs text-center text-muted-foreground">
        🔊 {isMuted ? 'Voice is muted' : 'Voice guidance is active'}
      </p>
    </div>
  );
}
