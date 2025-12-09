import { useApp } from '@/contexts/AppContext';
import { Language, languageNames } from '@/i18n/translations';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sun, Moon, Monitor, Languages, History, LogOut, Leaf } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const { t, language, setLanguage, theme, setTheme, isGuest, setIsGuest, userProfile } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const themeOptions = [
    { value: 'light', label: t.light, icon: Sun },
    { value: 'dark', label: t.dark, icon: Moon },
    { value: 'system', label: t.system, icon: Monitor },
  ] as const;

  const languages: Language[] = ['en', 'kn', 'mr', 'ta', 'te'];

  const handleLogout = () => {
    setIsGuest(true);
    navigate('/');
  };

  const showHistoryButton = userProfile && location.pathname !== '/history';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button 
          onClick={() => navigate(userProfile ? '/dashboard' : '/')}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden font-bold text-lg sm:inline-block">{t.appName}</span>
        </button>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* History Button */}
          {showHistoryButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/history')}
              className="hidden sm:flex"
            >
              <History className="h-5 w-5" />
            </Button>
          )}

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={language === lang ? 'bg-accent' : ''}
                >
                  {languageNames[lang]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === 'light' && <Sun className="h-5 w-5" />}
                {theme === 'dark' && <Moon className="h-5 w-5" />}
                {theme === 'system' && <Monitor className="h-5 w-5" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {themeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={theme === option.value ? 'bg-accent' : ''}
                >
                  <option.icon className="mr-2 h-4 w-4" />
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Logout/History on mobile */}
          {userProfile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                    {isGuest ? 'G' : 'U'}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/history')}>
                  <History className="mr-2 h-4 w-4" />
                  {t.history}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Desktop Logout */}
          {userProfile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hidden sm:flex"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t.logout}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
