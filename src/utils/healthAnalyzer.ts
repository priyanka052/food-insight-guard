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
  userConditions: string[],
  ingredientRiskLevel?: 'low' | 'medium' | 'high'
): { level: RiskLevel; matchedTags: string[] } {
  const matchedTags: string[] = [];
  let avoidScore = 0;
  let cautionScore = 0;
  
  for (const condition of userConditions) {
    const relevantTags = conditionTags[condition] || [];
    
    for (const tag of ingredientTags) {
      if (relevantTags.includes(tag)) {
        matchedTags.push(tag);
        if (tag.startsWith('avoid')) {
          avoidScore += 2;
        } else if (tag.startsWith('limit')) {
          cautionScore += 1;
        }
      }
      
      // Check for condition-specific harmful tags
      if (tag === 'high_glycemic' && (condition === 'diabetes' || condition === 'obesity' || condition === 'pcos')) {
        avoidScore += 1;
      }
      if (tag === 'saturated_fat' && (condition === 'cholesterol' || condition === 'heartDisease')) {
        cautionScore += 1;
      }
      if (tag === 'sodium' && condition === 'highBP') {
        cautionScore += 1;
      }
    }
  }
  
  // Also check for universal avoid tags
  if (ingredientTags.includes('avoid_all') || ingredientTags.includes('trans_fat')) {
    avoidScore += 3;
    matchedTags.push('avoid_all');
  }
  
  // Consider ingredient's inherent risk level
  if (ingredientRiskLevel === 'high') {
    cautionScore += 1;
  }
  
  let level: RiskLevel = 'safe';
  if (avoidScore >= 2) {
    level = 'avoid';
  } else if (avoidScore >= 1 || cautionScore >= 2) {
    level = 'caution';
  } else if (cautionScore >= 1) {
    level = 'caution';
  }
  
  return { level, matchedTags: [...new Set(matchedTags)] };
}

/**
 * Calculate health score based on analyzed ingredients
 * 
 * Score Formula:
 * - Start with base score based on overall composition
 * - Each "avoid" ingredient: -20 points (severe penalty)
 * - Each "caution" ingredient: -8 points
 * - Each "safe" ingredient with positive tags: +3 points (max 15)
 * - Unknown ingredients: -5 points each
 * - Weighted by number of ingredients
 * - Minimum score: 0, Maximum: 100
 */
function calculateHealthScore(ingredients: AnalyzedIngredient[]): number {
  if (ingredients.length === 0) return 50;
  
  const avoidCount = ingredients.filter(i => i.riskLevel === 'avoid').length;
  const cautionCount = ingredients.filter(i => i.riskLevel === 'caution').length;
  const safeCount = ingredients.filter(i => i.riskLevel === 'safe').length;
  const unknownCount = ingredients.filter(i => !i.found).length;
  
  // Calculate base score from ratios
  const totalKnown = ingredients.length - unknownCount;
  let score: number;
  
  if (totalKnown === 0) {
    // All unknown - moderate score
    score = 50 - (unknownCount * 5);
  } else {
    // Calculate weighted score based on composition
    const avoidRatio = avoidCount / ingredients.length;
    const cautionRatio = cautionCount / ingredients.length;
    const safeRatio = safeCount / ingredients.length;
    
    // Base calculation: 100 - penalties
    score = 100;
    
    // Apply penalties based on ratios (more impactful for higher ratios)
    score -= avoidRatio * 60; // Up to -60 if all avoid
    score -= cautionRatio * 25; // Up to -25 if all caution
    
    // Add bonuses for healthy ingredients
    let bonusPoints = 0;
    for (const ingredient of ingredients) {
      if (ingredient.riskLevel === 'safe' && ingredient.info) {
        const hasPositiveTags = ingredient.info.tags.some(t => 
          t.startsWith('good_for') || 
          t === 'healthy_fat' || 
          t === 'fiber' || 
          t === 'antioxidant' ||
          t === 'whole_grain' ||
          t === 'anti_inflammatory'
        );
        if (hasPositiveTags) {
          bonusPoints += 3;
        }
      }
    }
    score += Math.min(bonusPoints, 15);
    
    // Penalty for unknown ingredients
    score -= unknownCount * 5;
    
    // Additional flat penalties for avoid items (they're particularly bad)
    score -= avoidCount * 8;
  }
  
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
      const { level, matchedTags } = determineRiskLevel(
        found.info.tags, 
        userConditions,
        found.info.riskLevel
      );
      
      return {
        name: found.info.name,
        originalName: ingredient,
        found: true,
        info: found.info,
        riskLevel: level,
        matchedTags,
      };
    }
    
    // Unknown ingredient - try to guess based on common keywords
    const lowerName = ingredient.toLowerCase();
    let guessedRisk: RiskLevel = 'caution';
    
    // Common unhealthy indicators
    if (lowerName.includes('sugar') || lowerName.includes('syrup') || lowerName.includes('sweetener')) {
      guessedRisk = 'avoid';
    } else if (lowerName.includes('artificial') || lowerName.includes('color') || lowerName.includes('flavour')) {
      guessedRisk = 'caution';
    } else if (lowerName.includes('preservative') || lowerName.includes('hydrogenated')) {
      guessedRisk = 'avoid';
    }
    
    return {
      name: ingredient,
      originalName: ingredient,
      found: false,
      info: null,
      riskLevel: guessedRisk,
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
