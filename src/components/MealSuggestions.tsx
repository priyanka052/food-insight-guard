import { Coffee, Utensils, Moon, Cookie, Heart, Bone, Brain, Flame, Droplets, Shield } from 'lucide-react';

interface MealPlan {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
}

interface HealthIcon {
  icon: React.ElementType;
  label: string;
  color: string;
}

const healthIcons: Record<string, HealthIcon> = {
  heart: { icon: Heart, label: 'Heart Health', color: 'text-red-500' },
  bones: { icon: Bone, label: 'Bone Health', color: 'text-amber-600' },
  brain: { icon: Brain, label: 'Brain Function', color: 'text-purple-500' },
  inflammation: { icon: Flame, label: 'Anti-Inflammatory', color: 'text-orange-500' },
  hydration: { icon: Droplets, label: 'Hydration', color: 'text-blue-500' },
  immunity: { icon: Shield, label: 'Immunity', color: 'text-green-500' },
};

const mealPlansForConditions: Record<string, MealPlan> = {
  'high_bp': {
    breakfast: ['Oatmeal with banana 🍌', 'Whole wheat toast with avocado 🥑', 'Green tea ☕'],
    lunch: ['Grilled fish with vegetables 🐟', 'Brown rice 🍚', 'Cucumber salad 🥒'],
    dinner: ['Lentil soup (dal) 🍲', 'Steamed vegetables 🥦', 'Whole wheat roti 🫓'],
    snacks: ['Unsalted almonds 🥜', 'Fresh fruits 🍎', 'Low-fat yogurt 🥛'],
  },
  'diabetes': {
    breakfast: ['Vegetable upma 🥘', 'Boiled eggs 🥚', 'Black coffee ☕'],
    lunch: ['Grilled chicken salad 🥗', 'Quinoa bowl 🍚', 'Leafy greens 🥬'],
    dinner: ['Fish curry (light) 🐟', 'Cauliflower rice 🍚', 'Mixed vegetables 🥦'],
    snacks: ['Greek yogurt 🥛', 'Cucumber sticks 🥒', 'Roasted chickpeas 🫘'],
  },
  'cholesterol': {
    breakfast: ['Oat bran cereal 🥣', 'Apple slices 🍎', 'Almond milk 🥛'],
    lunch: ['Salmon with olive oil 🐟', 'Steamed broccoli 🥦', 'Whole grain bread 🍞'],
    dinner: ['Grilled vegetables 🥕', 'Bean soup 🍲', 'Brown rice 🍚'],
    snacks: ['Walnuts 🥜', 'Berries 🫐', 'Carrot sticks 🥕'],
  },
  'obesity': {
    breakfast: ['Egg white omelette 🥚', 'Spinach smoothie 🥬', 'Green tea ☕'],
    lunch: ['Grilled chicken breast 🍗', 'Large salad 🥗', 'Lemon water 🍋'],
    dinner: ['Baked fish 🐟', 'Steamed vegetables 🥦', 'Clear soup 🍲'],
    snacks: ['Celery sticks 🥒', 'Air-popped popcorn 🍿', 'Green apple 🍏'],
  },
  'thyroid': {
    breakfast: ['Eggs with spinach 🥚', 'Whole grain toast 🍞', 'Brazil nuts 🥜'],
    lunch: ['Lean meat with veggies 🍖', 'Sweet potato 🍠', 'Salad 🥗'],
    dinner: ['Baked chicken 🍗', 'Quinoa 🍚', 'Steamed vegetables 🥦'],
    snacks: ['Pumpkin seeds 🎃', 'Yogurt 🥛', 'Fresh fruits 🍊'],
  },
  'pcos': {
    breakfast: ['Greek yogurt parfait 🥛', 'Berries 🫐', 'Flax seeds 🌾'],
    lunch: ['Grilled salmon 🐟', 'Leafy greens 🥬', 'Olive oil dressing 🫒'],
    dinner: ['Chicken stir-fry 🍗', 'Brown rice 🍚', 'Mixed vegetables 🥦'],
    snacks: ['Almonds 🥜', 'Apple slices 🍎', 'Hummus with veggies 🥕'],
  },
  'default': {
    breakfast: ['Whole grain cereal 🥣', 'Fresh fruits 🍎', 'Milk/Yogurt 🥛'],
    lunch: ['Balanced thali 🍛', 'Dal & vegetables 🥘', 'Roti/Rice 🍚'],
    dinner: ['Light soup 🍲', 'Grilled protein 🍗', 'Salad 🥗'],
    snacks: ['Nuts 🥜', 'Fruits 🍊', 'Sprouts 🌱'],
  },
};

