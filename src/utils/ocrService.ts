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
  // Clean up the text
  let cleanedText = text
    .replace(/ingredients\s*:?/gi, '') // Remove "Ingredients:" label
    .replace(/contains\s*:?/gi, '')    // Remove "Contains:" label
    .replace(/\n+/g, ', ')             // Replace newlines with commas
    .replace(/[()[\]{}]/g, '')         // Remove brackets
    .replace(/\d+%?\s*/g, '')          // Remove percentages and numbers
    .replace(/\s+/g, ' ')              // Normalize spaces
    .trim();

  // Split by common delimiters
  const ingredients = cleanedText
    .split(/[,;•·\|]+/)
    .map(item => item.trim())
    .filter(item => {
      // Filter out empty items and common non-ingredient words
      if (!item || item.length < 2 || item.length > 50) return false;
      const skipWords = ['and', 'or', 'the', 'with', 'may contain', 'traces', 'less than'];
      return !skipWords.some(word => item.toLowerCase() === word);
    })
    .map(item => {
      // Capitalize first letter
      return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    });

  return [...new Set(ingredients)]; // Remove duplicates
}
