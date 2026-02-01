import { useState, useMemo } from 'react';
import { StepContainer } from '../StepContainer';
import { OnboardingData } from '@/types/onboarding';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { User, Mail, Lock, Eye, EyeOff, Check, X } from 'lucide-react';

interface AccountStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

export function AccountStep({
  data,
  updateData,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
  canProceed,
}: AccountStepProps) {
  const [showPassword, setShowPassword] = useState(false);

  const passwordChecks = useMemo(() => {
    const pwd = data.password || '';
    return {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
  }, [data.password]);

  const passwordStrength = useMemo(() => {
    const checks = Object.values(passwordChecks);
    const passed = checks.filter(Boolean).length;
    if (passed <= 1) return { label: 'Weak', color: 'bg-destructive', width: '25%' };
    if (passed === 2) return { label: 'Fair', color: 'bg-accent', width: '50%' };
    if (passed === 3) return { label: 'Good', color: 'bg-secondary', width: '75%' };
    return { label: 'Strong', color: 'bg-success', width: '100%' };
  }, [passwordChecks]);

  const emailValid = data.email.includes('@') && data.email.includes('.');

  return (
    <StepContainer
      title="Create your account"
      subtitle="Secure your personalized experience"
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={canProceed}
    >
      {/* Social Login */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3 mb-6"
      >
        <Button
          variant="outline"
          className="w-full justify-center gap-3 h-12"
          type="button"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </Button>
        
        <Button
          variant="outline"
          className="w-full justify-center gap-3 h-12"
          type="button"
        >
          <svg className="w-5 h-5" fill="#000" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          Continue with Apple
        </Button>
      </motion.div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      {/* Form Fields */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              className={data.email && emailValid ? 'pr-10 border-success' : ''}
            />
            {data.email && emailValid && (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
            )}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={data.password}
              onChange={(e) => updateData({ password: e.target.value })}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Strength */}
          {data.password && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: passwordStrength.width }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {passwordStrength.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { check: passwordChecks.length, label: 'At least 8 characters' },
                  { check: passwordChecks.uppercase, label: 'One uppercase letter' },
                  { check: passwordChecks.number, label: 'One number' },
                  { check: passwordChecks.special, label: 'One special character' },
                ].map(({ check, label }) => (
                  <div key={label} className="flex items-center gap-1">
                    {check ? (
                      <Check className="w-3 h-3 text-success" />
                    ) : (
                      <X className="w-3 h-3 text-muted-foreground" />
                    )}
                    <span className={check ? 'text-foreground' : 'text-muted-foreground'}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 pt-4">
          <Checkbox
            id="terms"
            checked={data.agreedToTerms}
            onCheckedChange={(checked) => updateData({ agreedToTerms: checked as boolean })}
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
            I agree to the{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </label>
        </div>
      </motion.div>

      <p className="text-sm text-muted-foreground mt-6 text-center">
        Already have an account?{' '}
        <button className="text-primary hover:underline">Sign In</button>
      </p>
      
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 via-transparent to-purple-100/50 rounded-3xl blur-3xl -z-10 pointer-events-none" style={{ top: '-100px', bottom: '-100px', left: '-50px', right: '-50px' }} />
    </StepContainer>
  );
}
