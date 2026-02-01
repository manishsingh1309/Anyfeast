import { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { OnboardingData, PLAN_OPTIONS } from '@/types/onboarding';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Shield, Star, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PaymentStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

export function PaymentStep({
  data,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
}: PaymentStepProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const selectedPlan = PLAN_OPTIONS.find(p => p.id === data.selectedPlan) || PLAN_OPTIONS[1];
  const subtotal = selectedPlan.price;
  const discount = subtotal * 0.5;
  const total = subtotal - discount;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <StepContainer
      title="Complete Your Order"
      subtitle="Secure checkout powered by Stripe"
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={true}
      isLastStep
    >
      {/* Demo Mode Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-accent/20 border border-accent rounded-xl p-3 mb-6 flex items-center gap-2"
      >
        <AlertCircle className="w-5 h-5 text-accent" />
        <p className="text-sm">
          <strong>Demo Mode:</strong> Use card <code className="bg-accent/30 px-1 rounded">4242 4242 4242 4242</code> for testing
        </p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Payment Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 space-y-6"
        >
          {/* Payment Methods */}
          <div className="flex gap-3">
            <Button variant="default" className="flex-1 gap-2">
              <CreditCard className="w-4 h-4" />
              Card
            </Button>
            <Button variant="outline" className="flex-1">PayPal</Button>
            <Button variant="outline" className="flex-1">Apple Pay</Button>
          </div>

          {/* Card Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-sm font-medium mb-1">Delivery Address</p>
            <p className="text-sm text-muted-foreground">
              {data.postcode || 'SW1A 1AA'}, United Kingdom
            </p>
          </div>

          {/* Promo Code */}
          <div className="flex gap-2">
            <Input
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button variant="outline">Apply</Button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              256-bit SSL
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              Money-Back Guarantee
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4" />
              10k+ Reviews
            </div>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2"
        >
          <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-32">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{selectedPlan.name} Plan</span>
                <span>{selectedPlan.meals} meals/week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>New Member Discount</span>
                <span>-£{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>Delivery</span>
                <span>FREE</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">£{total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Then £{subtotal.toFixed(2)}/week after first box
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-transparent to-emerald-100/50 rounded-3xl blur-3xl -z-10 pointer-events-none" style={{ top: '-100px', bottom: '-100px', left: '-50px', right: '-50px' }} />
    </StepContainer>
  );
}
