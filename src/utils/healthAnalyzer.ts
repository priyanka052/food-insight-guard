import { ingredientDatabase, conditionTags, dietSuggestions, IngredientInfo } from '@/data/ingredientDatabase';

export type RiskLevel = 'safe' | 'caution' | 'avoid';

export interface AnalyzedIngredient {
  name: string;
  originalName: string;
  found: boolean;
  info: IngredientInfo | null;
  riskLevel: RiskLevel;
  matchedTags: string[];
}

export interface AnalysisResult {
  ingredients: AnalyzedIngredient[];
  healthScore: number;
  summary: string;
  concerns: string[];
  suggestions: {
    include: string[];
    avoid: string[];
  };
}

/**
 * Normalize ingredient name for lookup
 */
function normalizeIngredient(ingredient: string): string {
  return ingredient
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Find ingredient info from database
 */
function findIngredient(name: string): { key: string; info: IngredientInfo } | null {
  const normalized = normalizeIngredient(name);
  
  // Direct match
  if (ingredientDatabase[normalized]) {
    return { key: normalized, info: ingredientDatabase[normalized] };
  }
  
  // Search by aliases
  for (const [key, info] of Object.entries(ingredientDatabase)) {
    if (info.aliases.some(alias => normalizeIngredient(alias) === normalized)) {
      return { key, info };
    }
    // Partial match
    if (normalized.includes(key) || key.includes(normalized)) {
      return { key, info };
    }
    if (info.aliases.some(alias => {
      const normAlias = normalizeIngredient(alias);
      return normalized.includes(normAlias) || normAlias.includes(normalized);
    })) {
      return { key, info };
    }
  }
  
  return null;
}

/**
 * Determine risk level based on user conditions and ingredient tags
 */
function determineRiskLevel(
  ingredientTags: string[],
  userConditions: string[]
): { level: RiskLevel; matchedTags: string[] } {
  const matchedTags: string[] = [];
  let hasAvoid = false;
  let hasCaution = false;
  
  for (const condition of userConditions) {
    const relevantTags = conditionTags[condition] || [];
    
    for (const tag of ingredientTags) {
      if (relevantTags.includes(tag)) {
        matchedTags.push(tag);
        if (tag.startsWith('avoid')) {
          hasAvoid = true;
        } else if (tag.startsWith('limit')) {
          hasCaution = true;
        }
      }
    }
  }
  
  // Also check for universal avoid tags
  if (ingredientTags.includes('avoid_all') || ingredientTags.includes('trans_fat')) {
    hasAvoid = true;
    matchedTags.push('avoid_all');
  }
  
  let level: RiskLevel = 'safe';
  if (hasAvoid) {
    level = 'avoid';
  } else if (hasCaution) {
    level = 'caution';
  }
  
  return { level, matchedTags: [...new Set(matchedTags)] };
}

/**
 * Calculate health score based on analyzed ingredients
 * 
 * Score Formula:
 * - Start with 100 points
 * - Each "avoid" ingredient: -15 points
 * - Each "caution" ingredient: -5 points
 * - Each "safe" ingredient with positive tags: +2 points (max 20)
 * - Minimum score: 0, Maximum: 100
 */
function calculateHealthScore(ingredients: AnalyzedIngredient[]): number {
  let score = 100;
  let bonusPoints = 0;
  
  for (const ingredient of ingredients) {
    if (!ingredient.found) {
      // Unknown ingredients get slight penalty
      score -= 3;
      continue;
    }
    
    switch (ingredient.riskLevel) {
      case 'avoid':
        score -= 15;
        break;
      case 'caution':
        score -= 5;
        break;
      case 'safe':
        // Check for positive tags
        if (ingredient.info?.tags.some(t => t.startsWith('good_for') || t === 'healthy_fat' || t === 'fiber' || t === 'antioxidant')) {
          bonusPoints += 2;
        }
        break;
    }
  }
  
  // Apply bonus points (capped at 20)
  score += Math.min(bonusPoints, 20);
  
  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Generate summary text based on analysis
 */
function generateSummary(
  ingredients: AnalyzedIngredient[],
  healthScore: number,
  conditions: string[]
): { summary: string; concerns: string[] } {
  const avoidIngredients = ingredients.filter(i => i.riskLevel === 'avoid');
  const cautionIngredients = ingredients.filter(i => i.riskLevel === 'caution');
  const concerns: string[] = [];
  
  let summary = '';
  
  if (healthScore >= 80) {
    summary = 'This food appears to be a good choice for your health profile.';
  } else if (healthScore >= 60) {
    summary = 'This food is moderately suitable for you, but consume in moderation.';
  } else if (healthScore >= 40) {
    summary = 'This food has some ingredients that may not be ideal for your conditions.';
  } else {
    summary = 'This food contains several ingredients that may be harmful for your health conditions.';
  }
  
  // Add specific concerns
  if (avoidIngredients.length > 0) {
    const names = avoidIngredients.map(i => i.info?.name || i.originalName).join(', ');
    concerns.push(`Ingredients to avoid: ${names}`);
  }
  
  if (cautionIngredients.length > 0) {
    const names = cautionIngredients.map(i => i.info?.name || i.originalName).join(', ');
    concerns.push(`Ingredients to limit: ${names}`);
  }
  
  // Condition-specific warnings
  if (conditions.includes('diabetes') && ingredients.some(i => i.info?.tags.includes('high_glycemic'))) {
    concerns.push('Contains high glycemic ingredients that may spike blood sugar');
  }
  
  if (conditions.includes('highBP') && ingredients.some(i => i.info?.tags.includes('sodium'))) {
    concerns.push('Contains sodium which may affect blood pressure');
  }
  
  if (conditions.includes('glutenIntolerance') && ingredients.some(i => i.info?.tags.includes('contains_gluten'))) {
    concerns.push('Contains gluten - not safe for celiac/gluten sensitivity');
  }
  
  return { summary, concerns };
}

/**
 * Get diet suggestions based on user conditions
 */
function getDietSuggestions(conditions: string[]): { include: string[]; avoid: string[] } {
  const include: Set<string> = new Set();
  const avoid: Set<string> = new Set();
  
  for (const condition of conditions) {
    const suggestions = dietSuggestions[condition];
    if (suggestions) {
      suggestions.include.forEach(item => include.add(item));
      suggestions.avoid.forEach(item => avoid.add(item));
    }
  }
  
  return {
    include: Array.from(include),
    avoid: Array.from(avoid),
  };
}

/**
 * Main analysis function
 * Analyzes a list of ingredients against user's health conditions
 */
export function analyzeIngredients(
  ingredientList: string[],
  userConditions: string[]
): AnalysisResult {
  const analyzedIngredients: AnalyzedIngredient[] = ingredientList.map(ingredient => {
    const found = findIngredient(ingredient);
    
    if (found) {
      const { level, matchedTags } = determineRiskLevel(found.info.tags, userConditions);
      
      return {
        name: found.info.name,
        originalName: ingredient,
        found: true,
        info: found.info,
        riskLevel: level,
        matchedTags,
      };
    }
    
    // Unknown ingredient
    return {
      name: ingredient,
      originalName: ingredient,
      found: false,
      info: null,
      riskLevel: 'caution' as RiskLevel, // Unknown ingredients get caution by default
      matchedTags: [],
    };
  });
  
  const healthScore = calculateHealthScore(analyzedIngredients);
  const { summary, concerns } = generateSummary(analyzedIngredients, healthScore, userConditions);
  const suggestions = getDietSuggestions(userConditions);
  
  return {
    ingredients: analyzedIngredients,
    healthScore,
    summary,
    concerns,
    suggestions,
  };
}

/**
 * Parse ingredients string into array
 */
export function parseIngredients(text: string): string[] {
  return text
    .split(/[,\n;]/)
    .map(item => item.trim())
    .filter(item => item.length > 0 && item.length < 100);
}
