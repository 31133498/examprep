# 🚀 Quick Start Guide

## Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:5173**

## What You'll See

✅ Full JAMB Prep landing page
✅ Navigation with logo and CTAs
✅ Hero section with animated mock exam card
✅ Stats banner (150k+ questions, 50k+ students)
✅ Subject cards (English, Math, Physics, Biology)
✅ Features section (Timed Practice, Leaderboards, Analytics)
✅ Testimonials with live leaderboard
✅ Footer with links and contact info

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable: Button, Card, Icon
│   └── sections/        # Page sections
├── data/                # Mock data
├── services/            # API integration
├── App.jsx              # Main app
└── index.css            # Styles
```

## Key Files

- **App.jsx** - Main component that imports all sections
- **src/components/ui/** - Reusable UI primitives
- **src/components/sections/** - Page sections
- **src/data/subjects.js** - Mock subject data
- **src/services/api.js** - API service layer

## Making Changes

### Update Colors
Edit `src/index.css`:
```css
@theme {
  --color-primary: #008550;  /* Change this */
}
```

### Add New Section
1. Create `src/components/sections/NewSection.jsx`
2. Import in `App.jsx`
3. Add to component tree

### Modify Subjects
Edit `src/data/subjects.js`

### Connect to Backend
Use `src/services/api.js`:
```jsx
import { api } from './services/api';
const data = await api.getSubjects();
```

## Common Tasks

### Add a Button
```jsx
import { Button } from './components/ui/Button';

<Button variant="primary" size="lg" icon="arrow_forward">
  Click Me
</Button>
```

### Add a Card
```jsx
import { Card } from './components/ui/Card';

<Card hover className="p-6">
  Content here
</Card>
```

### Add an Icon
```jsx
import { Icon } from './components/ui/Icon';

<Icon name="school" size="lg" className="text-primary" />
```

## Build for Production

```bash
npm run build
```

Output: `dist/` folder

## Preview Production Build

```bash
npm run preview
```

## Documentation

- **README.md** - Full overview
- **INTEGRATION.md** - Integration guide
- **ENHANCEMENTS.md** - Features list
- **COMPONENT_TREE.md** - Component hierarchy
- **DEPLOYMENT.md** - Deployment info

## Need Help?

1. Check documentation files
2. Review component examples
3. Inspect existing components for patterns

## That's It!

You're ready to build. Run `npm run dev` and start coding! 🎉
