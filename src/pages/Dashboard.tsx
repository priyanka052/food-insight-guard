import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { ActionCard } from '@/components/ActionCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Camera, Barcode, Upload, FileText, ArrowRight, X } from 'lucide-react';
import { parseIngredients, analyzeIngredients } from '@/utils/healthAnalyzer';
import { barcodeDatabase } from '@/data/ingredientDatabase';

type InputMode = null | 'camera' | 'barcode' | 'upload' | 'manual';

export default function Dashboard() {
  const { t, userProfile, addToHistory } = useApp();
  const navigate = useNavigate();
  
  const [inputMode, setInputMode] = useState<InputMode>(null);
  const [manualInput, setManualInput] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);

  if (!userProfile) {
    navigate('/user-info');
    return null;
  }

  const handleAnalyze = (ingredients: string[]) => {
    if (ingredients.length === 0) {
      toast.error(t.noIngredientsDetected);
      return;
    }

    const result = analyzeIngredients(ingredients, userProfile.selectedSymptoms);
    
    // Add to history
    addToHistory({
      ingredients,
      healthScore: result.healthScore,
      symptoms: userProfile.selectedSymptoms,
      summary: result.summary,
    });

    // Navigate to results with the analysis data
    navigate('/results', { state: { result, ingredients } });
  };

  const handleManualSubmit = () => {
    const ingredients = parseIngredients(manualInput);
    if (ingredients.length === 0) {
      toast.error(t.noIngredientsDetected);
      return;
    }
    setDetectedIngredients(ingredients);
  };

  const handleBarcodeSubmit = () => {
    setIsProcessing(true);
    
    // Simulate barcode lookup
    setTimeout(() => {
      const product = barcodeDatabase[barcodeInput] || barcodeDatabase['8901234567890'];
      
      if (product) {
        toast.success(`Found: ${product.name}`);
        setDetectedIngredients(product.ingredients);
      } else {
        toast.error('Product not found. Try sample barcode: 8901234567890');
      }
      setIsProcessing(false);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    if (file.type === 'text/plain') {
      // Handle text file
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const ingredients = parseIngredients(text);
        setDetectedIngredients(ingredients);
        setIsProcessing(false);
      };
      reader.readAsText(file);
    } else if (file.type.startsWith('image/')) {
      // For images - simulate OCR (in real app, use Tesseract.js)
      // Mock OCR result
      setTimeout(() => {
        const mockOcrResult = 'Sugar, Palm Oil, Refined Flour, Salt, Artificial Colors, Preservatives';
        const ingredients = parseIngredients(mockOcrResult);
        setDetectedIngredients(ingredients);
        toast.info('OCR completed (demo mode)');
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handleCameraCapture = () => {
    setIsProcessing(true);
    // Simulate camera capture + OCR
    setTimeout(() => {
      const mockOcrResult = 'Whole Wheat Flour, Honey, Oats, Almonds, Salt';
      const ingredients = parseIngredients(mockOcrResult);
      setDetectedIngredients(ingredients);
      toast.info('Image captured and processed (demo mode)');
      setIsProcessing(false);
    }, 2000);
  };

  const removeIngredient = (index: number) => {
    setDetectedIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const resetMode = () => {
    setInputMode(null);
    setDetectedIngredients([]);
    setManualInput('');
    setBarcodeInput('');
  };

  const actionCards = [
    {
      icon: Camera,
      title: t.scanIngredients,
      description: t.scanIngredientsDesc,
      mode: 'camera' as const,
      colorClass: 'from-primary to-primary/70',
    },
    {
      icon: Barcode,
      title: t.scanBarcode,
      description: t.scanBarcodeDesc,
      mode: 'barcode' as const,
      colorClass: 'from-accent to-accent/70',
    },
    {
      icon: Upload,
      title: t.uploadFile,
      description: t.uploadFileDesc,
      mode: 'upload' as const,
      colorClass: 'from-safe to-safe/70',
    },
    {
      icon: FileText,
      title: t.enterManually,
      description: t.enterManuallyDesc,
      mode: 'manual' as const,
      colorClass: 'from-caution to-caution/70',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {!inputMode && detectedIngredients.length === 0 ? (
          // Main selection screen
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">{t.howWouldYouLike}</h1>
              <p className="text-muted-foreground">Choose how you want to input ingredient information</p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              {actionCards.map((card) => (
                <ActionCard
                  key={card.mode}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  colorClass={card.colorClass}
                  onClick={() => setInputMode(card.mode)}
                />
              ))}
            </div>
          </div>
        ) : (
          // Input/Preview screen
          <div className="max-w-2xl mx-auto">
            {/* Back button */}
            <button
              onClick={resetMode}
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
              {t.back}
            </button>

            {/* Input Section */}
            {detectedIngredients.length === 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                {inputMode === 'manual' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{t.enterIngredients}</h2>
                    <Textarea
                      placeholder={t.ingredientsPlaceholder}
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      className="min-h-[150px]"
                    />
                    <Button onClick={handleManualSubmit} className="w-full">
                      {t.analyze}
                    </Button>
                  </div>
                )}

                {inputMode === 'barcode' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{t.scanBarcode}</h2>
                    <p className="text-sm text-muted-foreground">
                      Enter barcode number or try sample: 8901234567890
                    </p>
                    <Input
                      placeholder="Enter barcode number..."
                      value={barcodeInput}
                      onChange={(e) => setBarcodeInput(e.target.value)}
                    />
                    <Button 
                      onClick={handleBarcodeSubmit} 
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? <LoadingSpinner size="sm" /> : t.analyze}
                    </Button>
                  </div>
                )}

                {inputMode === 'upload' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{t.uploadFile}</h2>
                    <p className="text-sm text-muted-foreground">
                      Upload an image (.jpg, .png) or text file (.txt)
                    </p>
                    <Input
                      type="file"
                      accept=".txt,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="cursor-pointer"
                    />
                    {isProcessing && (
                      <div className="py-8">
                        <LoadingSpinner text={t.processing} />
                      </div>
                    )}
                  </div>
                )}

                {inputMode === 'camera' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{t.scanIngredients}</h2>
                    <div className="aspect-video rounded-xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                      {isProcessing ? (
                        <LoadingSpinner text={t.scanning} />
                      ) : (
                        <div className="text-center">
                          <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Camera preview (demo mode)</p>
                        </div>
                      )}
                    </div>
                    <Button 
                      onClick={handleCameraCapture} 
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? t.capturing : t.captureImage}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Detected Ingredients Preview */}
            {detectedIngredients.length > 0 && (
              <div className="space-y-6 animate-slide-up">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h2 className="text-xl font-semibold mb-4">{t.detectedIngredients}</h2>
                  <div className="flex flex-wrap gap-2">
                    {detectedIngredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                      >
                        {ingredient}
                        <button
                          onClick={() => removeIngredient(index)}
                          className="ml-1 hover:text-destructive transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={resetMode} className="flex-1">
                    {t.retake}
                  </Button>
                  <Button 
                    onClick={() => handleAnalyze(detectedIngredients)} 
                    className="flex-1 gap-2"
                  >
                    {t.analyze}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
