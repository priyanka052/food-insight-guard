import { Coffee, Utensils, Moon, Cookie, Heart, Bone, Brain, Flame, Droplets, Shield, Lightbulb, RefreshCw } from 'lucide-react';
import { useState, useMemo } from 'react';

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

interface MealIdea {
  name: string;
  description: string;
  emoji: string;
}

const healthIcons: Record<string, HealthIcon> = {
  heart: { icon: Heart, label: 'Heart Health', color: 'text-red-500' },
  bones: { icon: Bone, label: 'Bone Health', color: 'text-amber-600' },
  brain: { icon: Brain, label: 'Brain Function', color: 'text-purple-500' },
  inflammation: { icon: Flame, label: 'Anti-Inflammatory', color: 'text-orange-500' },
  hydration: { icon: Droplets, label: 'Hydration', color: 'text-blue-500' },
  immunity: { icon: Shield, label: 'Immunity', color: 'text-green-500' },
};

// Condition-specific meal ideas database
const conditionMealIdeas: Record<string, Record<string, MealIdea[]>> = {
  'diabetes': {
    breakfast: [
      { name: 'Veggie Egg Scramble', description: 'Eggs with spinach, tomatoes & low-GI toast', emoji: '🥚' },
      { name: 'Greek Yogurt Bowl', description: 'Plain yogurt with berries, nuts & cinnamon', emoji: '🥛' },
      { name: 'Oatmeal Power Bowl', description: 'Steel-cut oats with almonds & chia seeds', emoji: '🥣' },
      { name: 'Avocado Toast', description: 'Whole grain bread with mashed avocado & seeds', emoji: '🥑' },
      { name: 'Moong Dal Chilla', description: 'Protein-rich lentil pancakes with mint chutney', emoji: '🥞' },
    ],
    lunch: [
      { name: 'Grilled Chicken Salad', description: 'Mixed greens with lean protein & olive oil', emoji: '🥗' },
      { name: 'Quinoa Buddha Bowl', description: 'Quinoa with roasted veggies & chickpeas', emoji: '🍚' },
      { name: 'Fish Curry Light', description: 'Grilled fish with minimal oil & brown rice', emoji: '🐟' },
      { name: 'Palak Paneer', description: 'Low-fat paneer in spinach gravy with roti', emoji: '🥬' },
    ],
    dinner: [
      { name: 'Baked Salmon', description: 'Omega-3 rich fish with steamed vegetables', emoji: '🐟' },
      { name: 'Cauliflower Rice Stir-fry', description: 'Low-carb rice alternative with veggies', emoji: '🥦' },
      { name: 'Lentil Soup', description: 'Protein-rich dal with minimal spices', emoji: '🍲' },
    ],
    snacks: [
      { name: 'Handful of Almonds', description: 'Raw unsalted almonds (10-12 pieces)', emoji: '🥜' },
      { name: 'Cucumber Sticks', description: 'Fresh cucumber with hummus', emoji: '🥒' },
      { name: 'Roasted Makhana', description: 'Fox nuts roasted with minimal oil', emoji: '🍿' },
    ],
  },
  'obesity': {
    breakfast: [
      { name: 'Green Smoothie', description: 'Spinach, cucumber, apple & ginger blend', emoji: '🥬' },
      { name: 'Egg White Omelette', description: 'Fluffy whites with veggies, no oil', emoji: '🥚' },
      { name: 'Overnight Oats', description: 'Oats soaked in almond milk with berries', emoji: '🥣' },
      { name: 'Fruit Bowl', description: 'Mixed seasonal fruits with chia seeds', emoji: '🍎' },
    ],
    lunch: [
      { name: 'Large Green Salad', description: 'Leafy greens with grilled chicken & lemon', emoji: '🥗' },
      { name: 'Vegetable Soup', description: 'Clear soup with mixed vegetables', emoji: '🍲' },
      { name: 'Grilled Fish Plate', description: 'Baked fish with steamed broccoli', emoji: '🐟' },
    ],
    dinner: [
      { name: 'Steamed Vegetables', description: 'Mixed veggies with herbs, no butter', emoji: '🥦' },
      { name: 'Clear Chicken Soup', description: 'Light broth with shredded chicken', emoji: '🍲' },
      { name: 'Zucchini Noodles', description: 'Veggie noodles with tomato sauce', emoji: '🍝' },
    ],
    snacks: [
      { name: 'Celery Sticks', description: 'Fresh celery with peanut butter', emoji: '🥒' },
      { name: 'Air-Popped Popcorn', description: 'Plain popcorn without butter', emoji: '🍿' },
      { name: 'Green Apple', description: 'Sliced apple with cinnamon', emoji: '🍏' },
    ],
  },
  'high_bp': {
    breakfast: [
      { name: 'DASH Oatmeal', description: 'Oats with banana, walnuts & no added salt', emoji: '🍌' },
      { name: 'Fruit Smoothie', description: 'Banana, berries & low-fat milk blend', emoji: '🫐' },
      { name: 'Whole Wheat Toast', description: 'Toast with unsalted avocado spread', emoji: '🥑' },
    ],
    lunch: [
      { name: 'Grilled Fish', description: 'Baked fish with herbs, no salt', emoji: '🐟' },
      { name: 'Quinoa Salad', description: 'Quinoa with cucumber, tomato & lemon', emoji: '🥗' },
      { name: 'Vegetable Curry', description: 'Mixed veggies in low-sodium gravy', emoji: '🥘' },
    ],
    dinner: [
      { name: 'Steamed Salmon', description: 'Omega-3 rich fish with spinach', emoji: '🐟' },
      { name: 'Dal Tadka Light', description: 'Lentils with minimal salt & oil', emoji: '🍲' },
    ],
    snacks: [
      { name: 'Unsalted Almonds', description: 'Raw almonds without salt', emoji: '🥜' },
      { name: 'Fresh Fruits', description: 'Potassium-rich banana or orange', emoji: '🍊' },
      { name: 'Yogurt', description: 'Low-fat plain yogurt', emoji: '🥛' },
    ],
  },
  'cholesterol': {
    breakfast: [
      { name: 'Oat Bran Cereal', description: 'Soluble fiber to lower cholesterol', emoji: '🥣' },
      { name: 'Apple Slices', description: 'Fresh apple with almond butter', emoji: '🍎' },
      { name: 'Flaxseed Smoothie', description: 'Ground flax with banana & soy milk', emoji: '🥛' },
    ],
    lunch: [
      { name: 'Salmon with Olive Oil', description: 'Heart-healthy fats combo', emoji: '🐟' },
      { name: 'Bean Salad', description: 'Mixed beans with olive oil dressing', emoji: '🫘' },
    ],
    dinner: [
      { name: 'Grilled Vegetables', description: 'Roasted veggies with herbs', emoji: '🥕' },
      { name: 'Lentil Soup', description: 'Fiber-rich soup for heart health', emoji: '🍲' },
    ],
    snacks: [
      { name: 'Walnuts', description: 'Omega-3 rich nuts (handful)', emoji: '🥜' },
      { name: 'Berries', description: 'Antioxidant-rich blueberries', emoji: '🫐' },
    ],
  },
  'thyroid': {
    breakfast: [
      { name: 'Eggs with Spinach', description: 'Selenium-rich eggs with greens', emoji: '🥚' },
      { name: 'Brazil Nut Yogurt', description: 'Yogurt with 2 brazil nuts (selenium)', emoji: '🥛' },
    ],
    lunch: [
      { name: 'Lean Meat Plate', description: 'Grilled chicken with sweet potato', emoji: '🍗' },
      { name: 'Quinoa Bowl', description: 'Protein-rich grain with vegetables', emoji: '🍚' },
    ],
    dinner: [
      { name: 'Baked Chicken', description: 'Lean protein with steamed veggies', emoji: '🍗' },
      { name: 'Fish Curry', description: 'Iodine-rich fish with brown rice', emoji: '🐟' },
    ],
    snacks: [
      { name: 'Pumpkin Seeds', description: 'Zinc-rich seeds for thyroid', emoji: '🎃' },
      { name: 'Fresh Fruits', description: 'Seasonal fruits for vitamins', emoji: '🍊' },
    ],
  },
  'pcos': {
    breakfast: [
      { name: 'Greek Yogurt Parfait', description: 'Protein-rich yogurt with berries', emoji: '🥛' },
      { name: 'Flax Seed Smoothie', description: 'Anti-inflammatory flax blend', emoji: '🌾' },
    ],
    lunch: [
      { name: 'Grilled Salmon', description: 'Omega-3 for hormone balance', emoji: '🐟' },
      { name: 'Leafy Green Salad', description: 'Dark greens with olive oil', emoji: '🥬' },
    ],
    dinner: [
      { name: 'Chicken Stir-fry', description: 'Lean protein with mixed veggies', emoji: '🍗' },
      { name: 'Lentil Curry', description: 'Protein-rich dal with brown rice', emoji: '🍲' },
    ],
    snacks: [
      { name: 'Almonds', description: 'Healthy fats for hormone support', emoji: '🥜' },
      { name: 'Apple with Nut Butter', description: 'Fiber + healthy fats combo', emoji: '🍎' },
    ],
  },
  'arthritis': {
    breakfast: [
      { name: 'Turmeric Oatmeal', description: 'Anti-inflammatory golden oats', emoji: '🥣' },
      { name: 'Cherry Smoothie', description: 'Tart cherries for joint health', emoji: '🍒' },
    ],
    lunch: [
      { name: 'Salmon Salad', description: 'Omega-3 rich fish for joints', emoji: '🐟' },
      { name: 'Olive Oil Veggies', description: 'Anti-inflammatory olive oil base', emoji: '🫒' },
    ],
    dinner: [
      { name: 'Turmeric Fish Curry', description: 'Anti-inflammatory spices & omega-3', emoji: '🐟' },
      { name: 'Ginger Vegetable Soup', description: 'Warming ginger for joint relief', emoji: '🍲' },
    ],
    snacks: [
      { name: 'Walnuts', description: 'Anti-inflammatory omega-3 nuts', emoji: '🥜' },
      { name: 'Ginger Tea', description: 'Soothing tea for joints', emoji: '🍵' },
    ],
  },
};

