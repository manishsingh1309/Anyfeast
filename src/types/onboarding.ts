export interface OnboardingData {
  // Step 1: Household
  householdSize: number;
  
  // Step 2: Dietary Preferences
  dietaryPreferences: string[];
  
  // Step 3: Allergies
  allergies: string[];
  customAllergies: string[];
  
  // Step 4: Cuisines
  favoriteCuisines: string[];
  
  // Step 5: Cooking Experience
  cookingGoal: string;
  skillLevel: string;
  cookingTime: number;
  
  // Step 6: Delivery
  postcode: string;
  deliveryFrequency: string;
  deliveryDays: string[];
  
  // Step 7: Account
  fullName: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
  
  // Step 8: Plan Selection
  selectedPlan: string;
  
  // Legacy - keeping for compatibility
  mealsPerWeek: number;
}

export const DIETARY_OPTIONS = [
  { id: 'vegetarian', label: 'Vegetarian', emoji: '🥗', description: 'Plant-based with dairy & eggs' },
  { id: 'vegan', label: 'Vegan', emoji: '🌱', description: '100% plant-based' },
  { id: 'non-vegetarian', label: 'Non-Vegetarian', emoji: '🥩', description: 'Everything goes' },
  { id: 'pescatarian', label: 'Pescatarian', emoji: '🐟', description: 'Fish & seafood' },
  { id: 'keto', label: 'Keto / Low-Carb', emoji: '🥑', description: 'High fat, low carb' },
  { id: 'gluten-free', label: 'Gluten-Free', emoji: '🌾', description: 'No wheat or gluten' },
  { id: 'paleo', label: 'Paleo', emoji: '🥓', description: 'Whole foods only' },
  { id: 'none', label: 'No Preference', emoji: '⚖️', description: 'Balanced eating' },
] as const;

export const ALLERGY_OPTIONS = [
  { id: 'nuts', label: 'Nuts & Peanuts', emoji: '🥜' },
  { id: 'dairy', label: 'Dairy', emoji: '🥛' },
  { id: 'eggs', label: 'Eggs', emoji: '🥚' },
  { id: 'gluten', label: 'Gluten', emoji: '🌾' },
  { id: 'shellfish', label: 'Shellfish', emoji: '🦐' },
  { id: 'fish', label: 'Fish', emoji: '🐟' },
  { id: 'spicy', label: 'Spicy Food', emoji: '🌶️' },
  { id: 'garlic-onions', label: 'Garlic & Onions', emoji: '🧄' },
  { id: 'nightshades', label: 'Nightshades', emoji: '🍅' },
  { id: 'soy', label: 'Soy', emoji: '🫛' },
] as const;

export const CUISINE_OPTIONS = [
  { id: 'indian', label: 'Indian', flag: '🇮🇳', image: 'cuisine-indian.jpg' },
  { id: 'italian', label: 'Italian', flag: '🇮🇹', image: 'cuisine-italian.jpg' },
  { id: 'chinese', label: 'Chinese', flag: '🇨🇳', image: 'cuisine-chinese.jpg' },
  { id: 'japanese', label: 'Japanese', flag: '🇯🇵', image: 'cuisine-japanese.jpg' },
  { id: 'mexican', label: 'Mexican', flag: '🇲🇽', image: 'cuisine-mexican.jpg' },
  { id: 'thai', label: 'Thai', flag: '🇹🇭', image: 'cuisine-thai.jpg' },
  { id: 'french', label: 'French', flag: '🇫🇷' },
  { id: 'greek', label: 'Greek', flag: '🇬🇷' },
  { id: 'korean', label: 'Korean', flag: '🇰🇷' },
  { id: 'moroccan', label: 'Moroccan', flag: '🇲🇦' },
  { id: 'spanish', label: 'Spanish', flag: '🇪🇸' },
  { id: 'surprise', label: 'Surprise Me!', flag: '🌍' },
] as const;

export const SKILL_OPTIONS = [
  { id: 'beginner', label: 'Beginner', emoji: '👶', description: 'Just starting out' },
  { id: 'intermediate', label: 'Intermediate', emoji: '🔧', description: 'Comfortable cooking' },
  { id: 'advanced', label: 'Advanced', emoji: '👨‍🍳', description: 'Love experimenting' },
  { id: 'pro', label: 'Pro', emoji: '🌟', description: 'MasterChef level' },
] as const;

export const TIME_OPTIONS = [
  { id: '15-20', label: '15-20 mins', emoji: '⚡', description: 'Quick & Easy' },
  { id: '30-40', label: '30-40 mins', emoji: '🕐', description: 'Balanced' },
  { id: '45-60', label: '45-60 mins', emoji: '🕐🕐', description: 'Leisurely' },
  { id: '60+', label: '60+ mins', emoji: '🕐🕐🕐', description: 'Weekend Projects' },
] as const;

export const GOAL_OPTIONS = [
  { id: 'save-time', label: 'Save Time', description: 'Quick & easy meals for busy days', icon: '⏱️' },
  { id: 'eat-healthy', label: 'Eat Healthier', description: 'Nutritious meals for better living', icon: '💪' },
  { id: 'learn-cooking', label: 'Learn to Cook', description: 'Develop new culinary skills', icon: '👨‍🍳' },
  { id: 'explore-cuisines', label: 'Explore Cuisines', description: 'Discover flavors from around the world', icon: '🌍' },
  { id: 'family-meals', label: 'Family Meals', description: 'Bring everyone to the table', icon: '👨‍👩‍👧‍👦' },
  { id: 'budget-friendly', label: 'Save Money', description: 'Delicious meals on a budget', icon: '💰' },
] as const;

export const DELIVERY_FREQUENCY_OPTIONS = [
  { id: 'weekly', label: 'Once a week', emoji: '📦' },
  { id: 'biweekly', label: 'Twice a week', emoji: '📦📦' },
  { id: 'triweekly', label: 'Three times a week', emoji: '📦📦📦' },
] as const;

export const DAY_OPTIONS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export const PLAN_OPTIONS = [
  { id: 'starter', name: 'Starter', meals: 2, price: 35, badge: null },
  { id: 'standard', name: 'Standard', meals: 3, price: 45, badge: 'Most Popular' },
  { id: 'premium', name: 'Premium', meals: 5, price: 65, badge: 'Best Value' },
] as const;
