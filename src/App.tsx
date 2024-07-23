import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import HomeContent from "./pages/Home/homeContent";
import { LoginAndSignup } from "./pages/LoginAndSignup";
import firebase from "./firebase/firebase";
import NotFoundPage from "./pages/404Page";
import { setSetting } from "./store/reducer";

// ProtectedRoute component
const ProtectedRoute = ({ isSignedIn, children }) => {
  if (isSignedIn !== undefined && !isSignedIn) {
    // Redirect to the login page if not signed in
    return <Navigate to={SlideIDs.login.path} replace />;
  }

  return children;
};

function App() {
  const settingsFromRedux = useSelector((state) => state.language) ?? {};
  const dispatch = useDispatch();

  // undefined means that it is loaded for the first time
  const [isSignedIn, setIsSignedIn] = useState(undefined); // Local signed-in state

  const router = createBrowserRouter([
    {
      path: SlideIDs.home.path,
      element: (
        <ProtectedRoute isSignedIn={isSignedIn}>
          <TextSelectionPopover>
            <Home />
          </TextSelectionPopover>
        </ProtectedRoute>
      ),
      // loader: rootLoader,
      children: [
        {
          path: SlideIDs.home.path,
          element: <HomeContent />,
        },
        {
          path: SlideIDs.games.path,
          element: <Games />,
        },
        {
          path: SlideIDs.challenges.path,
          element: <Challenges />,
        },
        {
          path: SlideIDs.lessons.path,
          element: <Lessons />,
        },
        {
          path: SlideIDs.dictionary.path,
          element: <Dictionary />,
        },
        {
          path: SlideIDs.settings.path,
          element: <Settings />,
        },
        {
          path: SlideIDs.alphabets.path,
          element: <Alphabets />,
        },
      ].map((child) => ({
        ...child,
        element: (
          <ProtectedRoute isSignedIn={isSignedIn}>
            {child.element}
          </ProtectedRoute>
        ),
      })),
    },
    {
      path: SlideIDs.login.path,
      element: <LoginAndSignup />,
    },
    {
      path: "/*",
      element: <NotFoundPage />,
    },
  ]);

  console.log({ isSignedIn });
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user); // changes here to boolean

        console.log({ user });
        if (user) {
          const {
            accessToken,
            displayName,
            email,
            photoURL,
            uid,
            emailVerified,
            isAnonymous,
            metadata,
          } = user;
          dispatch(
            setSetting({
              key: "profile",
              value: {
                accessToken,
                displayName,
                email,
                photoURL,
                uid,
                emailVerified,
                isAnonymous,
                metadata,
              },
            })
          );
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <>
      <ThemeHandler>
        <RouterProvider router={router} />
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
