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

I worked previously as well, but didn't log them

### 22nd July 2024

- Login and Signup UI + firebase link + redux save data

### 23rd July 2024

-- Implement settings section and add profile + Integrate the search bar with settings
-- Fix left sidebar
-x Integrate Google AI Studio + system to call the apis and change 
according to the settings(redux setup)
-- Signout functionality and chat auto-animation and markdown upgrade
--+ Start with managing the country and language codes prepare data
--+ animation of text rotation

### 24th July 2024
- Create the home page and cards

### 25th July 2024
- Didn't feel like working, took rest, but pushed some code changes to main

### 26th July 2024 - Fri
- Added basic UI for the Challenges, Games, Lessons
- Made a bit of UX for the same in figma

### 27th July 2024 - Sat
-X Integrate Google AI Studio + system to call the apis and change according to the settings(redux setup)
- Finalize the prompts and check with AI studio
- Develop the UI very fast using dummy data and local storage and redux.
- Integrate with firebase
- Integrate the AI
- Integrate the AI eveyrwhere
- Check the theme related fixes and changes

### 28th July 2024
 --- Onboarding user preference make + keep in settings(redux + LS)
 - Use the details to create dictionary query and integrate with AI

### 29th July 2024
- Do my vocabulary UI and functionality to store them
- Alphabets, diacritics of a language query
- Bring the search bar to the right? and the nav options to the top?
- Collect course contents and agenda + cards content.
-- Overall UI improved

### 30th July 2024
- Lessons UI make
- Overall UI improve
- AI queries write for the lessons and games.

### 31st July 2024
- AI queries write

### 1st August 2024
Fix side bar nabar and routing for courses basics

### 2nd August 2024
Routing for lessons and chapters
Routing for games
Merge alphabets and flashcards in courses
Create hero sections for games and courses and homepage widget
Make UI for all
add currency to flashcards, lessons and courses. 
settings add the onboarding options
sidebar UI create for search
my vocabulary UI create and functionality.

### 3rd August 2024
Create games UI and AI queries
AI tools page, dashboard, assets finalization
Dictionary UI addition and integration
### 4th August 2024
Integrate AI into the lessons, context 1M

### 5th August 2024
UI fixes day
AI theme focus
Challenges testing

### 6th August 2024
Firebase day
Testing end to end


### 7th August 2024
## Video Creation Start
- Ideation
- Exact script creation
- Video shooting
- collection of assets
- Video editing
- Audio fixes and dailog


### 8th August 2024

### 9th August 2024

### 10th August 2024

### 11th August 2024

### 12th August 2024




5th August
- Test the logic for the the streak and calendar



RE-PRIORITIZATION on 3rd August

- Generate API key
- integrate chat with markdown functionality

- AI Chat integrate 
  - Integration with gemini API key
  -- with past history 
  - suggestions for new chat and categories
  - and tokens show UI changes, time of chat
  - 

My Vocabulary
  - Create a global redux to save the data from anywhere
    - basic data needs to be stored for now - LS m abhi toh chalega.
  - Fix the UI for cards of vocabulary
TODO:  - on clicking the card it should open the dictionary with the selected word
TODO: - Type object in the myvocabulary to render specific type of card

Courses
  - Ongoing, all, completed sections
  - Chapters UI intiutive
  - Lessons UI intutive
  - Lesson UI 
    - markdown render for the specific course

Flashcards
- All flashcards (all languages)
  - show categories
- Show challenges completion coins indicator on each set
- Options to ask AI
- Integrate with Gemini

Games
  - Make homepage UI
    refer the design in figma and create the UI accordingly
  - Create assets for each of the games category
  - finalize the list of games
  - Make Internal games 

Dictionary
  - Add a search bar
  - integrate with API for fallback and default
  - Gemlinua prompt integrate
  - language selection options
  - suggested follow up actions should open a new chat

Challenges
  - Coins logic to add and subtract after successful submission and add to history.
  - Create the UI with images for each of the finalized challenges post creation of games and courses

Dashboard
- pull the components from 
  - challenges
  - word of the day for next 10 days with dates of each visited day
  - give points accordingly
  

Settings

Onboarding

X- Firebase



### Before submission checklist
- [ ] Play game during AI load
- [ ] AI feel theme buttons and text effects, border effects in related cards
- [ ] Create themes for dark, contrast and different modes
- [ ] Google AI Studio API key enter prompt in onboarding
- [ ] morefeatures array integrate with explore and side bar
- [ ] Fix the word rotator classname bug
- [ ] Cleanup the unncessary commented code
- [ ] check for API keys
- [x] Change navbar and sidebar swap? if time permits
- [ ] Disable firebase firestore storage
- [ ] Popover check if it can be made on top of selection 
- <NotificationComponent
    message="Hello, World!"
    time={5000}
    icon="/path/to/icon.png"
    url="http://localhost:5173"
  />





---
TODO for last day 9th august 

State to directly open the tabs of dictionary and AI chat
Tabs can be activated using ID and same ID in redux, it will restore when switching tabs or pages.

prefill the AI chat value for user to edit, or even send a request if confirmed.
Add emojis in tabs

Figure out how to modify the existing GeminiChat function to render the normal AI response.

Update the chat interface with audio button on each message and more.
X- markdown improvements
Header display the heading on top, 
XXX- user should be able to edit it.

AI feel wherever it is used and the response is parsed. Also in cached places
Buttons, border and card gradients, text gradients.

-- use coins to unlock the course contents

AI
- Word of the day - call dictionary and cache it, retreive from cache.
X- AI suggestions on the users next actions.

Focus on translations to defined languauges

Theme contrast mode.

Games
  - 

Courses
- 10 lessons, 150 trohies/coins
- vocab - copy button add, english wagera ka translation with colorful cards, graident
- generate 100 different story headers for reading comprehension, + quizes on lessons for reading comprehension
- generate 100 different topics for speaking exercieses
- generate 100 texts for writing exercises..
- quick translate - 2 text boxes and just fill the translation to target language

Profile
- Add the user goals, change app language
- description of points, XP UI and what you can do using AI usages to global points.
- badges system based on points. show on profile
- skill graph in profile


FlashCards
Courses AI integration.
Quick access integrate with eveything
Dashboard integration
enable learning timer and handle completed UI + coins that day.

E2E testing - onboarding login etc
onboarding add the API key of Gemini

Save notifications when anything updates in settings and app. 


Deployment in vercel.
Github commit.
useHeaders
app icon
responsiveness
