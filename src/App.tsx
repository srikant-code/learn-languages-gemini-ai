import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import useDarkPalette from "./hooks/useDarkPalette";
import Challenges from "./pages/Challenges";
import Dictionary from "./pages/Dictionary";
import Games from "./pages/Games";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Settings from "./pages/Settings";
import { SlideIDs, STRINGS } from "./utilities/constants";
import Alphabets from "./pages/Alphabets";
import { TextSelectionPopover } from "./components/Popover";

function App() {
  const router = createBrowserRouter([
    {
      path: SlideIDs.home.path,
      element: <Home />,
      // loader: rootLoader,
      children: [
        {
          path: SlideIDs.games.path,
          element: <Games />,
          // loader: teamLoader,
        },
        {
          path: SlideIDs.challenges.path,
          element: <Challenges />,
          // loader: teamLoader,
        },
        {
          path: SlideIDs.lessons.path,
          element: <Lessons />,
          // loader: teamLoader,
        },
        {
          path: SlideIDs.dictionary.path,
          element: <Dictionary />,
          // loader: teamLoader,
        },
        {
          path: SlideIDs.settings.path,
          element: <Settings />,
          // loader: teamLoader,
        },
        {
          path: SlideIDs.alphabets.path,
          element: <Alphabets />,
          // loader: teamLoader,
        },
      ],
    },
  ]);

  return (
    <>
      <ThemeHandler>
        <TextSelectionPopover>
          <RouterProvider router={router} />
        </TextSelectionPopover>
      </ThemeHandler>
    </>
  );
}

export default App;

const ThemeHandler = ({ children }) => {
  const theme = useSelector((state) => state.language.theme);

  const isDefaultDark = useDarkPalette().isDark;

  useEffect(() => {
    // Assuming 'theme' is a state or prop that can be 'dark' or 'light'
    const root = window.document.documentElement;

    if (theme === STRINGS.THEMES.DARK) {
      root.classList.add(STRINGS.THEMES.DARK);
      root.classList.remove(STRINGS.THEMES.LIGHT);
    } else {
      root.classList.add(STRINGS.THEMES.LIGHT);
      root.classList.remove(STRINGS.THEMES.DARK);
    }
  }, [theme]);

  return (
    <main
    // className={`${
    //   theme
    //     ? theme
    //     : isDefaultDark
    //     ? STRINGS.THEMES.DARK
    //     : STRINGS.THEMES.LIGHT
    // } `}
    >
      {children}
    </main>
  );
};

//  <div>
//    <a href="https://vitejs.dev" target="_blank">
//      <img src={viteLogo} className="logo" alt="Vite logo" />
//    </a>
//    <a href="https://react.dev" target="_blank">
//      <img src={reactLogo} className="logo react" alt="React logo" />
//    </a>
//  </div>;
