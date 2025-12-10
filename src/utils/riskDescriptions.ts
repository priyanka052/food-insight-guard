// Descriptions explaining why ingredients are classified as safe, limit, or avoid based on health conditions

export const conditionDescriptions: Record<string, { name: string; emoji: string }> = {
  thyroid: { name: 'Thyroid', emoji: '🦋' },
  highBP: { name: 'High Blood Pressure', emoji: '❤️' },
  obesity: { name: 'Obesity', emoji: '⚖️' },
  pcos: { name: 'PCOS', emoji: '🩺' },
  pcod: { name: 'PCOD', emoji: '🩺' },
  diabetes: { name: 'Diabetes', emoji: '🩸' },
  cholesterol: { name: 'Cholesterol', emoji: '🫀' },
  heartDisease: { name: 'Heart Disease', emoji: '💔' },
  kidneyDisease: { name: 'Kidney Disease', emoji: '🫘' },
  liverDisease: { name: 'Liver Disease', emoji: '🫁' },
  glutenIntolerance: { name: 'Gluten Intolerance', emoji: '🌾' },
  lactoseIntolerance: { name: 'Lactose Intolerance', emoji: '🥛' },
};

export const tagDescriptions: Record<string, string> = {
  // Avoid tags
  avoid_all: 'Contains harmful substances that should be avoided by everyone',
  trans_fat: 'Contains trans fats which increase bad cholesterol and heart disease risk',
  avoid_for_high_bp: 'Can significantly raise blood pressure',
  avoid_for_diabetes: 'Can cause dangerous blood sugar spikes',
  avoid_for_obesity: 'Very high in calories, contributes to weight gain',
  avoid_for_cholesterol: 'Raises LDL (bad) cholesterol levels',
  avoid_for_heart_disease: 'Can worsen heart conditions',
  avoid_for_pcos: 'Can worsen hormonal imbalance in PCOS',
  avoid_for_pcod: 'Can worsen hormonal imbalance in PCOD',
  avoid_for_gluten_intolerance: 'Contains gluten which damages intestinal lining',
  
  // Limit tags
  limit_for_thyroid: 'May interfere with thyroid hormone production',
  goitrogen: 'Contains goitrogens that can affect thyroid function',
  limit_for_high_bp: 'Can moderately increase blood pressure',
  limit_for_obesity: 'Moderate calorie content, consume in small portions',
  limit_for_pcos: 'May affect hormonal balance',
  limit_for_pcod: 'May affect hormonal balance',
  limit_for_diabetes: 'Can affect blood sugar levels if consumed in excess',
  limit_for_cholesterol: 'Contains moderate amounts of cholesterol/saturated fat',
  limit_for_heart_disease: 'May strain the cardiovascular system',
  limit_for_kidney_disease: 'May burden kidney function',
  limit_for_kidney: 'Contains minerals that kidneys need to filter',
  limit_for_liver_disease: 'May stress liver processing',
  limit_for_liver: 'Requires liver processing',
  
  // Harmful component tags
  high_glycemic: 'Causes rapid blood sugar spikes - harmful for diabetes, obesity, PCOS',
  saturated_fat: 'High in saturated fat - affects cholesterol and heart health',
  sodium: 'High in sodium - can raise blood pressure',
  phosphorus: 'High in phosphorus - difficult for kidneys to process',
  potassium: 'High in potassium - may be harmful for kidney patients',
  contains_gluten: 'Contains gluten - harmful for celiac/gluten sensitivity',
  contains_lactose: 'Contains lactose - causes digestive issues in lactose intolerance',
  dairy: 'Dairy product - avoid if lactose intolerant',
  liver_stress: 'Can stress liver function',
  
  // Positive tags
  good_for_heart: 'Supports heart health',
  good_for_diabetes: 'Safe for diabetics, low glycemic impact',
  good_for_bp: 'Helps maintain healthy blood pressure',
  good_for_weight: 'Supports healthy weight management',
  healthy_fat: 'Contains beneficial healthy fats',
  fiber: 'High in fiber - aids digestion and blood sugar control',
  antioxidant: 'Rich in antioxidants - fights inflammation',
  anti_inflammatory: 'Has anti-inflammatory properties',
  whole_grain: 'Whole grain - provides sustained energy',
  low_glycemic: 'Low glycemic index - safe for blood sugar',
};

export function getRiskDescription(
  riskLevel: 'safe' | 'caution' | 'avoid',
  matchedTags: string[],
  userConditions: string[],
  ingredientName: string
): string {
  if (riskLevel === 'safe') {
    // Check for positive tags
    const positiveDescriptions = matchedTags
      .filter(tag => tag.startsWith('good_for') || tag === 'healthy_fat' || tag === 'fiber' || tag === 'antioxidant')
      .map(tag => tagDescriptions[tag])
      .filter(Boolean);
    
    if (positiveDescriptions.length > 0) {
      return positiveDescriptions[0];
    }
    return `${ingredientName} is safe for your health conditions`;
  }
  
  // For caution/avoid, explain why based on matched tags and conditions
  const relevantConditions = userConditions
    .map(c => conditionDescriptions[c]?.name)
    .filter(Boolean);
  
  // Find the most relevant tag description
  for (const tag of matchedTags) {
    if (tagDescriptions[tag]) {
      return tagDescriptions[tag];
    }
  }
  
  // Default descriptions based on risk level
  if (riskLevel === 'avoid') {
    if (relevantConditions.length > 0) {
      return `Not recommended for ${relevantConditions.slice(0, 2).join(', ')}`;
    }
    return 'Contains ingredients that may be harmful';
  }
  
  if (relevantConditions.length > 0) {
    return `Consume in moderation with ${relevantConditions.slice(0, 2).join(', ')}`;
  }
  return 'Consume in moderation for your health';
}

export function getConditionIcon(condition: string): string {
  return conditionDescriptions[condition]?.emoji || '⚕️';
}

export function getConditionName(condition: string): string {
  return conditionDescriptions[condition]?.name || condition;
}
