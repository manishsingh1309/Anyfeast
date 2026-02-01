import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { OnboardingData, CUISINE_OPTIONS, GOAL_OPTIONS, DIETARY_OPTIONS } from '@/types/onboarding';
import { 
  Check, 
  ChefHat, 
  Sparkles, 
  ArrowRight, 
  Utensils, 
  Calendar,
  Users,
  Target,
  Share2,
  Download,
  PartyPopper
} from 'lucide-react';

// Import images
import heroFood from '@/assets/hero-food.jpg';
import cuisineIndian from '@/assets/cuisine-indian.jpg';
import cuisineItalian from '@/assets/cuisine-italian.jpg';
import cuisineChinese from '@/assets/cuisine-chinese.jpg';
import cuisineMexican from '@/assets/cuisine-mexican.jpg';
import cuisineThai from '@/assets/cuisine-thai.jpg';
import cuisineJapanese from '@/assets/cuisine-japanese.jpg';

interface CompletionScreenProps {
  data: OnboardingData;
  onRestart: () => void;
}

const cuisineImages: Record<string, string> = {
  indian: cuisineIndian,
  italian: cuisineItalian,
  chinese: cuisineChinese,
  mexican: cuisineMexican,
  thai: cuisineThai,
  japanese: cuisineJapanese,
};

export function CompletionScreen({ data, onRestart }: CompletionScreenProps) {
  const selectedGoal = GOAL_OPTIONS.find(g => g.id === data.cookingGoal);
  const selectedCuisines = CUISINE_OPTIONS.filter(c => data.favoriteCuisines.includes(c.id));
  const selectedDietary = DIETARY_OPTIONS.filter(d => data.dietaryPreferences.includes(d.id));

  const confettiColors = ['#E94E3C', '#F4A259', '#27AE60', '#3498DB', '#9B59B6'];

  return (
    <div className="min-h-screen bg-background">
      <Header variant="minimal" showNav={false} />
      
      {/* Hero section with confetti */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={heroFood}
          alt="Fresh ingredients"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        
        {/* Confetti animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                backgroundColor: confettiColors[i % confettiColors.length],
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: -20, rotate: 0, opacity: 1 }}
              animate={{
                y: ['0vh', '100vh'],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))}
        </div>
        
        {/* Success animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="relative"
          >
            {/* Outer ring pulse */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full gradient-warm flex items-center justify-center shadow-glow relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              >
                <Check className="w-14 h-14 md:w-16 md:h-16 text-primary-foreground" strokeWidth={3} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-3xl mx-auto px-4 -mt-12 relative z-10 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <PartyPopper className="w-6 h-6 text-accent" />
            <span className="text-accent font-semibold">Congratulations!</span>
            <PartyPopper className="w-6 h-6 text-accent scale-x-[-1]" />
          </motion.div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            You're All Set!
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Your personalized meal experience is ready. Here's a summary of your preferences.
          </p>
        </motion.div>

        {/* Summary cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          {/* Household & Schedule */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Users className="w-5 h-5" />
              <h3 className="font-semibold">Household & Schedule</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Household size</span>
                <span className="font-semibold text-foreground text-lg">
                  {data.householdSize} {data.householdSize === 1 ? 'person' : 'people'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Meals per week</span>
                <span className="font-semibold text-foreground text-lg">
                  {data.mealsPerWeek} meals
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Total servings</span>
                <span className="font-bold text-primary text-xl">
                  {data.mealsPerWeek * data.householdSize}/week
                </span>
              </div>
            </div>
          </div>

          {/* Goal & Dietary */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Target className="w-5 h-5" />
              <h3 className="font-semibold">Goal & Preferences</h3>
            </div>
            
            <div className="space-y-3">
              <div className="py-2 border-b border-border">
                <span className="text-muted-foreground block mb-1">Your goal</span>
                <span className="font-semibold text-foreground flex items-center gap-2 text-lg">
                  <span>{selectedGoal?.icon}</span>
                  {selectedGoal?.label}
                </span>
              </div>
              
              <div className="py-2">
                <span className="text-muted-foreground block mb-2">Dietary preferences</span>
                <div className="flex flex-wrap gap-2">
                  {selectedDietary.length > 0 ? (
                    selectedDietary.map(pref => (
                      <span
                        key={pref.id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                      >
                        {pref.emoji} {pref.label}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No restrictions</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Favorite cuisines showcase */}
        {selectedCuisines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">Your Favorite Cuisines</h2>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {selectedCuisines.map((cuisine, index) => (
                <motion.div
                  key={cuisine.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-soft group cursor-pointer"
                >
                  <img
                    src={cuisineImages[cuisine.id] || heroFood}
                    alt={cuisine.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-xs md:text-sm font-semibold text-primary-foreground flex items-center gap-1">
                      <span>{cuisine.flag}</span>
                      <span className="truncate">{cuisine.label}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI personalization note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-2xl p-6 border border-primary/20 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">AI is Ready to Personalize</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Based on your preferences, we'll curate recipes that match your 
                {selectedGoal?.label && ` ${selectedGoal.label.toLowerCase()} goal, `}
                {selectedCuisines.length > 0 && ` featuring ${selectedCuisines.map(c => c.label).join(', ')} cuisines, `}
                perfectly portioned for {data.householdSize} {data.householdSize === 1 ? 'person' : 'people'}.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col gap-3"
        >
          <Button variant="hero" size="xl" className="w-full shadow-glow">
            <ChefHat className="w-6 h-6" />
            Explore My Personalized Recipes
            <ArrowRight className="w-6 h-6" />
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" className="w-full">
              <Calendar className="w-5 h-5" />
              View Meal Plans
            </Button>
            <Button variant="outline" size="lg" className="w-full" onClick={onRestart}>
              <Sparkles className="w-5 h-5" />
              Adjust Preferences
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-4 h-4" />
              Share Profile
            </button>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Download className="w-4 h-4" />
              Download App
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
