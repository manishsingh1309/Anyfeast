import { StepContainer } from '../StepContainer';
import { OnboardingData, DIETARY_OPTIONS, CUISINE_OPTIONS } from '@/types/onboarding';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ChefHat, Heart, TrendingUp, Clock, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface MealPlanStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

interface MealRecommendation {
  day: string;
  meal: string;
  cuisine: string;
  time: number;
  calories: number;
  protein: number;
  image: string;
  flag: string;
}

interface DietInsight {
  icon: typeof Heart;
  title: string;
  description: string;
  color: string;
}

export function MealPlanStep({
  data,
  updateData,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
  canProceed,
}: MealPlanStepProps) {
  const [generating, setGenerating] = useState(true);
  const [mealPlan, setMealPlan] = useState<MealRecommendation[]>([]);
  const [insights, setInsights] = useState<DietInsight[]>([]);

  useEffect(() => {
    // Simulate meal plan generation
    const timer = setTimeout(() => {
      generateMealPlan();
      setGenerating(false);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B35', '#4ECDC4', '#FFE66D'],
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const generateMealPlan = () => {
    const selectedCuisines = data.favoriteCuisines.length > 0 
      ? data.favoriteCuisines 
      : ['indian', 'italian', 'mexican'];
    
    const mealDatabase: Record<string, { meals: { name: string; time: number; calories: number; protein: number }[] }> = {
      indian: {
        meals: [
          { name: 'Palak Paneer with Roti', time: 35, calories: 450, protein: 18 },
          { name: 'Chana Masala Bowl', time: 30, calories: 380, protein: 15 },
          { name: 'Tandoori Chicken Wrap', time: 25, calories: 420, protein: 32 },
        ],
      },
      italian: {
        meals: [
          { name: 'Margherita Pizza', time: 40, calories: 520, protein: 22 },
          { name: 'Pesto Pasta Primavera', time: 25, calories: 480, protein: 16 },
          { name: 'Caprese Salad with Focaccia', time: 15, calories: 350, protein: 14 },
        ],
      },
      mexican: {
        meals: [
          { name: 'Chicken Fajita Bowl', time: 30, calories: 490, protein: 35 },
          { name: 'Black Bean Tacos', time: 20, calories: 410, protein: 18 },
          { name: 'Burrito with Guacamole', time: 25, calories: 550, protein: 24 },
        ],
      },
      chinese: {
        meals: [
          { name: 'Kung Pao Tofu', time: 30, calories: 420, protein: 20 },
          { name: 'Sweet & Sour Chicken', time: 35, calories: 480, protein: 28 },
          { name: 'Vegetable Fried Rice', time: 25, calories: 390, protein: 12 },
        ],
      },
      thai: {
        meals: [
          { name: 'Pad Thai', time: 25, calories: 450, protein: 22 },
          { name: 'Green Curry with Rice', time: 30, calories: 420, protein: 18 },
          { name: 'Thai Basil Stir-fry', time: 20, calories: 380, protein: 24 },
        ],
      },
      japanese: {
        meals: [
          { name: 'Teriyaki Salmon Bowl', time: 25, calories: 460, protein: 32 },
          { name: 'Vegetable Sushi Rolls', time: 35, calories: 380, protein: 14 },
          { name: 'Miso Ramen', time: 30, calories: 420, protein: 20 },
        ],
      },
      french: {
        meals: [
          { name: 'Ratatouille with Quinoa', time: 40, calories: 390, protein: 16 },
          { name: 'Croque Monsieur', time: 20, calories: 520, protein: 28 },
          { name: 'Niçoise Salad', time: 25, calories: 410, protein: 24 },
        ],
      },
      greek: {
        meals: [
          { name: 'Greek Moussaka', time: 45, calories: 480, protein: 26 },
          { name: 'Souvlaki Bowl', time: 30, calories: 440, protein: 30 },
          { name: 'Mediterranean Wrap', time: 20, calories: 390, protein: 18 },
        ],
      },
      korean: {
        meals: [
          { name: 'Bibimbap Bowl', time: 35, calories: 470, protein: 22 },
          { name: 'Korean BBQ Tacos', time: 30, calories: 490, protein: 28 },
          { name: 'Kimchi Fried Rice', time: 20, calories: 410, protein: 16 },
        ],
      },
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const plan: MealRecommendation[] = [];

    days.slice(0, 7).forEach((day, index) => {
      const cuisineId = selectedCuisines[index % selectedCuisines.length];
      const cuisineData = mealDatabase[cuisineId] || mealDatabase.indian;
      const meal = cuisineData.meals[Math.floor(Math.random() * cuisineData.meals.length)];
      const cuisineInfo = CUISINE_OPTIONS.find(c => c.id === cuisineId);

      plan.push({
        day,
        meal: meal.name,
        cuisine: cuisineInfo?.label || 'International',
        time: meal.time,
        calories: meal.calories,
        protein: meal.protein,
        image: cuisineId,
        flag: cuisineInfo?.flag || '🍽️',
      });
    });

    setMealPlan(plan);
    generateInsights();
  };

  const generateInsights = () => {
    const dietType = DIETARY_OPTIONS.find(d => data.dietaryPreferences.includes(d.id));
    const insights: DietInsight[] = [];

    // Personalized insights based on preferences
    if (data.dietaryPreferences.includes('vegan') || data.dietaryPreferences.includes('vegetarian')) {
      insights.push({
        icon: Heart,
        title: 'Plant-Powered Nutrition',
        description: 'Your meal plan is rich in fiber, vitamins, and antioxidants from whole plant foods.',
        color: 'text-green-600',
      });
    }

    if (data.dietaryPreferences.includes('keto')) {
      insights.push({
        icon: Flame,
        title: 'Optimized for Ketosis',
        description: 'High-fat, low-carb meals designed to keep you in fat-burning mode.',
        color: 'text-orange-600',
      });
    }

    if (data.cookingTime && data.cookingTime < 30) {
      insights.push({
        icon: Clock,
        title: 'Time-Efficient Meals',
        description: 'Quick recipes that fit your busy schedule without compromising on taste.',
        color: 'text-blue-600',
      });
    }

    if (data.favoriteCuisines.length >= 4) {
      insights.push({
        icon: TrendingUp,
        title: 'Culinary Diversity',
        description: 'Exploring multiple cuisines ensures a wide range of nutrients and flavors.',
        color: 'text-purple-600',
      });
    }

    // Default insights
    if (insights.length < 2) {
      insights.push({
        icon: ChefHat,
        title: 'Balanced Nutrition',
        description: 'Your plan includes a mix of proteins, healthy fats, and complex carbohydrates.',
        color: 'text-primary',
      });
      insights.push({
        icon: Heart,
        title: 'Heart-Healthy',
        description: 'Meals designed to support cardiovascular health with wholesome ingredients.',
        color: 'text-red-600',
      });
    }

    setInsights(insights);
  };

  const getDietaryRecommendation = () => {
    if (data.dietaryPreferences.includes('vegan')) {
      return {
        title: '🌱 Perfect for Vegan Lifestyle',
        description: 'Your meal plan is 100% plant-based, rich in whole foods, legumes, and vegetables. Great for heart health and sustainability!',
      };
    }
    if (data.dietaryPreferences.includes('keto')) {
      return {
        title: '🥑 Keto-Optimized Meals',
        description: 'Low-carb, high-fat meals designed to keep you in ketosis. Perfect for weight management and sustained energy.',
      };
    }
    if (data.dietaryPreferences.includes('vegetarian')) {
      return {
        title: '🥗 Vegetarian Excellence',
        description: 'A balanced mix of plant proteins, dairy, and eggs providing all essential nutrients for a healthy lifestyle.',
      };
    }
    if (data.dietaryPreferences.includes('paleo')) {
      return {
        title: '🥓 Paleo-Friendly Nutrition',
        description: 'Whole foods approach focusing on what our ancestors ate. High in protein and healthy fats.',
      };
    }
    return {
      title: '⚖️ Balanced & Nutritious',
      description: 'A well-rounded meal plan with diverse proteins, vegetables, and grains for optimal health and enjoyment.',
    };
  };

  const recommendation = getDietaryRecommendation();

  return (
    <StepContainer
      title="Your Personalized Meal Plan"
      subtitle="AI-generated based on your preferences and dietary needs"
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={!generating}
    >
      <div className="space-y-6">
        {generating ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 space-y-6"
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Sparkles className="w-16 h-16 text-primary" />
            </motion.div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Creating Your Perfect Meal Plan...</h3>
              <p className="text-muted-foreground">Analyzing your preferences and dietary needs</p>
            </div>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-primary rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Diet Recommendation Card */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{recommendation.title.split(' ')[0]}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{recommendation.title.substring(3)}</h3>
                    <p className="text-muted-foreground text-sm">{recommendation.description}</p>
                  </div>
                </div>
              </Card>

              {/* Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-medium transition-shadow">
                      <div className="flex items-start gap-3">
                        <insight.icon className={cn("w-6 h-6 shrink-0 mt-0.5", insight.color)} />
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                          <p className="text-xs text-muted-foreground">{insight.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* 7-Day Meal Plan */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Your 7-Day Meal Plan
                  </h3>
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Curated
                  </Badge>
                </div>

                <div className="space-y-3">
                  {mealPlan.map((meal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="p-4 hover:shadow-soft transition-all hover:scale-[1.01]">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">{meal.flag}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-sm">{meal.day}</h4>
                              <Badge variant="outline" className="text-xs">{meal.cuisine}</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm mb-2">{meal.meal}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {meal.time} min
                              </span>
                              <span className="flex items-center gap-1">
                                <Flame className="w-3 h-3" />
                                {meal.calories} cal
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {meal.protein}g protein
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-3 pt-4"
              >
                <Button
                  variant="outline"
                  onClick={generateMealPlan}
                  className="flex-1 gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Regenerate Plan
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </StepContainer>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
