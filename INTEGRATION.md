# Integration Guide

## Quick Start

Run the development server:
```bash
npm run dev
```

Visit: http://localhost:5173

## File Structure Overview

```
EXAMPREPAPP/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Icon.jsx
│   │   └── sections/        # Page sections
│   │       ├── Navigation.jsx
│   │       ├── Hero.jsx
│   │       ├── Stats.jsx
│   │       ├── Subjects.jsx
│   │       ├── Features.jsx
│   │       ├── Testimonials.jsx
│   │       └── Footer.jsx
│   ├── data/
│   │   └── subjects.js      # Mock data
│   ├── services/
│   │   └── api.js           # API integration layer
│   ├── App.jsx              # Main app
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── package.json
```

## Connecting to Your Backend

### Step 1: Configure Environment
Create `.env` file:
```
VITE_API_URL=http://localhost:8000
```

### Step 2: Use API Service
```jsx
import { api } from './services/api';

// In your component
const [subjects, setSubjects] = useState([]);

useEffect(() => {
  api.getSubjects()
    .then(data => setSubjects(data))
    .catch(error => console.error(error));
}, []);
```

### Step 3: Replace Mock Data
Update `src/data/subjects.js` or fetch from API dynamically.

## Adding New Pages

1. Create component in `src/components/sections/`
2. Import in `App.jsx`
3. Add to component tree

Example:
```jsx
// src/components/sections/Practice.jsx
export const Practice = () => {
  return <div>Practice Page</div>;
};

// App.jsx
import { Practice } from './components/sections/Practice';

function App() {
  return (
    <>
      <Navigation />
      <Practice />
      <Footer />
    </>
  );
}
```

## Styling Guidelines

Use Tailwind utility classes:
- Primary color: `bg-primary`, `text-primary`
- Dark mode: `dark:bg-slate-800`
- Hover: `hover:bg-primary/90`
- Transitions: `transition-all`

## Component Examples

### Creating a New UI Component
```jsx
// src/components/ui/Badge.jsx
export const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-800',
    primary: 'bg-primary/10 text-primary',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${variants[variant]}`}>
      {children}
    </span>
  );
};
```

### Using State Management
```jsx
import { useState } from 'react';

const [selectedSubject, setSelectedSubject] = useState(null);

<SubjectCard 
  onClick={() => setSelectedSubject(subject.id)}
  selected={selectedSubject === subject.id}
/>
```

## Deployment

### Build for Production
```bash
npm run build
```

Output: `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## Browser Testing Checklist
- [ ] Chrome/Edge (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)
- [ ] Dark mode toggle
- [ ] Responsive breakpoints (sm, md, lg, xl)

## Performance Tips
- Images are already optimized via CDN
- Lazy load sections if needed
- Use React.memo for expensive components
- Consider code splitting for large features
