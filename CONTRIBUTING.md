# Contributing to AnyFeast

## Development Setup

### Prerequisites
- Node.js 16+ and npm
- Git
- Code editor (VS Code recommended)

### Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd Anyfeast

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

Understanding the codebase:

```
src/
├── components/
│   ├── ui/              # Reusable UI components (buttons, inputs, cards)
│   ├── layout/          # Layout components (header, footer)
│   └── onboarding/      # Onboarding-specific components
│       ├── steps/       # Individual step components
│       ├── OnboardingFlow.tsx    # Main orchestrator
│       ├── StepContainer.tsx     # Step wrapper component
│       └── SelectionCard.tsx     # Card for options
├── hooks/
│   └── useOnboarding.ts    # State management hook
├── types/
│   └── onboarding.ts       # TypeScript definitions
├── lib/
│   └── utils.ts            # Utility functions
└── assets/                 # Images and static files
```

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new files
- Define interfaces for props and data structures
- Avoid `any` type - use proper types

### Components
- Use functional components with hooks
- Extract complex logic into custom hooks
- Keep components focused and single-purpose
- Use meaningful prop names

### Naming Conventions
- Components: PascalCase (`UserProfile.tsx`)
- Files: PascalCase for components, camelCase for utilities
- Functions: camelCase (`handleClick`, `fetchData`)
- Constants: UPPER_SNAKE_CASE (`API_KEY`, `MAX_ITEMS`)

### Comments
- Add comments for complex logic
- Explain "why" not "what" (code should be self-explanatory)
- Use JSDoc for functions and components
- Keep comments updated with code changes

Example:
```typescript
/**
 * Validates user input for the onboarding form
 * Returns true if all required fields are filled correctly
 */
function validateForm(data: OnboardingData): boolean {
  // Email must contain @ symbol
  if (!data.email.includes('@')) return false;
  
  // Password must be at least 8 characters
  if (data.password.length < 8) return false;
  
  return true;
}
```

## Making Changes

### Branch Strategy
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add: brief description of changes"

# Push to repository
git push origin feature/your-feature-name
```

### Commit Messages
Follow conventional commits:
- `Add:` New features
- `Fix:` Bug fixes
- `Update:` Changes to existing features
- `Refactor:` Code restructuring
- `Docs:` Documentation changes
- `Style:` Formatting, missing semi colons, etc.

Examples:
```
Add: AI chatbot with Gemini integration
Fix: Validation error on account step
Update: Improved mobile responsiveness
Refactor: Extract meal plan logic to hook
```

## Common Tasks

### Adding a New Onboarding Step

1. **Create step component** in `src/components/onboarding/steps/`:
```typescript
// src/components/onboarding/steps/NewStep.tsx
import { StepContainer } from '../StepContainer';
import { OnboardingData } from '@/types/onboarding';

interface NewStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

export function NewStep({ data, updateData, ...rest }: NewStepProps) {
  return (
    <StepContainer
      title="Your Title"
      subtitle="Your subtitle"
      {...rest}
    >
      {/* Your content */}
    </StepContainer>
  );
}
```

2. **Add to OnboardingFlow** (`src/components/onboarding/OnboardingFlow.tsx`):
```typescript
case 5: // Your step number
  return <NewStep {...commonProps} />;
```

3. **Update total steps** in `src/hooks/useOnboarding.ts`:
```typescript
const TOTAL_STEPS = 12; // Increment by 1
```

4. **Add validation** in `useOnboarding.ts`:
```typescript
case 5: // Your step number
  return data.yourField !== ''; // Your validation logic
```

### Modifying Dietary/Cuisine Options

Edit `src/types/onboarding.ts`:
```typescript
export const DIETARY_OPTIONS = [
  {
    id: 'unique-id',
    label: 'Display Name',
    description: 'Description text',
    emoji: '🥗'
  },
  // ... existing options
];
```

### Changing AI Behavior

Edit `src/components/ui/AIChatbot.tsx`:

1. **Modify system context** (line ~58):
```typescript
const systemContext = `Your custom instructions...`;
```

2. **Add fallback responses** (line ~120):
```typescript
if (userMessage.toLowerCase().includes('keyword')) {
  return "Your custom response";
}
```

### Styling Changes

- **Colors**: Edit `tailwind.config.ts` for theme colors
- **Global styles**: Edit `src/index.css`
- **Component styles**: Use Tailwind classes inline

Example:
```typescript
<div className="bg-primary text-white p-4 rounded-lg shadow-md">
  Content
</div>
```

## Testing

### Manual Testing Checklist
- [ ] Test all onboarding steps
- [ ] Verify form validation works
- [ ] Check mobile responsiveness
- [ ] Test AI chatbot functionality
- [ ] Verify data persistence (refresh page)
- [ ] Test navigation (back/forward buttons)

### Running Tests
```bash
npm test
```

## Build and Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview  # Preview production build locally
```

### Deployment
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting service
3. Set environment variables if needed

## Troubleshooting

### Common Issues

**Build fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules .vite
npm install
```

**Type errors:**
```bash
# Check TypeScript
npx tsc --noEmit
```

**Styling not working:**
- Check Tailwind classes are correct
- Verify `index.css` is imported in `main.tsx`
- Clear browser cache

**AI chatbot not working:**
- Check browser console for errors
- Verify API key is set
- Check network connection

## Best Practices

1. **Keep components small** - If a component is over 200 lines, consider splitting it
2. **Use TypeScript** - Always define types for props and state
3. **Performance** - Use `useMemo` and `useCallback` for expensive operations
4. **Accessibility** - Add ARIA labels where needed
5. **Mobile-first** - Design for mobile, then enhance for desktop
6. **Comments** - Add comments for complex logic, not obvious code
7. **Testing** - Test your changes across different screen sizes
8. **Git** - Commit frequently with meaningful messages

## Questions?

If you're stuck or need clarification:
1. Check this guide first
2. Look at existing code examples
3. Review component structure
4. Check the main README.md

## Code Review Guidelines

Before submitting:
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Comments added where needed
- [ ] TypeScript types defined
- [ ] Commit messages are clear

Happy coding! 🚀
