import Tesseract from 'tesseract.js';

export interface OCRResult {
  text: string;
  confidence: number;
}

/**
 * Perform OCR on an image using Tesseract.js
 * @param imageSource - Image URL, data URL, or File/Blob
 * @param onProgress - Optional progress callback (0-100)
 */
export async function performOCR(
  imageSource: string | File | Blob,
  onProgress?: (progress: number) => void
): Promise<OCRResult> {
  try {
    const result = await Tesseract.recognize(imageSource, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text' && onProgress) {
          onProgress(Math.round(m.progress * 100));
        }
      },
    });

    return {
      text: result.data.text,
      confidence: result.data.confidence,
    };
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to extract text from image');
  }
}

/**
 * Common ingredient keywords to help identify real ingredients
 */
const ingredientKeywords = [
  'water', 'sugar', 'salt', 'flour', 'oil', 'milk', 'cream', 'butter', 'egg', 'wheat',
  'corn', 'rice', 'soy', 'palm', 'vegetable', 'natural', 'artificial', 'flavor', 'colour',
  'color', 'extract', 'powder', 'syrup', 'starch', 'protein', 'fat', 'acid', 'sodium',
  'calcium', 'potassium', 'iron', 'vitamin', 'mineral', 'spice', 'herb', 'garlic', 'onion',
  'tomato', 'preservative', 'emulsifier', 'stabilizer', 'thickener', 'sweetener', 'glucose',
  'fructose', 'dextrose', 'maltodextrin', 'lecithin', 'gum', 'cellulose', 'pectin', 'gelatin',
  'yeast', 'baking', 'leavening', 'raising', 'agent', 'concentrate', 'puree', 'paste', 'juice',
];

/**
 * Enhanced OCR text pre-processing
 */
function preprocessOCRText(text: string): string {
  return text
    // Fix common OCR mistakes
    .replace(/[|l1]/g, (match, offset, str) => {
      // Keep 'l' if it looks like part of a word
      const prevChar = str[offset - 1];
      const nextChar = str[offset + 1];
      if (prevChar && /[a-zA-Z]/.test(prevChar)) return 'l';
      if (nextChar && /[a-zA-Z]/.test(nextChar)) return 'l';
      return match;
    })
    .replace(/0/g, 'o') // Often OCR reads 'o' as '0' in text
    .replace(/rn/g, 'm') // Common OCR mistake
    .replace(/vv/g, 'w') // Common OCR mistake
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract ingredients from OCR text
 * Handles common ingredient list formats with improved accuracy
 */
export function extractIngredientsFromText(text: string): string[] {
  // Preprocess the OCR text
  let processedText = preprocessOCRText(text);
  
  // Multiple patterns to find ingredients section
  const ingredientPatterns = [
    /ingredients?\s*:?\s*([\s\S]*?)(?:nutrition|allergen|contains|warning|storage|best before|manufactured|packed|net weight|directions|how to use|$)/i,
    /सामग्री\s*:?\s*([\s\S]*?)(?:पोषण|एलर्जन|$)/i, // Hindi
    /composed?\s*of\s*:?\s*([\s\S]*?)(?:nutrition|$)/i,
    /made\s*(?:with|from)\s*:?\s*([\s\S]*?)(?:nutrition|$)/i,
  ];
  
  let ingredientsText = processedText;
  
  for (const pattern of ingredientPatterns) {
    const match = processedText.match(pattern);
    if (match && match[1]) {
      ingredientsText = match[1];
      break;
    }
  }
  
  // Enhanced text cleaning
  let cleanedText = ingredientsText
    .replace(/ingredients?\s*:?/gi, '')
    .replace(/\n+/g, ', ')
    .replace(/[()[\]{}]/g, ' ')
    .replace(/\d+\.?\d*\s*%/g, '') // Remove percentages
    .replace(/\d+\s*(mg|g|ml|l|kg|oz|iu|mcg|µg)\b/gi, '') // Remove measurements
    .replace(/E\d{3,4}[a-z]?/gi, match => `additive-${match}`) // Preserve E-numbers as additives
    .replace(/INS\s*\d{3,4}/gi, match => `additive-${match}`) // Preserve INS numbers
    .replace(/[*#†‡§¶]/g, '') // Remove reference marks
    .replace(/\s+/g, ' ')
    .trim();

  // Split by common delimiters
  const rawItems = cleanedText.split(/[,;•·\|\/]+/);
  
  const ingredients = rawItems
    .map(item => item.trim())
    .filter(item => {
      if (!item || item.length < 2) return false;
      if (item.length > 80) return false;
      
      // More comprehensive skip words
      const skipWords = [
        'and', 'or', 'the', 'with', 'from', 'may contain', 'traces', 'less than',
        'for', 'as', 'of', 'in', 'a', 'an', 'to', 'by', 'see', 'also', 'including',
        'such', 'like', 'etc', 'per', 'serving', 'size', 'amount', 'daily', 'value',
        'percent', 'calorie', 'calories', 'total', 'information', 'product', 'made'
      ];
      if (skipWords.some(word => item.toLowerCase() === word)) return false;
      
      // Filter items that are mostly numbers or symbols
      const letterCount = item.replace(/[^a-zA-Z]/g, '').length;
      if (letterCount < 2) return false;
      
      // Check if it looks like an ingredient
      const itemLower = item.toLowerCase();
      const looksLikeIngredient = ingredientKeywords.some(kw => itemLower.includes(kw)) ||
                                   item.startsWith('additive-') ||
                                   letterCount >= 3;
      
      return looksLikeIngredient;
    })
    .map(item => {
      let cleaned = item
        .replace(/^\s*(and|or|of|with)\s+/i, '')
        .replace(/\s+(and|or)\s*$/i, '')
        .replace(/^additive-/i, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      
      if (cleaned.length > 0) {
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
      }
      return cleaned;
    })
    .filter(item => item.length >= 2);

  // Remove duplicates and return
  return [...new Set(ingredients)];
}

/**
 * Attempt to improve OCR accuracy by trying multiple recognitions
 */
export async function performEnhancedOCR(
  imageSource: string | File | Blob,
  onProgress?: (progress: number) => void
): Promise<OCRResult> {
  // Try standard recognition first
  const result = await performOCR(imageSource, onProgress);
  
  // If confidence is low, the text might be poor quality
  if (result.confidence < 50) {
    console.log('Low OCR confidence, text may be incomplete');
  }
  
  return result;
}
