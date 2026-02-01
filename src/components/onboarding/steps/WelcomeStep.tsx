import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Clock, Sparkles } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

const checklistItems = [
  'Your dietary preferences & allergies',
  'Favorite world cuisines',
  'Cooking skill & time availability',
  'Personalized AI meal plan',
  'Delivery schedule',
];

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-teal-50">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-tl from-secondary/20 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Floating food emojis */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { emoji: '🍳', delay: 0, x: '10%', duration: 15 },
          { emoji: '🥑', delay: 2, x: '80%', duration: 18 },
          { emoji: '🍅', delay: 1, x: '20%', duration: 20 },
          { emoji: '🥕', delay: 3, x: '70%', duration: 16 },
          { emoji: '🌶️', delay: 1.5, x: '90%', duration: 19 },
          { emoji: '🥖', delay: 2.5, x: '15%', duration: 17 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-10"
            style={{ left: item.x }}
            initial={{ y: '100vh', rotate: 0 }}
            animate={{
              y: '-20vh',
              rotate: 360,
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full text-center relative z-10"
      >
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex justify-center mb-8"
        >
          <Logo size="xl" showText={true} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Meal Planning
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
          Your Perfect Meal Journey<br />Starts Here
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          Answer a few quick questions, and we'll create a personalized meal plan<br />tailored just for you.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 shadow-soft mb-8 text-left"
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Takes just 3 minutes</span>
          </div>

          <div className="space-y-3">
            {checklistItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <Button
            onClick={onNext}
            size="lg"
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white shadow-glow px-8 py-6 text-lg gap-2"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Button>

          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button className="text-primary hover:underline font-medium">
              Sign In
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
