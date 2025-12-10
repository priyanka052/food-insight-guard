import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2, MessageCircle, Instagram, Send, Copy, Check, Facebook, Twitter, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface ShareDialogProps {
  title: string;
  text: string;
  score: number;
}

export function ShareDialog({ title, text, score }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const shareMessage = `🥗 NutriGuardian Health Analysis\n\n📊 Health Score: ${score}%\n${text}\n\nCheck your food ingredients at NutriGuardian!`;
  const encodedMessage = encodeURIComponent(shareMessage);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => window.open(`https://wa.me/?text=${encodedMessage}`, '_blank'),
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`, '_blank'),
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodedMessage}`, '_blank'),
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodedMessage}`, '_blank'),
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodedMessage}`, '_blank'),
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600',
      action: () => {
        navigator.clipboard.writeText(shareMessage);
        toast.success('Copied! Open Instagram and paste in your story or DM');
      },
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2">
          <Share2 className="h-5 w-5" />
          Share Results
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Share Your Results
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Preview */}
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-4">
              {shareMessage}
            </p>
          </div>

          {/* Share Options Grid */}
          <div className="grid grid-cols-3 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => {
                  option.action();
                  if (option.name !== 'Instagram') {
                    setOpen(false);
                  }
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl text-white transition-all duration-200 transform hover:scale-105 ${option.color}`}
              >
                <option.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{option.name}</span>
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-safe" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