interface MealSuggestionsProps {
  conditions: string[];
}

export function MealSuggestions({ conditions }: MealSuggestionsProps) {
  // Get the most relevant meal plan based on conditions
  const getPrimaryCondition = (): string => {
    const conditionMap: Record<string, string> = {
      'Hypertension': 'high_bp',
      'High BP': 'high_bp',
      'Diabetes': 'diabetes',
      'Cholesterol': 'cholesterol',
      'Obesity': 'obesity',
      'Thyroid': 'thyroid',
      'PCOS': 'pcos',
      'PCOD': 'pcos',
    };
    
    for (const condition of conditions) {
      const mapped = conditionMap[condition];
      if (mapped && mealPlansForConditions[mapped]) {
        return mapped;
      }
    }
    return 'default';
  };

  const mealPlan = mealPlansForConditions[getPrimaryCondition()];

  // Get relevant health icons based on conditions
  const getRelevantIcons = (): HealthIcon[] => {
    const icons: HealthIcon[] = [];
    if (conditions.some(c => c.toLowerCase().includes('bp') || c.toLowerCase().includes('hypertension'))) {
      icons.push(healthIcons.heart);
    }
    if (conditions.some(c => c.toLowerCase().includes('arthritis') || c.toLowerCase().includes('joint'))) {
      icons.push(healthIcons.bones);
    }
    if (conditions.some(c => c.toLowerCase().includes('dementia') || c.toLowerCase().includes('memory'))) {
      icons.push(healthIcons.brain);
    }
    if (conditions.some(c => c.toLowerCase().includes('inflammation') || c.toLowerCase().includes('arthritis'))) {
      icons.push(healthIcons.inflammation);
    }
    if (icons.length === 0) {
      icons.push(healthIcons.heart, healthIcons.immunity);
    }
    return icons;
  };

  const relevantIcons = getRelevantIcons();

  const mealSections = [
    { key: 'breakfast', title: 'Breakfast', icon: Coffee, items: mealPlan.breakfast, gradient: 'from-amber-500/10 to-orange-500/10' },
    { key: 'lunch', title: 'Lunch', icon: Utensils, items: mealPlan.lunch, gradient: 'from-green-500/10 to-emerald-500/10' },
    { key: 'dinner', title: 'Dinner', icon: Moon, items: mealPlan.dinner, gradient: 'from-indigo-500/10 to-purple-500/10' },
    { key: 'snacks', title: 'Snacks', icon: Cookie, items: mealPlan.snacks, gradient: 'from-pink-500/10 to-rose-500/10' },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      {/* Header with health icons */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          🥗 Daily Safe Meals
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Personalized meal suggestions for your health conditions
        </p>
        
        {/* Health Icons Legend */}
        <div className="flex flex-wrap gap-3">
          {relevantIcons.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50"
            >
              <item.icon className={`h-4 w-4 ${item.color}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {mealSections.map((section) => (
          <div 
            key={section.key}
            className={`rounded-xl p-4 bg-gradient-to-br ${section.gradient} border border-border/50`}
          >
            <div className="flex items-center gap-2 mb-3">
              <section.icon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{section.title}</h3>
            </div>
            <ul className="space-y-1.5">
              {section.items.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Quick Health Tips */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
          💡 Quick Tips
        </h4>
        <div className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <Heart className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
            <span>Reduce salt for heart health</span>
          </div>
          <div className="flex items-start gap-2">
            <Droplets className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
            <span>Drink 8 glasses of water daily</span>
          </div>
          <div className="flex items-start gap-2">
            <Brain className="h-3.5 w-3.5 text-purple-500 mt-0.5 shrink-0" />
            <span>Include omega-3 for brain</span>
          </div>
          <div className="flex items-start gap-2">
            <Bone className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
            <span>Calcium & Vitamin D for bones</span>
          </div>
        </div>
      </div>
    </div>
  );
}
