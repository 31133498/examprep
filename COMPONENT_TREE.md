# Component Tree

```
App
├── Navigation
│   ├── Logo (Icon + Text)
│   ├── NavLinks (Desktop only)
│   └── Actions
│       ├── Button (Login - Ghost variant)
│       └── Button (Get Started - Primary variant)
│
├── Hero
│   ├── Badge (JAMB 2024 with ping animation)
│   ├── Heading
│   ├── Description
│   ├── CTAs
│   │   ├── Button (Start Practicing - Primary)
│   │   └── Button (How it Works - Secondary)
│   ├── SocialProof (Student avatars + stats)
│   └── MockExamCard
│       ├── Card
│       ├── Timer Display
│       ├── Question
│       ├── OptionButton (x3)
│       └── Progress Indicators
│
├── Stats
│   └── StatItem (x4)
│       ├── Value
│       └── Label
│
├── Subjects
│   ├── SectionHeader
│   │   ├── Title + Description
│   │   └── ViewAllButton
│   └── SubjectCard (x4)
│       ├── Card (with hover effect)
│       ├── IconContainer
│       │   └── Icon
│       ├── Title
│       ├── Description
│       └── Footer
│           ├── QuestionCount
│           └── ArrowButton
│
├── Features
│   ├── SectionHeader
│   └── FeatureItem (x3)
│       ├── IconContainer
│       │   └── Icon
│       ├── Title
│       └── Description
│
├── Testimonials
│   ├── Container (Primary background)
│   ├── QuoteIcon (decorative)
│   ├── TestimonialsColumn
│   │   ├── SectionTitle
│   │   └── TestimonialItem (x2)
│   │       ├── Avatar
│   │       ├── Quote
│   │       └── Attribution
│   └── LeaderboardColumn (Desktop only)
│       ├── Card (Glass effect)
│       ├── Header (with LIVE badge)
│       ├── LeaderboardEntry (x3)
│       │   ├── Rank
│       │   ├── Avatar
│       │   ├── Name
│       │   └── Score
│       └── JoinButton
│
└── Footer
    ├── BrandColumn
    │   ├── Logo
    │   ├── Description
    │   └── SocialLinks (x3)
    ├── FooterColumn (Exam Tools)
    ├── FooterColumn (Company)
    ├── ContactColumn
    │   └── ContactItem (x3)
    │       ├── Icon
    │       └── Text
    └── Copyright
```

## Reusable UI Primitives

### Button
- Variants: primary, secondary, ghost
- Sizes: sm, md, lg
- Optional icon support
- Hover and focus states

### Card
- Base styling with borders
- Optional hover effects
- Dark mode support
- Flexible content

### Icon
- Material Icons wrapper
- Size variants: sm, base, lg, xl
- Color customization
- Consistent rendering

## Data Flow

```
subjects.js (Mock Data)
    ↓
Subjects Component
    ↓
SubjectCard (x4)
    ↓
Renders with props
```

## Future: API Integration

```
api.js (Service Layer)
    ↓
React Component (useEffect)
    ↓
State Management (useState)
    ↓
Render with real data
```

## State Management (Current)

- **Local State**: Component-level (useState)
- **Props**: Parent to child data flow
- **No Global State**: Not needed for landing page

## State Management (Future)

For full app with practice tests:
- React Context for user session
- React Query for server state
- Local storage for preferences
