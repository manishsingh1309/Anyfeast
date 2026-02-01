import { StepContainer } from '../StepContainer';
import { SelectionCard } from '../SelectionCard';
import { OnboardingData, CUISINE_OPTIONS } from '@/types/onboarding';
import { AITipBox } from '@/components/ui/AITipBox';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// Import cuisine images
import cuisineIndian from '@/assets/cuisine-indian.jpg';
import cuisineItalian from '@/assets/cuisine-italian.jpg';
import cuisineChinese from '@/assets/cuisine-chinese.jpg';
import cuisineMexican from '@/assets/cuisine-mexican.jpg';
import cuisineThai from '@/assets/cuisine-thai.jpg';
import cuisineJapanese from '@/assets/cuisine-japanese.jpg';
import cuisineFrench from '@/assets/cuisine-french.jpg';
import cuisineGreek from '@/assets/cuisine-greek.jpg';
import cuisineKorean from '@/assets/cuisine-korean.jpg';
import cuisineMoroccan from '@/assets/cuisine-moroccan.jpg';
import cuisineSpanish from '@/assets/cuisine-spanish.jpg';

interface CuisineStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

const cuisineImages: Record<string, string> = {
  indian: cuisineIndian,
  italian: cuisineItalian,
  chinese: cuisineChinese,
  mexican: cuisineMexican,
  thai: cuisineThai,
  japanese: cuisineJapanese,
  french: cuisineFrench,
  greek: cuisineGreek,
  korean: cuisineKorean,
  moroccan: cuisineMoroccan,
  spanish: cuisineSpanish,
};

const cuisineDescriptions: Record<string, string> = {
  indian: "Rich spices, vibrant curries",
  italian: "Fresh pasta, classic flavors",
  chinese: "Wok-fired, umami-rich",
  mexican: "Bold, zesty, colorful",
  thai: "Sweet, sour, spicy",
  japanese: "Elegant, minimal, fresh",
  french: "Refined, butter, wine-infused",
  greek: "Mediterranean, fresh, herby",
  korean: "Spicy, fermented, bold",
  moroccan: "Aromatic, spiced, exotic",
  spanish: "Tapas, paella, flavorful",
  surprise: "Adventure awaits!",
};

export function CuisineStep({
  data,
  updateData,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
  canProceed,
}: CuisineStepProps) {
  const toggleCuisine = (id: string) => {
    const current = data.favoriteCuisines;
    if (current.includes(id)) {
      updateData({ favoriteCuisines: current.filter(c => c !== id) });
    } else {
      updateData({ favoriteCuisines: [...current, id] });
    }
  };

  const getAITip = () => {
    if (data.favoriteCuisines.length === 0) {
      return "Pick cuisines you love! We'll prioritize these in your recipe recommendations while still showing you new discoveries.";
    }
    if (data.favoriteCuisines.length === 1) {
      const cuisine = CUISINE_OPTIONS.find(c => c.id === data.favoriteCuisines[0]);
      return `Great choice! ${cuisine?.label} cuisine is known for ${cuisineDescriptions[data.favoriteCuisines[0]] || 'amazing flavors'}.`;
    }
    if (data.favoriteCuisines.length >= 4) {
      return "You have adventurous taste! We'll create a diverse meal plan featuring all your favorite cuisines.";
    }
    return `Nice selection! We'll blend ${data.favoriteCuisines.length} cuisines to create an exciting weekly variety.`;
  };

  return (
    <StepContainer
      title="What cuisines excite you?"
      subtitle="Pick your favorites — we'll prioritize these in your meal plans"
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={canProceed}
    >
      <div className="space-y-6">
        {/* Cuisine grid with images */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-4 relative"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {/* Decorative background blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-transparent to-pink-100/40 rounded-3xl blur-3xl -z-10" />
          
          {CUISINE_OPTIONS.map((cuisine) => (
            <motion.div
              key={cuisine.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
            >
              <SelectionCard
                id={cuisine.id}
                label={cuisine.label}
                icon={cuisine.flag}
                description={cuisineDescriptions[cuisine.id]}
                selected={data.favoriteCuisines.includes(cuisine.id)}
                onSelect={toggleCuisine}
                image={cuisineImages[cuisine.id]}
                size="large"
                className="min-h-[130px]"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Selected cuisines preview */}
        <AnimatePresence>
          {data.favoriteCuisines.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Selected:</span>
                {data.favoriteCuisines.map((cuisineId) => {
                  const cuisine = CUISINE_OPTIONS.find(c => c.id === cuisineId);
                  return (
                    <motion.span
                      key={cuisineId}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      layout
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {cuisine?.flag} {cuisine?.label}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Suggestion */}
        <AITipBox 
          tip={getAITip()}
          icon="sparkles"
          variant={data.favoriteCuisines.length >= 3 ? "highlight" : "default"}
        />

        {/* "Try something new" prompt */}
        {data.favoriteCuisines.length > 0 && data.favoriteCuisines.length < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Sparkles className="w-4 h-4" />
              <span>Tip: Select at least 3 cuisines for more variety</span>
            </button>
          </motion.div>
        )}
      </div>
    </StepContainer>
  );
}
