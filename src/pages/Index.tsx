import { useState, forwardRef } from 'react';
import { WelcomeScreen } from '@/components/onboarding/WelcomeScreen';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { AnimatePresence, motion } from 'framer-motion';

// Wrap components in forwardRef for AnimatePresence
const MotionWelcome = forwardRef<HTMLDivElement, { onStart: () => void }>(
  ({ onStart }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <WelcomeScreen onStart={onStart} />
    </motion.div>
  )
);
MotionWelcome.displayName = 'MotionWelcome';

const MotionOnboarding = forwardRef<HTMLDivElement>((_, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <OnboardingFlow />
  </motion.div>
));
MotionOnboarding.displayName = 'MotionOnboarding';

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!hasStarted ? (
        <MotionWelcome key="welcome" onStart={() => setHasStarted(true)} />
      ) : (
        <MotionOnboarding key="onboarding" />
      )}
    </AnimatePresence>
  );
};

export default Index;
