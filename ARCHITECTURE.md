# Architecture Documentation

## System Overview

AnyFeast is a single-page React application built with modern web technologies focusing on user experience and maintainability.

### Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and optimized builds)
- **Styling**: Tailwind CSS + Custom CSS
- **UI Library**: Shadcn/ui (accessible component primitives)
- **Animation**: Framer Motion
- **State**: React Hooks (useState, useCallback, useMemo)
- **Routing**: React Router DOM
- **AI Integration**: Google Gemini API

## Architecture Patterns

### Component Architecture

```
┌─────────────────────────────────────────┐
│           App.tsx (Router)              │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
   ┌────▼────┐         ┌─────▼──────┐
   │  Index  │         │  NotFound  │
   └────┬────┘         └────────────┘
        │
   ┌────▼──────────────┐
   │  WelcomeScreen    │
   │  OnboardingFlow   │
   └────┬──────────────┘
        │
        ├── StepContainer (wrapper)
        ├── Step Components (11 steps)
        └── AIChatbot (floating)
```

### Data Flow

```
User Input → Component → Hook → State Update → Re-render
                ↓
         localStorage (persistence)
```

**Flow Example:**
1. User selects dietary preference
2. `DietaryStep` calls `updateData({ dietaryPreferences: [...] })`
3. `useOnboarding` hook updates state
4. State is persisted to localStorage
5. Component re-renders with new data
6. Progress bar updates

## Core Concepts

### 1. State Management (useOnboarding Hook)

**Location**: `src/hooks/useOnboarding.ts`

**Purpose**: Centralized state for entire onboarding flow

**What it manages:**
- Current step index
- Form data (all user selections)
- Progress calculation
- Validation logic
- Navigation functions

**Key functions:**
```typescript
updateData()  // Update specific form fields
nextStep()    // Move to next step
prevStep()    // Go back
canProceed()  // Validation for current step
restart()     // Reset everything
```

**Why this approach:**
- Single source of truth for form state
- Easy to persist data (one localStorage entry)
- Simple to add/remove fields
- Predictable state updates

### 2. Step Components

**Pattern**: All steps follow same interface

```typescript
interface StepProps {
  data: OnboardingData;           // Current form data
  updateData: (updates) => void;  // Update function
  currentStep: number;            // Current position
  totalSteps: number;             // Total count
  progress: number;               // Progress percentage
  onNext: () => void;             // Next button handler
  onPrev: () => void;             // Back button handler
  canProceed: boolean;            // Can move forward?
}
```

**Benefits:**
- Consistent interface
- Easy to test
- Swappable components
- Clear dependencies

### 3. StepContainer (Layout Component)

**Location**: `src/components/onboarding/StepContainer.tsx`

**Purpose**: Provides consistent layout for all steps

**What it handles:**
- Title and subtitle display
- Progress bar rendering
- Navigation buttons (Next/Back)
- Animations between steps
- Color theming per step

**Why separate:**
- Reduces code duplication
- Enforces consistent UI
- Easy to modify all steps at once
- Separates layout from content

### 4. AI Chatbot Integration

**Location**: `src/components/ui/AIChatbot.tsx`

**Architecture:**
```
User Message → Generate Context → API Call → Response
                                    ↓ (on fail)
                               Fallback Logic
```

**Context Generation:**
- Current step information
- User's selected preferences
- Quick suggestions per step

**Fallback System:**
- Keyword-based responses
- Works offline
- Maintains user experience

