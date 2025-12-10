import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, Download, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeShareProps {
  title: string;
  score: number;
  ingredients: string[];
  summary: string;
}

export function QRCodeShare({ title, score, ingredients, summary }: QRCodeShareProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  // Create a shareable data URL with analysis results
  const shareData = {
    app: 'NutriGuardian',
    title,
    score,
    ingredients: ingredients.slice(0, 10), // Limit for QR size
    summary: summary.slice(0, 200),
    timestamp: new Date().toISOString(),
  };

  const shareUrl = `${window.location.origin}/shared?data=${encodeURIComponent(
    btoa(JSON.stringify(shareData))
  )}`;

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `nutriguardian-analysis-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success('QR Code downloaded!');
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2">
          <QrCode className="h-5 w-5" />
          QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            Share via QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* QR Code Display */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-gray-900 border border-border">
            <QRCodeSVG
              id="qr-code-svg"
              value={shareUrl}
              size={200}
              level="M"
              includeMargin
              bgColor="transparent"
              fgColor="currentColor"
              className="text-foreground"
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Scan to view analysis results
            </p>
          </div>

          {/* Analysis Preview */}
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Health Score</span>
              <span className={`text-lg font-bold ${
                score >= 70 ? 'text-safe' : score >= 40 ? 'text-caution' : 'text-danger'
              }`}>
                {score}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {ingredients.length} ingredients analyzed
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleCopyLink}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-safe" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>
          </div>

          {/* Info */}
          <p className="text-xs text-center text-muted-foreground">
            👨‍⚕️ Share with family members or your doctor for health consultations
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
