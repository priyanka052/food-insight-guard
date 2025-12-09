/**
 * Ingredient Health Database
 * 
 * This is a sample dataset mapping ingredients to their health impact tags.
 * 
 * To expand this dataset, you can:
 * 1. Use the USDA FoodData Central API: https://fdc.nal.usda.gov/api-guide.html
 * 2. Download from Kaggle: https://www.kaggle.com/datasets/openfoodfacts/world-food-facts
 * 3. Use Hugging Face datasets: https://huggingface.co/datasets/food
 * 
 * Dataset Structure:
 * - name: ingredient name (lowercase)
 * - aliases: alternative names for the ingredient
 * - tags: health-related tags for cross-referencing with conditions
 * - category: general category (sugar, fat, protein, additive, etc.)
 * - description: brief description of the ingredient
 */

export interface IngredientInfo {
  name: string;
  aliases: string[];
  tags: string[];
  category: 'sugar' | 'fat' | 'protein' | 'carb' | 'additive' | 'fiber' | 'mineral' | 'vitamin' | 'other';
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export const ingredientDatabase: Record<string, IngredientInfo> = {
  // Sugars & Sweeteners
  'sugar': {
    name: 'Sugar',
    aliases: ['sucrose', 'table sugar', 'cane sugar', 'white sugar'],
    tags: ['high_glycemic', 'avoid_for_diabetes', 'limit_for_obesity', 'limit_for_pcos', 'limit_for_cholesterol'],
    category: 'sugar',
    description: 'Refined sweetener that rapidly increases blood sugar levels',
    riskLevel: 'high',
  },
  'high fructose corn syrup': {
    name: 'High Fructose Corn Syrup',
    aliases: ['hfcs', 'corn syrup', 'glucose-fructose syrup'],
    tags: ['high_glycemic', 'avoid_for_diabetes', 'avoid_for_obesity', 'liver_stress', 'limit_for_cholesterol'],
    category: 'sugar',
    description: 'Highly processed sweetener linked to metabolic issues',
    riskLevel: 'high',
  },
  'honey': {
    name: 'Honey',
    aliases: ['natural honey', 'raw honey'],
    tags: ['moderate_glycemic', 'limit_for_diabetes', 'limit_for_obesity', 'natural_sweetener'],
    category: 'sugar',
    description: 'Natural sweetener with some antioxidants, but still high in sugar',
    riskLevel: 'medium',
  },
  'stevia': {
    name: 'Stevia',
    aliases: ['stevia extract', 'rebiana'],
    tags: ['zero_glycemic', 'safe_for_diabetes', 'safe_for_obesity', 'natural_sweetener'],
    category: 'sugar',
    description: 'Natural zero-calorie sweetener derived from stevia plant',
    riskLevel: 'low',
  },
  'aspartame': {
    name: 'Aspartame',
    aliases: ['equal', 'nutrasweet'],
    tags: ['zero_glycemic', 'artificial_sweetener', 'controversial'],
    category: 'additive',
    description: 'Artificial sweetener, avoid if phenylketonuria',
    riskLevel: 'medium',
  },
  
  // Fats & Oils
  'palm oil': {
    name: 'Palm Oil',
    aliases: ['palmolein', 'palm kernel oil'],
    tags: ['saturated_fat', 'limit_for_cholesterol', 'limit_for_heart_disease', 'limit_for_obesity'],
    category: 'fat',
    description: 'High in saturated fats, linked to heart health concerns',
    riskLevel: 'high',
  },
  'olive oil': {
    name: 'Olive Oil',
    aliases: ['extra virgin olive oil', 'evoo'],
    tags: ['healthy_fat', 'good_for_heart', 'anti_inflammatory', 'good_for_cholesterol'],
    category: 'fat',
    description: 'Heart-healthy monounsaturated fat with anti-inflammatory properties',
    riskLevel: 'low',
  },
  'coconut oil': {
    name: 'Coconut Oil',
    aliases: ['virgin coconut oil', 'vco'],
    tags: ['saturated_fat', 'mct', 'controversial', 'limit_for_cholesterol'],
    category: 'fat',
    description: 'High in saturated fat but contains MCTs, use in moderation',
    riskLevel: 'medium',
  },
  'trans fat': {
    name: 'Trans Fat',
    aliases: ['partially hydrogenated oil', 'hydrogenated vegetable oil'],
    tags: ['avoid_all', 'avoid_for_heart_disease', 'avoid_for_cholesterol', 'avoid_for_diabetes'],
    category: 'fat',
    description: 'Artificial fat strongly linked to heart disease - avoid completely',
    riskLevel: 'high',
  },
  'vegetable oil': {
    name: 'Vegetable Oil',
    aliases: ['soybean oil', 'canola oil', 'sunflower oil'],
    tags: ['omega_6', 'refined_oil', 'neutral'],
    category: 'fat',
    description: 'Common cooking oil, moderate consumption recommended',
    riskLevel: 'medium',
  },
  
  // Grains & Carbs
  'whole wheat flour': {
    name: 'Whole Wheat Flour',
    aliases: ['whole grain flour', 'atta', 'wheat flour'],
    tags: ['whole_grain', 'fiber', 'moderate_glycemic', 'contains_gluten'],
    category: 'carb',
    description: 'Whole grain with fiber, better than refined flour',
    riskLevel: 'low',
  },
  'refined flour': {
    name: 'Refined Flour',
    aliases: ['maida', 'all-purpose flour', 'white flour', 'enriched flour'],
    tags: ['high_glycemic', 'limit_for_diabetes', 'limit_for_obesity', 'low_fiber', 'contains_gluten'],
    category: 'carb',
    description: 'Highly processed flour lacking fiber and nutrients',
    riskLevel: 'high',
  },
  'rice': {
    name: 'Rice',
    aliases: ['white rice', 'polished rice'],
    tags: ['high_glycemic', 'limit_for_diabetes', 'gluten_free'],
    category: 'carb',
    description: 'High glycemic grain, prefer brown rice for better nutrition',
    riskLevel: 'medium',
  },
  'brown rice': {
    name: 'Brown Rice',
    aliases: ['whole grain rice'],
    tags: ['whole_grain', 'moderate_glycemic', 'fiber', 'gluten_free'],
    category: 'carb',
    description: 'Whole grain rice with fiber and nutrients intact',
    riskLevel: 'low',
  },
  'oats': {
    name: 'Oats',
    aliases: ['rolled oats', 'oatmeal', 'steel cut oats'],
    tags: ['whole_grain', 'fiber', 'low_glycemic', 'good_for_cholesterol', 'good_for_heart'],
    category: 'carb',
    description: 'Heart-healthy whole grain high in soluble fiber',
    riskLevel: 'low',
  },
  
  // Sodium
  'salt': {
    name: 'Salt',
    aliases: ['sodium chloride', 'table salt', 'sea salt', 'rock salt'],
    tags: ['sodium', 'limit_for_high_bp', 'limit_for_kidney_disease', 'limit_for_heart_disease'],
    category: 'mineral',
    description: 'Essential mineral but excess linked to high blood pressure',
    riskLevel: 'medium',
  },
  'msg': {
    name: 'MSG',
    aliases: ['monosodium glutamate', 'e621', 'ajinomoto'],
    tags: ['flavor_enhancer', 'sodium', 'controversial', 'limit_for_high_bp'],
    category: 'additive',
    description: 'Flavor enhancer, some people may be sensitive',
    riskLevel: 'medium',
  },
  
  // Proteins
  'whey protein': {
    name: 'Whey Protein',
    aliases: ['whey isolate', 'whey concentrate'],
    tags: ['protein', 'dairy', 'good_for_muscle', 'contains_lactose'],
    category: 'protein',
    description: 'High-quality protein from milk, contains lactose',
    riskLevel: 'low',
  },
  'soy protein': {
    name: 'Soy Protein',
    aliases: ['soy isolate', 'textured vegetable protein', 'tvp'],
    tags: ['protein', 'plant_based', 'phytoestrogens', 'limit_for_thyroid'],
    category: 'protein',
    description: 'Plant protein, may affect thyroid in large amounts',
    riskLevel: 'low',
  },
  
  // Additives & Preservatives
  'sodium benzoate': {
    name: 'Sodium Benzoate',
    aliases: ['e211', 'benzoate of soda'],
    tags: ['preservative', 'additive', 'controversial'],
    category: 'additive',
    description: 'Common preservative, may cause reactions in some people',
    riskLevel: 'medium',
  },
  'artificial colors': {
    name: 'Artificial Colors',
    aliases: ['food coloring', 'tartrazine', 'e102', 'red 40', 'yellow 5'],
    tags: ['additive', 'controversial', 'limit_all'],
    category: 'additive',
    description: 'Synthetic dyes, linked to behavioral issues in children',
    riskLevel: 'medium',
  },
  'bht': {
    name: 'BHT',
    aliases: ['butylated hydroxytoluene', 'e321'],
    tags: ['antioxidant', 'preservative', 'controversial'],
    category: 'additive',
    description: 'Synthetic antioxidant preservative',
    riskLevel: 'medium',
  },
  
  // Healthy Ingredients
  'almonds': {
    name: 'Almonds',
    aliases: ['badam', 'almond nuts'],
    tags: ['healthy_fat', 'protein', 'fiber', 'good_for_heart', 'good_for_diabetes'],
    category: 'protein',
    description: 'Nutrient-dense nut with healthy fats and protein',
    riskLevel: 'low',
  },
  'spinach': {
    name: 'Spinach',
    aliases: ['palak'],
    tags: ['iron', 'vitamins', 'fiber', 'antioxidants', 'good_for_all'],
    category: 'fiber',
    description: 'Nutrient-rich leafy green vegetable',
    riskLevel: 'low',
  },
  'turmeric': {
    name: 'Turmeric',
    aliases: ['haldi', 'curcumin'],
    tags: ['anti_inflammatory', 'antioxidant', 'good_for_all'],
    category: 'other',
    description: 'Anti-inflammatory spice with many health benefits',
    riskLevel: 'low',
  },
  'ginger': {
    name: 'Ginger',
    aliases: ['adrak'],
    tags: ['anti_inflammatory', 'digestive_aid', 'good_for_all'],
    category: 'other',
    description: 'Digestive aid with anti-inflammatory properties',
    riskLevel: 'low',
  },
  'garlic': {
    name: 'Garlic',
    aliases: ['lahsun'],
    tags: ['heart_healthy', 'antimicrobial', 'good_for_cholesterol', 'good_for_high_bp'],
    category: 'other',
    description: 'Heart-healthy herb that may lower cholesterol and blood pressure',
    riskLevel: 'low',
  },
  'milk': {
    name: 'Milk',
    aliases: ['whole milk', 'dairy milk', 'cow milk'],
    tags: ['calcium', 'protein', 'contains_lactose', 'dairy'],
    category: 'protein',
    description: 'Good source of calcium and protein, avoid if lactose intolerant',
    riskLevel: 'low',
  },
  'wheat': {
    name: 'Wheat',
    aliases: ['wheat grain'],
    tags: ['carb', 'contains_gluten', 'moderate_glycemic'],
    category: 'carb',
    description: 'Common grain, avoid if gluten intolerant',
    riskLevel: 'low',
  },
  'gluten': {
    name: 'Gluten',
    aliases: ['wheat gluten', 'seitan'],
    tags: ['protein', 'contains_gluten', 'avoid_for_gluten_intolerance'],
    category: 'protein',
    description: 'Wheat protein, avoid completely if celiac or gluten sensitive',
    riskLevel: 'medium',
  },
};

// Condition to tag mapping for analysis
export const conditionTags: Record<string, string[]> = {
  thyroid: ['limit_for_thyroid', 'goitrogen'],
  highBP: ['limit_for_high_bp', 'sodium', 'avoid_for_high_bp'],
  obesity: ['limit_for_obesity', 'high_glycemic', 'avoid_for_obesity', 'saturated_fat'],
  pcos: ['limit_for_pcos', 'high_glycemic', 'avoid_for_pcos'],
  pcod: ['limit_for_pcod', 'high_glycemic', 'avoid_for_pcod'],
  diabetes: ['limit_for_diabetes', 'high_glycemic', 'avoid_for_diabetes'],
  cholesterol: ['limit_for_cholesterol', 'saturated_fat', 'avoid_for_cholesterol', 'trans_fat'],
  heartDisease: ['limit_for_heart_disease', 'avoid_for_heart_disease', 'saturated_fat', 'sodium', 'trans_fat'],
  kidneyDisease: ['limit_for_kidney_disease', 'sodium', 'phosphorus', 'potassium'],
  liverDisease: ['limit_for_liver_disease', 'liver_stress'],
  glutenIntolerance: ['contains_gluten', 'avoid_for_gluten_intolerance'],
  lactoseIntolerance: ['contains_lactose', 'dairy'],
};

// Diet suggestions per condition
export const dietSuggestions: Record<string, { include: string[]; avoid: string[] }> = {
  thyroid: {
    include: ['Iodine-rich foods (fish, dairy)', 'Selenium (Brazil nuts, eggs)', 'Zinc (pumpkin seeds, chickpeas)', 'Fruits and vegetables'],
    avoid: ['Excessive soy products', 'Raw cruciferous vegetables in excess', 'Highly processed foods', 'Excess sugar'],
  },
  highBP: {
    include: ['Leafy greens', 'Berries', 'Bananas (potassium)', 'Oats', 'Garlic', 'Fish rich in omega-3'],
    avoid: ['High sodium foods', 'Processed meats', 'Canned soups', 'Pickles', 'Alcohol', 'Caffeine excess'],
  },
  obesity: {
    include: ['High-fiber vegetables', 'Lean proteins', 'Whole grains', 'Legumes', 'Water-rich foods', 'Green tea'],
    avoid: ['Sugary drinks', 'Refined carbs', 'Fried foods', 'High-calorie snacks', 'Large portions'],
  },
  pcos: {
    include: ['Low-GI foods', 'Anti-inflammatory foods (turmeric, ginger)', 'Lean proteins', 'Fiber-rich foods', 'Omega-3 fatty acids'],
    avoid: ['Refined carbs', 'Sugary foods', 'Processed foods', 'Dairy in excess', 'Red meat in excess'],
  },
  pcod: {
    include: ['Complex carbohydrates', 'Fresh fruits', 'Vegetables', 'Nuts and seeds', 'Fish'],
    avoid: ['White bread', 'Pastries', 'Sugary snacks', 'Fried foods', 'Processed foods'],
  },
  diabetes: {
    include: ['Non-starchy vegetables', 'Whole grains', 'Beans and legumes', 'Nuts', 'Fish', 'Bitter gourd'],
    avoid: ['White rice', 'White bread', 'Sugary drinks', 'Sweets', 'Fruit juices', 'Processed snacks'],
  },
  cholesterol: {
    include: ['Oats and barley', 'Nuts (especially almonds)', 'Fatty fish', 'Olive oil', 'Fruits (apples, grapes)', 'Legumes'],
    avoid: ['Fried foods', 'Full-fat dairy', 'Red meat', 'Processed meats', 'Baked goods with trans fats'],
  },
  heartDisease: {
    include: ['Leafy greens', 'Whole grains', 'Berries', 'Fish rich in omega-3', 'Nuts', 'Olive oil'],
    avoid: ['Trans fats', 'Saturated fats', 'High sodium foods', 'Sugary foods', 'Red meat', 'Processed foods'],
  },
  kidneyDisease: {
    include: ['Cabbage', 'Bell peppers', 'Onions', 'Apples', 'Egg whites', 'Fish'],
    avoid: ['High sodium foods', 'High potassium foods (bananas, oranges)', 'High phosphorus foods', 'Processed meats', 'Dark colas'],
  },
  liverDisease: {
    include: ['Coffee', 'Green leafy vegetables', 'Fatty fish', 'Oatmeal', 'Walnuts', 'Garlic'],
    avoid: ['Alcohol', 'High fat foods', 'Very salty foods', 'Sugary foods', 'Undercooked shellfish'],
  },
  glutenIntolerance: {
    include: ['Rice', 'Quinoa', 'Buckwheat', 'Fresh fruits', 'Vegetables', 'Meat', 'Fish', 'Dairy'],
    avoid: ['Wheat', 'Barley', 'Rye', 'Most breads', 'Pasta', 'Many processed foods', 'Beer'],
  },
  lactoseIntolerance: {
    include: ['Lactose-free dairy', 'Plant milks (almond, soy, oat)', 'Hard cheeses', 'Yogurt with probiotics', 'Calcium-fortified foods'],
    avoid: ['Milk', 'Ice cream', 'Soft cheeses', 'Cream', 'Some baked goods', 'Some processed foods'],
  },
};

// Sample barcode database for demo
export const barcodeDatabase: Record<string, { name: string; ingredients: string[] }> = {
  '8901234567890': {
    name: 'Sample Cookies',
    ingredients: ['refined flour', 'sugar', 'palm oil', 'salt', 'artificial colors', 'bht'],
  },
  '8909876543210': {
    name: 'Whole Grain Cereal',
    ingredients: ['whole wheat flour', 'oats', 'honey', 'almonds', 'salt'],
  },
  '8901111222333': {
    name: 'Instant Noodles',
    ingredients: ['refined flour', 'palm oil', 'salt', 'msg', 'sugar', 'artificial colors'],
  },
  '8904444555666': {
    name: 'Protein Bar',
    ingredients: ['whey protein', 'oats', 'almonds', 'honey', 'cocoa', 'stevia'],
  },
};
