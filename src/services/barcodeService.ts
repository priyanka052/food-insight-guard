/**
 * Barcode Service
 * 
 * Fetches real product data from Open Food Facts API
 * https://world.openfoodfacts.org/
 */

export interface ProductInfo {
  name: string;
  brand: string;
  ingredients: string[];
  imageUrl?: string;
  nutritionGrade?: string;
  novaGroup?: number;
}

export interface BarcodeResult {
  success: boolean;
  product?: ProductInfo;
  error?: string;
}

/**
 * Parse ingredients string from Open Food Facts
 */
function parseIngredientsText(ingredientsText: string): string[] {
  if (!ingredientsText) return [];

  // Clean and split ingredients
  return ingredientsText
    .replace(/\([^)]*\)/g, '') // Remove content in parentheses
    .replace(/\[[^\]]*\]/g, '') // Remove content in brackets
    .replace(/_/g, '') // Remove underscores (used for allergen marking)
    .replace(/\*+/g, '') // Remove asterisks
    .replace(/\d+\.?\d*\s*%/g, '') // Remove percentages
    .split(/[,;]/)
    .map(item => item.trim())
    .filter(item => {
      if (!item || item.length < 2 || item.length > 60) return false;
      // Filter out common non-ingredients
      const skipPatterns = [
        /^and$/i, /^or$/i, /^the$/i, /^with$/i, /^from$/i,
        /^contains$/i, /^may contain$/i, /^traces$/i,
        /^\d+$/,
      ];
      return !skipPatterns.some(pattern => pattern.test(item));
    })
    .map(item => {
      // Clean up and capitalize
      const cleaned = item.replace(/^\s*(and|or)\s+/i, '').trim();
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
    })
    .filter(item => item.length >= 2);
}

/**
 * Fetch product information from Open Food Facts API
 */
export async function fetchProductByBarcode(barcode: string): Promise<BarcodeResult> {
  // Validate barcode format
  const cleanBarcode = barcode.replace(/\D/g, '');
  if (cleanBarcode.length < 8 || cleanBarcode.length > 14) {
    return {
      success: false,
      error: 'Invalid barcode format. Please enter 8-14 digits.',
    };
  }

  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${cleanBarcode}.json`,
      {
        headers: {
          'User-Agent': 'HealthChecker/1.0 - Educational App',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 1 || !data.product) {
      return {
        success: false,
        error: 'Product not found. Try scanning a different product or enter ingredients manually.',
      };
    }

    const product = data.product;
    
    // Try to get ingredients from multiple sources
    let ingredients: string[] = [];
    
    // First try: parsed ingredients list
    if (product.ingredients && Array.isArray(product.ingredients)) {
      ingredients = product.ingredients
        .map((ing: { text?: string }) => ing.text || '')
        .filter((text: string) => text.length > 0)
        .map((text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
    }
    
    // Fallback: parse from ingredients_text
    if (ingredients.length === 0 && product.ingredients_text) {
      ingredients = parseIngredientsText(product.ingredients_text);
    }
    
    // Fallback: try English ingredients text
    if (ingredients.length === 0 && product.ingredients_text_en) {
      ingredients = parseIngredientsText(product.ingredients_text_en);
    }

    // If still no ingredients, check for common fields
    if (ingredients.length === 0) {
      return {
        success: false,
        error: 'Product found but no ingredient data available. Please enter ingredients manually.',
      };
    }

    return {
      success: true,
      product: {
        name: product.product_name || product.product_name_en || 'Unknown Product',
        brand: product.brands || 'Unknown Brand',
        ingredients: [...new Set(ingredients)], // Remove duplicates
        imageUrl: product.image_front_small_url || product.image_url,
        nutritionGrade: product.nutrition_grades?.toUpperCase(),
        novaGroup: product.nova_group,
      },
    };
  } catch (error) {
    console.error('Barcode API Error:', error);
    return {
      success: false,
      error: 'Unable to fetch product data. Please check your internet connection or try again.',
    };
  }
}

/**
 * Get sample barcodes for testing
 */
export const sampleBarcodes = [
  { barcode: '5449000000996', name: 'Coca-Cola', region: 'Global' },
  { barcode: '8901262150132', name: 'Maggi Noodles', region: 'India' },
  { barcode: '8901491101189', name: 'Parle-G Biscuits', region: 'India' },
  { barcode: '7622210449283', name: 'Oreo Cookies', region: 'Global' },
  { barcode: '8901030865398', name: 'Britannia Cookies', region: 'India' },
  { barcode: '3017620422003', name: 'Nutella', region: 'Global' },
];
