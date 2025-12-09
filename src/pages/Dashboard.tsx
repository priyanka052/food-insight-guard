import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { ActionCard } from '@/components/ActionCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Camera, Barcode, Upload, FileText, ArrowRight, X, Loader2 } from 'lucide-react';
import { parseIngredients, analyzeIngredients } from '@/utils/healthAnalyzer';
import { barcodeDatabase } from '@/data/ingredientDatabase';
import { useCamera } from '@/hooks/useCamera';
import { performOCR, extractIngredientsFromText } from '@/utils/ocrService';

type InputMode = null | 'camera' | 'barcode' | 'upload' | 'manual';

export default function Dashboard() {
  const { t, userProfile, addToHistory } = useApp();
  const navigate = useNavigate();
  
  const [inputMode, setInputMode] = useState<InputMode>(null);
  const [manualInput, setManualInput] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const { videoRef, canvasRef, isStreaming, error: cameraError, startCamera, stopCamera, captureImage } = useCamera();

  // Start camera when mode is 'camera'
  useEffect(() => {
    if (inputMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
      setCapturedImage(null);
    }
  }, [inputMode, startCamera, stopCamera]);

  // Show camera error
  useEffect(() => {
    if (cameraError) {
      toast.error(cameraError);
    }
  }, [cameraError]);

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

  const processImageWithOCR = async (imageSource: string | File) => {
    setIsProcessing(true);
    setOcrProgress(0);

    try {
      toast.info('Extracting text from image...');
      
      const ocrResult = await performOCR(imageSource, (progress) => {
        setOcrProgress(progress);
      });

      if (ocrResult.confidence < 30) {
        toast.warning('Low confidence in text detection. Please try with a clearer image.');
      }

      const ingredients = extractIngredientsFromText(ocrResult.text);
      
      if (ingredients.length === 0) {
        // Try parsing raw text if extraction failed
        const rawIngredients = parseIngredients(ocrResult.text);
        if (rawIngredients.length > 0) {
          setDetectedIngredients(rawIngredients);
          toast.success(`Detected ${rawIngredients.length} ingredients`);
        } else {
          toast.error('Could not detect ingredients. Please try manual entry.');
        }
      } else {
        setDetectedIngredients(ingredients);
        toast.success(`Detected ${ingredients.length} ingredients`);
      }
    } catch (error) {
      toast.error('Failed to process image. Please try again.');
      console.error('OCR Error:', error);
    } finally {
      setIsProcessing(false);
      setOcrProgress(0);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'text/plain') {
      // Handle text file
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const ingredients = parseIngredients(text);
        setDetectedIngredients(ingredients);
        setIsProcessing(false);
        if (ingredients.length > 0) {
          toast.success(`Detected ${ingredients.length} ingredients`);
        }
      };
      reader.readAsText(file);
    } else if (file.type.startsWith('image/')) {
      // Handle image with real OCR
      await processImageWithOCR(file);
    }
  };

  const handleCameraCapture = async () => {
    const imageDataUrl = captureImage();
    
    if (!imageDataUrl) {
      toast.error('Failed to capture image. Please try again.');
      return;
    }

    setCapturedImage(imageDataUrl);
    stopCamera();
    
    // Process with OCR
    await processImageWithOCR(imageDataUrl);
  };

  const handleRetakePhoto = () => {
    setCapturedImage(null);
    setDetectedIngredients([]);
    startCamera();
  };

  const removeIngredient = (index: number) => {
    setDetectedIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const resetMode = () => {
    setInputMode(null);
    setDetectedIngredients([]);
    setManualInput('');
    setBarcodeInput('');
    setCapturedImage(null);
    stopCamera();
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
                      disabled={isProcessing}
                    />
                    {isProcessing && (
                      <div className="py-8 space-y-4">
                        <LoadingSpinner text={`${t.processing} ${ocrProgress}%`} />
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${ocrProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {inputMode === 'camera' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{t.scanIngredients}</h2>
                    <p className="text-sm text-muted-foreground">
                      Point your camera at the ingredient label and capture
                    </p>
                    
                    <div className="relative aspect-video rounded-xl bg-muted overflow-hidden border-2 border-border">
                      {/* Hidden canvas for capturing */}
                      <canvas ref={canvasRef} className="hidden" />
                      
                      {/* Show captured image or live video */}
                      {capturedImage ? (
                        <img 
                          src={capturedImage} 
                          alt="Captured" 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                      )}
                      
                      {/* Loading overlay */}
                      {isProcessing && (
                        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {t.scanning} {ocrProgress > 0 ? `${ocrProgress}%` : ''}
                          </p>
                          {ocrProgress > 0 && (
                            <div className="w-48 bg-muted rounded-full h-2 mt-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${ocrProgress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Camera not streaming message */}
                      {!isStreaming && !capturedImage && !isProcessing && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              {cameraError || 'Starting camera...'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {capturedImage ? (
                      <Button 
                        onClick={handleRetakePhoto} 
                        variant="outline"
                        className="w-full"
                        disabled={isProcessing}
                      >
                        {t.retake}
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleCameraCapture} 
                        className="w-full"
                        disabled={!isStreaming || isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            {t.capturing}
                          </>
                        ) : (
                          t.captureImage
                        )}
                      </Button>
                    )}
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