**Why this design:**
- Graceful degradation
- Context-aware assistance
- Non-blocking (doesn't halt onboarding)

## Data Persistence

### localStorage Strategy

**Key**: `'anyfeast-onboarding'`
**Format**: JSON string of OnboardingData

**When saved:**
- On every data update (useEffect in useOnboarding)

**When loaded:**
- On initial app mount
- Merged with default values

**Why localStorage:**
- Persists across page refreshes
- No backend needed for demo
- Fast access
- Simple implementation

**Production consideration:**
- Could be replaced with API calls
- Add encryption for sensitive data
- Implement sync with backend

## Validation Strategy

### Two-level Validation

**1. Field-level (in components):**
```typescript
<Input
  type="email"
  pattern="[^@]+@[^@]+"  // HTML5 validation
  required
/>
```

**2. Step-level (in canProceed):**
```typescript
case 4: // Cuisines
  return data.favoriteCuisines.length >= 3;
```

**Why two levels:**
- Immediate feedback (field-level)
- Prevents progression (step-level)
- Better UX
- Clear error states

## Styling Architecture

### Tailwind + Custom CSS

**Tailwind** (`tailwind.config.ts`):
- Theme colors
- Spacing system
- Responsive breakpoints

**Custom CSS** (`src/index.css`):
- CSS variables
- Global styles
- Utility classes
- Animations

### Component Styling Pattern

```typescript
// Inline Tailwind for component-specific styles
<div className="bg-primary text-white p-4">

// Custom classes for reusable patterns
<div className="text-gradient">

// Framer Motion for animations
<motion.div animate={{ opacity: 1 }}>
```

### Theme System

**CSS Variables** (defined in index.css):
```css
:root {
  --primary: #FF6B35;      /* Orange - main brand */
  --accent: #4ECDC4;       /* Teal - secondary */
  --secondary: #FFE66D;    /* Yellow - tertiary */
}
```

**Usage:**
```typescript
<div className="bg-primary">  // Uses var(--primary)
```

**Why this approach:**
- Easy theme switching
- Consistent colors
- Tailwind integration
- CSS variables for dynamic styles

## Performance Optimizations

### 1. Component Optimization

```typescript
// Memoize expensive calculations
const suggestions = useMemo(() => {
  return generateSuggestions(currentStep);
}, [currentStep]);

// Memoize callbacks
const handleUpdate = useCallback((value) => {
  updateData({ field: value });
}, [updateData]);
```

### 2. Code Splitting

- React.lazy for routes (if expanded)
- Dynamic imports for heavy components

### 3. Image Optimization

- Appropriately sized images
- WebP format support
- Lazy loading for below-fold images

### 4. Animation Performance

- Framer Motion uses GPU acceleration
- AnimatePresence for mount/unmount
- Transform properties (not layout properties)

## Security Considerations

### Current Implementation

**API Key:**
- Currently client-side
- Acceptable for demo/MVP

**For Production:**
1. Move API calls to backend
2. Implement rate limiting
3. Add authentication
4. Encrypt sensitive data
5. Sanitize user inputs

### Data Sanitization

```typescript
// Before storing
const sanitized = input.trim().slice(0, MAX_LENGTH);

// Before displaying
<div>{sanitize(userContent)}</div>
```

## Scalability Considerations

### Adding Features

**New onboarding step:**
1. Create component in `steps/`
2. Add case in OnboardingFlow
3. Update TOTAL_STEPS
4. Add validation

**New data field:**
1. Add to OnboardingData type
2. Add to initialData
3. Update relevant step

### Backend Integration

**Current**: All client-side
**Future**: Can add:
```typescript
// In useOnboarding
const saveToBackend = async (data) => {
  await api.post('/onboarding', data);
};

useEffect(() => {
  saveToBackend(data);
}, [data]);
```

### Testing Strategy

**Unit Tests:**
- Validation functions
- Utility functions
- Custom hooks

**Integration Tests:**
- Step navigation
- Data persistence
- Form submission

**E2E Tests:**
- Complete onboarding flow
- AI chatbot interaction

## File Organization Principles

### By Feature
```
onboarding/
  ├── steps/          # Step implementations
  ├── OnboardingFlow  # Orchestrator
  └── StepContainer   # Layout
```

### By Type
```
ui/           # Reusable components
hooks/        # Custom hooks
types/        # TypeScript definitions
```

### Why this structure:
- Easy to locate files
- Clear dependencies
- Scales with project size
- Follows React community standards

## Error Handling

### Strategy

**1. UI Level:**
```typescript
try {
  await riskyOperation();
} catch (error) {
  setError('User-friendly message');
}
```

**2. Validation Errors:**
```typescript
if (!isValid) {
  return <ErrorMessage />;
}
```

**3. API Errors:**
```typescript
// Graceful fallback
const response = await apiCall().catch(() => fallbackData);
```

### Error Boundaries

**Future improvement:**
```typescript
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

## Build & Deployment

### Build Process

```bash
npm run build
```

**Output**: `dist/` folder with:
- Minified JavaScript
- Optimized CSS
- Processed images
- Index.html

### Environment Variables

**Development**: `.env.local`
**Production**: Set in hosting platform

```env
VITE_GEMINI_API_KEY=xxx
VITE_API_URL=xxx
```

### Deployment Targets

- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: CloudFlare, AWS CloudFront
- **Docker**: Containerized deployment

## Monitoring & Analytics

### Future Additions

**Analytics:**
- Track step completion rates
- Measure drop-off points
- Monitor chatbot usage

**Error Tracking:**
- Sentry for runtime errors
- API error logging
- User feedback collection

**Performance:**
- Core Web Vitals tracking
- Page load times
- API response times

---

This architecture is designed to be:
- **Maintainable**: Clear structure, documented patterns
- **Scalable**: Easy to add features
- **Performant**: Optimized rendering and data flow
- **Secure**: Best practices for client-side apps
- **Testable**: Modular components, pure functions
