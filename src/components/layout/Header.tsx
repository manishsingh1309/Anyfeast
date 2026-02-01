import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Camera, 
  ShoppingBag, 
  Calendar, 
  Menu, 
  X,
  ChevronDown,
  Sparkles,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

interface HeaderProps {
  variant?: 'default' | 'transparent' | 'minimal';
  showNav?: boolean;
}

const navItems = [
  { label: 'Recipe', href: '/recipes', icon: <Sparkles className="w-4 h-4" /> },
  { label: 'Shop', href: '/shop', icon: <ShoppingBag className="w-4 h-4" /> },
  { 
    label: 'Festivals & Occasions', 
    href: '/festivals', 
    icon: <Calendar className="w-4 h-4" />,
    hasDropdown: true 
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Our Story', href: '/about' },
];

export function Header({ variant = 'default', showNav = true }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isTransparent = variant === 'transparent';
  const isMinimal = variant === 'minimal';

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isTransparent 
            ? "bg-transparent" 
            : "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-soft"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <Logo size="md" showText={true} />
            </Link>

            {/* Desktop Navigation */}
            {showNav && !isMinimal && (
              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <NavItem 
                    key={item.label} 
                    item={item} 
                    isTransparent={isTransparent}
                  />
                ))}
              </nav>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "p-2.5 rounded-xl transition-all duration-200 hover:scale-105",
                  isTransparent 
                    ? "text-white/90 hover:bg-white/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Camera/Scan */}
              <motion.button
                className={cn(
                  "hidden sm:flex p-2.5 rounded-xl transition-all duration-200",
                  isTransparent 
                    ? "text-white/90 hover:bg-white/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scan ingredients"
              >
                <Camera className="w-5 h-5" />
              </motion.button>

              {/* Meal Planner */}
              <motion.button
                className={cn(
                  "hidden sm:flex p-2.5 rounded-xl transition-all duration-200",
                  isTransparent 
                    ? "text-white/90 hover:bg-white/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Meal planner"
              >
                <Calendar className="w-5 h-5" />
              </motion.button>

              {/* Login Button */}
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "hidden md:flex items-center gap-2",
                  isTransparent && "text-white hover:bg-white/10"
                )}
              >
                <User className="w-4 h-4" />
                Login
              </Button>

              {/* CTA Button - Desktop */}
              <Button 
                variant="hero" 
                size="sm"
                className="hidden md:flex"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Kits
              </Button>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "lg:hidden p-2.5 rounded-xl transition-colors",
                  isTransparent 
                    ? "text-white hover:bg-white/10" 
                    : "text-foreground hover:bg-muted"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* AI Banner */}
        {!isMinimal && (
          <div className="hidden md:block border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between py-2.5 text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 text-primary font-semibold">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                    Recipe Personalization Powered By AI
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-all duration-200 group font-medium">
                    <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Camera className="w-4 h-4 text-primary" />
                    </div>
                    <span>Scan Your Fridge</span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                  <button className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-all duration-200 group font-medium">
                    <div className="p-1.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <Calendar className="w-4 h-4 text-accent" />
                    </div>
                    <span>Plan Your Meals</span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu 
            navItems={navItems} 
            onClose={() => setMobileMenuOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <SearchModal onClose={() => setSearchOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

interface NavItemProps {
  item: typeof navItems[0];
  isTransparent?: boolean;
}

function NavItem({ item, isTransparent }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all duration-200",
          isTransparent 
            ? "text-white/90 hover:text-white hover:bg-white/10" 
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        {item.icon}
        {item.label}
        {item.hasDropdown && (
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform duration-200",
            isHovered && "rotate-180"
          )} />
        )}
      </Link>
      
      {/* Hover indicator */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

interface MobileMenuProps {
  navItems: typeof navItems;
  onClose: () => void;
}

function MobileMenu({ navItems, onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 lg:hidden"
    >
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      {/* Menu panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-elevated border-l border-border"
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end p-4 border-b border-border">
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Nav items */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors font-medium"
                >
                  {item.icon || <div className="w-4" />}
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* Bottom actions */}
          <div className="p-4 border-t border-border space-y-3">
            <Button variant="outline" className="w-full" size="lg">
              <User className="w-4 h-4" />
              Login
            </Button>
            <Button variant="hero" className="w-full" size="lg">
              <ShoppingBag className="w-4 h-4" />
              Shop Kits
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface SearchModalProps {
  onClose: () => void;
}

function SearchModal({ onClose }: SearchModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
    >
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Search container */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-background rounded-2xl shadow-elevated border border-border overflow-hidden"
      >
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search recipes, ingredients, cuisines..."
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quick suggestions */}
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {['Butter Chicken', 'Pasta', 'Quick meals', 'Vegetarian', 'Indian cuisine'].map((term) => (
                <button
                  key={term}
                  className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">AI-Powered Features</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary transition-colors text-left">
                <Camera className="w-5 h-5" />
                <div>
                  <p className="font-medium text-sm">Scan Fridge</p>
                  <p className="text-xs text-primary/70">Get recipe ideas</p>
                </div>
              </button>
              <button className="flex items-center gap-2 p-3 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent-foreground transition-colors text-left">
                <Calendar className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium text-sm">Meal Planner</p>
                  <p className="text-xs text-muted-foreground">Plan with AI</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
