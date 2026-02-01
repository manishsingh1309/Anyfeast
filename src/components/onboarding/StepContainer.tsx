import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProgressBar } from './ProgressBar';
import { Header } from '@/components/layout/Header';
import { ChevronLeft, ChevronRight, Sparkles, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip?: () => void;
  canProceed: boolean;
  isLastStep?: boolean;
  showSkip?: boolean;
}

export function StepContainer({
  title,
  subtitle,
  children,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
  onSkip,
  canProceed,
  isLastStep = false,
  showSkip = true,
}: StepContainerProps) {
  // Background image mapping for each step
  const getBackgroundImage = () => {
    const backgrounds = {
      1: 'from-orange-50 via-orange-50/30 to-white', // Household - warm family feel
      2: 'from-green-50 via-emerald-50/30 to-white', // Dietary - fresh, healthy
      3: 'from-red-50 via-rose-50/30 to-white', // Allergies - caution, care
      4: 'from-purple-50 via-violet-50/30 to-white', // Cuisines - diverse, colorful
      5: 'from-blue-50 via-sky-50/30 to-white', // Cooking - calm, learning
      6: 'from-yellow-50 via-amber-50/30 to-white', // Delivery - sunshine, arrival
      7: 'from-indigo-50 via-indigo-50/30 to-white', // Account - professional
      8: 'from-teal-50 via-cyan-50/30 to-white', // Meal Plan - AI, modern
      9: 'from-pink-50 via-pink-50/30 to-white', // Preview - celebration
    };
    return backgrounds[currentStep as keyof typeof backgrounds] || 'from-background via-background to-muted/30';
  };

  return (
    <div className={cn("min-h-screen flex flex-col bg-gradient-to-b relative overflow-hidden", getBackgroundImage())}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating food icons decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-5"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {['🍕', '🍜', '🥗', '🍱', '🥘', '🍝'][i]}
          </motion.div>
        ))}
      </div>

      {/* Minimal header during onboarding */}
      <Header variant="minimal" showNav={false} />
      
      {/* Progress section */}
      <div className="sticky top-16 md:top-20 z-40 bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <ProgressBar 
            progress={progress} 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
          />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            {/* Step header */}
            <div className="text-center space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  Step {currentStep + 1} of {totalSteps}
                </span>
              </motion.div>
              
              <motion.h1
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {title}
              </motion.h1>
              
              {subtitle && (
                <motion.p
                  className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </div>

            {/* Step content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer navigation - enhanced */}
      <footer className="sticky bottom-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Back button */}
            <Button
              variant="ghost"
              size="lg"
              onClick={onPrev}
              disabled={currentStep === 0}
              className={cn(
                "gap-2 transition-all duration-200",
                currentStep === 0 ? "invisible" : "hover:-translate-x-1"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            
            {/* Skip button - center */}
            {showSkip && !isLastStep && onSkip && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSkip}
                className="text-muted-foreground hover:text-foreground gap-1.5"
              >
                Skip for now
                <SkipForward className="w-4 h-4" />
              </Button>
            )}
            
            {/* Continue/Get Started button */}
            <motion.div
              whileHover={{ scale: canProceed ? 1.02 : 1 }}
              whileTap={{ scale: canProceed ? 0.98 : 1 }}
            >
              <Button
                variant={isLastStep ? "hero" : "default"}
                size="lg"
                onClick={onNext}
                disabled={!canProceed}
                className={cn(
                  "min-w-[160px] gap-2 transition-all duration-200",
                  canProceed && !isLastStep && "hover:translate-x-1",
                  isLastStep && "shadow-glow"
                )}
              >
                {isLastStep ? (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Get My Plan
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
