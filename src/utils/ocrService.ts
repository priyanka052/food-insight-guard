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
 * Extract ingredients from OCR text
 * Handles common ingredient list formats
 */
export function extractIngredientsFromText(text: string): string[] {
  // First, try to find the ingredients section
  let ingredientsText = text;
  
  // Look for "Ingredients:" or similar markers
  const ingredientsMatch = text.match(/ingredients?\s*:?\s*([\s\S]*?)(?:nutrition|allergen|contains|warning|storage|best before|manufactured|$)/i);
  if (ingredientsMatch) {
    ingredientsText = ingredientsMatch[1];
  }
  
  // Clean up the text more carefully
  let cleanedText = ingredientsText
    .replace(/ingredients?\s*:?/gi, '') // Remove "Ingredients:" label
    .replace(/\n+/g, ', ')              // Replace newlines with commas
    .replace(/[()[\]{}]/g, ' ')         // Replace brackets with spaces
    .replace(/\d+\.?\d*\s*%/g, '')      // Remove percentages like "5%" or "0.5%"
    .replace(/\d+\s*(mg|g|ml|l|kg|oz|iu)\b/gi, '') // Remove measurements
    .replace(/\s+/g, ' ')               // Normalize spaces
    .trim();

  // Split by common delimiters
  const ingredients = cleanedText
    .split(/[,;•·\|]+/)
    .map(item => item.trim())
    .filter(item => {
      // Filter out empty items
      if (!item || item.length < 2) return false;
      // Filter out very long items (likely not ingredients)
      if (item.length > 60) return false;
      // Filter out common non-ingredient words
      const skipWords = ['and', 'or', 'the', 'with', 'from', 'may contain', 'traces', 'less than', 'for', 'as', 'of'];
      if (skipWords.some(word => item.toLowerCase() === word)) return false;
      // Filter out items that are mostly numbers
      if (item.replace(/[^a-zA-Z]/g, '').length < 2) return false;
      return true;
    })
    .map(item => {
      // Clean up each ingredient
      let cleaned = item
        .replace(/^\s*(and|or)\s+/i, '') // Remove leading "and" or "or"
        .replace(/\s+(and|or)\s*$/i, '') // Remove trailing "and" or "or"
        .trim();
      
      // Capitalize first letter, rest lowercase
      if (cleaned.length > 0) {
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
      }
      return cleaned;
    })
    .filter(item => item.length >= 2); // Final filter for short items

  return [...new Set(ingredients)]; // Remove duplicates
}
