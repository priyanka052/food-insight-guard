import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, Scan, Heart, Sparkles } from 'lucide-react';
import healthyFoodBg from '@/assets/healthy-food-bg.jpg';

export default function Landing() {
  const { t, setIsGuest } = useApp();
  const navigate = useNavigate();

  const handleContinueAsGuest = () => {
    setIsGuest(true);
    navigate('/user-info');
  };

  const features = [
    {
      icon: Scan,
      title: 'Smart Scanning',
      description: 'Scan ingredient labels or barcodes instantly',
    },
    {
      icon: Shield,
      title: 'Health Protection',
      description: 'Personalized alerts based on your conditions',
    },
    {
      icon: Heart,
      title: 'Diet Guidance',
      description: 'Get tailored food recommendations',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${healthyFoodBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container relative mx-auto px-4 py-16 sm:py-24">
            <div className="flex flex-col items-center text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary animate-fade-in backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Your Personal Nutrition Guardian
              </div>
              
              {/* Heading */}
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-slide-up">
                <span className="text-foreground">{t.appName}</span>
              </h1>
              
              {/* Tagline */}
              <p className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-slide-up stagger-1">
                {t.tagline}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row animate-slide-up stagger-2">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={handleContinueAsGuest}
                >
                  {t.continueAsGuest}
                </Button>
                <Button
                  variant="heroOutline"
                  size="xl"
                  onClick={() => navigate('/auth')}
                >
                  {t.login} / {t.signUp}
                </Button>
              </div>
            </div>
            
            {/* Hero Image/Illustration */}
            <div className="mt-16 flex justify-center animate-slide-up stagger-3">
              <div className="relative">
                {/* Food Image Grid */}
                <div className="grid grid-cols-3 gap-4 max-w-lg">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-400/20 to-green-500/30 flex items-center justify-center overflow-hidden shadow-lg animate-float backdrop-blur-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop"
                      alt="Healthy salad"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-orange-400/20 to-orange-500/30 flex items-center justify-center overflow-hidden shadow-lg animate-float backdrop-blur-sm" style={{ animationDelay: '0.5s' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=200&h=200&fit=crop"
                      alt="Fresh fruits"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-teal-400/20 to-teal-500/30 flex items-center justify-center overflow-hidden shadow-lg animate-float backdrop-blur-sm" style={{ animationDelay: '1s' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=200&h=200&fit=crop"
                      alt="Healthy meal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mb-2 font-semibold text-lg text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 {t.appName}. Your health, our priority.
          </p>
        </div>
      </footer>
    </div>
  );
}
