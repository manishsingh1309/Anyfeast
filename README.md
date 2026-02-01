# AnyFeast - AI-Powered Meal Kit Service

A modern, responsive web application for personalized meal kit delivery with AI-powered recipe suggestions and chatbot assistance.

## 🚀 Features

- **Smart Onboarding Flow**: 11-step personalized experience to understand user preferences
- **AI Chatbot Integration**: Real-time assistance powered by Google Gemini AI
- **Beautiful UI**: Modern design with smooth animations and gradient backgrounds
- **Dietary Customization**: Support for various diets (Vegan, Keto, Paleo, etc.)
- **Cuisine Selection**: 11 international cuisines with high-quality imagery
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Meal Plan Generator**: AI-generated weekly meal plans based on preferences

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **AI Integration**: Google Gemini API
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, Card, etc.)
│   ├── layout/         # Layout components (Header)
│   └── onboarding/     # Onboarding flow components
│       ├── steps/      # Individual onboarding steps
│       └── OnboardingFlow.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── assets/             # Images and static assets
```

## 🏗️ Architecture

### Component Hierarchy

```
App → Index → OnboardingFlow → Individual Steps → AIChatbot
```

**OnboardingFlow** manages the entire user journey through 11 steps:
1. Welcome → 2. Household → 3. Dietary → 4. Allergies → 5. Cuisines → 
6. Cooking Experience → 7. Delivery → 8. Account → 9. Meal Plan → 
10. Preview → 11. Payment → Success

### State Management

- **useOnboarding** hook: Centralized state for the onboarding process
  - Tracks current step and form data
  - Validates user inputs
  - Handles navigation between steps

### Key Components

**OnboardingFlow** (`src/components/onboarding/OnboardingFlow.tsx`)
- Orchestrates step transitions
- Manages AI chatbot integration
- Passes data between steps

**StepContainer** (`src/components/onboarding/StepContainer.tsx`)
- Provides consistent layout for all steps
- Handles navigation and progress display

**AIChatbot** (`src/components/ui/AIChatbot.tsx`)
- AI-powered assistant using Google Gemini
- Context-aware responses
- Fallback system for offline capability

## 🎨 Styling

Custom Tailwind theme with brand colors:
- **Primary**: Orange (#FF6B35)
- **Accent**: Teal (#4ECDC4)  
- **Secondary**: Yellow (#FFE66D)

Each onboarding step has a unique gradient background for visual variety.

## 🔧 Common Modifications

### Adding a New Onboarding Step

1. Create component in `src/components/onboarding/steps/`
2. Add case to switch in `OnboardingFlow.tsx`
3. Update `totalSteps` in `useOnboarding.ts`

### Modifying AI Chatbot

Edit `src/components/ui/AIChatbot.tsx`:
- Line ~55: System context/instructions
- Line ~115: Fallback responses

### Updating Options (Diets, Cuisines, etc.)

Edit `src/types/onboarding.ts`:
```typescript
export const DIETARY_OPTIONS = [
  { id: 'new-option', label: 'Label', description: '...', emoji: '🥗' }
]
```

## 📦 Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔑 Configuration

The Google Gemini API key is currently in `src/components/ui/AIChatbot.tsx`.  
For production, use environment variables:

```env
VITE_GEMINI_API_KEY=your_key_here
```

## 🎯 Features Explained

### Onboarding Flow
Collects user preferences through an intuitive multi-step process:
- Household details and dietary requirements
- Cuisine preferences with visual selection
- Cooking skills and delivery options
- Account setup and payment

### AI Meal Plan
Generates personalized 7-day meal plans considering:
- Dietary restrictions
- Cuisine preferences  
- Household size
- Cooking skill level

### Smart Chatbot
- Provides contextual help at each step
- Answers questions about meals, recipes, diets
- Offers quick suggestion buttons
- Beautiful animated interface

## 🐛 Troubleshooting

**Chatbot issues**: Check browser console for API errors. Fallback responses work offline.

**Build errors**: Clear cache with `rm -rf node_modules .vite && npm install`

## 🚀 Deployment

Build the project and deploy the `dist/` folder to any static hosting service (Vercel, Netlify, etc.)

## 📄 License

Private and proprietary.

## 👥 Author

Manish Singh Chouhan