// Combined condition meal ideas
const combinedMealIdeas: Record<string, MealIdea[]> = {
  'diabetes+obesity': [
    { name: 'Low-Carb Veggie Scramble', description: 'Egg whites with spinach, no oil frying', emoji: '🥚' },
    { name: 'Cauliflower Rice Bowl', description: 'Ultra low-carb & calorie rice alternative', emoji: '🥦' },
    { name: 'Grilled Fish Salad', description: 'Lean protein on greens with lemon', emoji: '🥗' },
  ],
  'diabetes+high_bp': [
    { name: 'No-Salt Oatmeal', description: 'Steel-cut oats with unsalted nuts', emoji: '🥣' },
    { name: 'DASH Diet Fish', description: 'Low-sodium baked salmon with herbs', emoji: '🐟' },
    { name: 'Low-GI Veggie Curry', description: 'No salt, low-carb vegetable curry', emoji: '🥘' },
  ],
  'high_bp+cholesterol': [
    { name: 'Heart-Healthy Oats', description: 'Soluble fiber oats with walnuts', emoji: '🥣' },
    { name: 'Mediterranean Salmon', description: 'Omega-3 fish with olive oil veggies', emoji: '🐟' },
    { name: 'Bean & Greens Salad', description: 'Fiber-rich beans with no salt', emoji: '🥗' },
  ],
  'obesity+thyroid': [
    { name: 'Selenium Power Bowl', description: 'Brazil nuts, eggs & low-cal veggies', emoji: '🥚' },
    { name: 'Lean Fish Plate', description: 'Iodine-rich fish with steamed greens', emoji: '🐟' },
  ],
  'diabetes+pcos': [
    { name: 'Hormone Balance Bowl', description: 'Low-GI grains with omega-3 salmon', emoji: '🐟' },
    { name: 'Flax Seed Yogurt', description: 'Greek yogurt with flax & berries', emoji: '🥛' },
  ],
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
  const [mealTypeFilter, setMealTypeFilter] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');
  const [refreshKey, setRefreshKey] = useState(0);

  const conditionMap: Record<string, string> = {
    'Hypertension': 'high_bp',
    'High BP': 'high_bp',
    'Diabetes': 'diabetes',
    'Cholesterol': 'cholesterol',
    'Obesity': 'obesity',
    'Thyroid': 'thyroid',
    'PCOS': 'pcos',
    'PCOD': 'pcos',
    'Arthritis': 'arthritis',
    'Joint Pain': 'arthritis',
  };

  // Map user conditions to internal keys
  const mappedConditions = useMemo(() => {
    return conditions
      .map(c => conditionMap[c] || c.toLowerCase().replace(/\s+/g, '_'))
      .filter(c => conditionMealIdeas[c]);
  }, [conditions]);

  // Get the most relevant meal plan based on conditions
  const getPrimaryCondition = (): string => {
    for (const condition of conditions) {
      const mapped = conditionMap[condition];
      if (mapped && mealPlansForConditions[mapped]) {
        return mapped;
      }
    }
    return 'default';
  };

  const mealPlan = mealPlansForConditions[getPrimaryCondition()];

  // Generate meal ideas based on conditions
  const generateMealIdeas = useMemo(() => {
    const ideas: MealIdea[] = [];
    
    // Check for combined conditions first
    if (mappedConditions.length >= 2) {
      const sortedConditions = [...mappedConditions].sort().join('+');
      if (combinedMealIdeas[sortedConditions]) {
        ideas.push(...combinedMealIdeas[sortedConditions]);
      }
      // Also check reverse combination
      const reverseConditions = [...mappedConditions].reverse().sort().join('+');
      if (combinedMealIdeas[reverseConditions] && reverseConditions !== sortedConditions) {
        ideas.push(...combinedMealIdeas[reverseConditions]);
      }
    }

    // Add individual condition ideas
    mappedConditions.forEach(condition => {
      const conditionIdeas = conditionMealIdeas[condition];
      if (conditionIdeas && conditionIdeas[mealTypeFilter]) {
        ideas.push(...conditionIdeas[mealTypeFilter]);
      }
    });

    // Remove duplicates and shuffle
    const uniqueIdeas = ideas.filter((idea, index, self) => 
      index === self.findIndex(i => i.name === idea.name)
    );

    // Shuffle based on refreshKey
    return uniqueIdeas.sort(() => Math.random() - 0.5).slice(0, 3);
  }, [mappedConditions, mealTypeFilter, refreshKey]);

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

  const mealTypeOptions = [
    { key: 'breakfast', label: 'Breakfast', icon: Coffee },
    { key: 'lunch', label: 'Lunch', icon: Utensils },
    { key: 'dinner', label: 'Dinner', icon: Moon },
    { key: 'snacks', label: 'Snacks', icon: Cookie },
  ] as const;

  const conditionDisplayNames = mappedConditions.map(c => {
    const entry = Object.entries(conditionMap).find(([_, v]) => v === c);
    return entry ? entry[0] : c.charAt(0).toUpperCase() + c.slice(1);
  });

  return (
    <div className="space-y-6">
      {/* Auto-Generated Meal Ideas Section */}
      {mappedConditions.length > 0 && (
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold">
                  💡 {generateMealIdeas.length} {mealTypeFilter.charAt(0).toUpperCase() + mealTypeFilter.slice(1)} Ideas
                </h2>
                <p className="text-xs text-muted-foreground">
                  For {conditionDisplayNames.join(' + ')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setRefreshKey(k => k + 1)}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              title="Get new ideas"
            >
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Meal Type Selector */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {mealTypeOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setMealTypeFilter(option.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  mealTypeFilter === option.key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                }`}
              >
                <option.icon className="h-3.5 w-3.5" />
                {option.label}
              </button>
            ))}
          </div>

          {/* Generated Meal Ideas */}
          <div className="grid gap-3">
            {generateMealIdeas.length > 0 ? (
              generateMealIdeas.map((idea, idx) => (
                <div
                  key={`${idea.name}-${refreshKey}-${idx}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <span className="text-2xl">{idea.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{idea.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{idea.description}</p>
                  </div>
                  <div className="flex gap-1">
                    {mappedConditions.slice(0, 2).map((cond, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/10 text-primary"
                      >
                        {cond.replace('_', ' ').toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No specific meal ideas available for your conditions. See general suggestions below.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Daily Safe Meals Section */}
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
    </div>
  );
}