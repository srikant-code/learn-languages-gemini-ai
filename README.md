# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

- [ ] `plugin:@typescript-eslint/
- [x] https



["asd", "ASd ", "adA"]

## TODOs
```md
-- Search bar upgrade
  -- list items
  -- css fixes
  -- connect with json for settings, ai, internal routes etc
--- Wrap components for input, switch etc
-- fix the left side bar
-- Fix profile of user and points addition
--- Popup global selection functionality
- chat
  - list all
  - upload files
  -- markdown render
  --- popover component
  --- input css
  -- options for top etc
  - bot logo
  -- model choose
-- Footer and header fix for main component
-- Settings JSON
  -- gen AI key
  -- model choose default
  -- theme 
  - check the datamodel and fill here
  - account settings
    - login, name, etc
- badges section KT for points collection
-- Chat/dictionary switch
-- Dictionary
  -- API integration
  - AI integration
  -- UI creation
  - translation
- My Vocabulary
  - Save words
  - Make UI
  - translation
- Lessons
  - Home
    - Reading, SPeaking, Writing etc
  - Chapters UI
  - Languages select and learners - chapters in each
- Games 
  - Make UI 
  - Make Internal games
- Alphabets
  - Sort by - alphabetical, Sort by vowels and consonants etc
  - Find analogy between selected languages
  - Start practicing from that letter
  --- Animation of the letter
  - Start games from that letter
    - Quizzes
  - Dictionary of that letter
  -- Save that letter to vocabulary
- Challenges
  - AI integration
  - points allocate
  - logic for daily calculations
- Home page
  - Todays challenges
  - continue where you left off
  - Word of the day
  - AI features showcase
  - learning graph calendar
  - suggestions ai
  - my vocabulary
  - Games
  - Links to other pages
  - Your lessons progress - all languages
- Feedback UI
  - AI feedback on current progress assesments
-- Login UI and protection
-- Firebase integration
-- 404 page
- Onboarding UI
-X Leaderboard
- translation
- Settings finalization
- Theme(AI feel), icons, font, logo and branding finalization
-- Github commits - deployment

- Phone responsive
  - Capacitor and builds for mobile

- Video Editing
- Submission
```


## Calendar log

### 22nd July 2024

- Login and Signup UI + firebase link + redux save data

### 23rd July 2024

- Implement settings section and add profile + Integrate the search bar with settings
- Fix left sidebar
- Integrate Google AI Studio + system to call the apis and change 
according to the settings(redux setup)
- Signout functionality and chat auto-animation and markdown upgrade

### 24th July 2024

- Finalize the prompts and check with AI studio

### Before submission checklist

- Cleanup the unncessary commented code
- check for keys
- 