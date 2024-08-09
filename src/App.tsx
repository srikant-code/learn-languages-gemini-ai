import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { TextSelectionPopover } from "./components/Popover";
import firebase, { loadState, saveStateInFireStore } from "./firebase/firebase";
import useDarkPalette from "./hooks/useDarkPalette";
import NotFoundPage from "./pages/404Page";
import Alphabets from "./pages/Alphabets";
import Challenges from "./pages/Challenges";
import Dictionary from "./pages/Dictionary";
import Games, { GamesContent } from "./pages/Games";
import Home from "./pages/Home";
import HomeContent from "./pages/Home/homeContent";
import Courses, { CoursesHome } from "./pages/Courses";
import { LoginAndSignup } from "./pages/LoginAndSignup";
import Settings from "./pages/Settings";
import { setSetting } from "./store/reducer";
import { SlideIDs, STRINGS } from "./utilities/constants";
import Onboarding from "./pages/LoginAndSignup/onboarding";
import { Sleep } from "./utilities/utilities";
import ChaptersAndLessons, {
  ChaptersAndLessonsHome,
} from "./pages/Courses/chaptersHome";
import Lessons, { LessonsHome } from "./pages/Courses/lesson/lessons";
import Lesson from "./pages/Courses/lesson/lesson";
import GamePlay from "./pages/Games/GameLogic";
import CustomButton from "./components/Button";

// ProtectedRoute component
const ProtectedRoute = ({ isSignedIn, children }) => {
  const location = useLocation();

  useEffect(() => {
    console.log({ location });
    if (location.hash) {
      const elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  if (isSignedIn !== undefined && !isSignedIn) {
    // Redirect to the login page if not signed in
    return <Navigate to={SlideIDs.onboarding.path} replace />;
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
            {/* {isSignedIn ? (
            ) : (
              <Navigate to={SlideIDs.dashboard.route} replace />
            )} */}
          </TextSelectionPopover>
        </ProtectedRoute>
      ),
      // loader: rootLoader,
      children: [
        {
          path: SlideIDs.dashboard.path,
          element: <HomeContent />,
        },
        {
          path: SlideIDs.games.path,
          element: <Games />,
          children: [
            {
              path: "",
              element: <GamesContent />,
            },
            {
              path: ":gameId",
              element: <GamePlay />,
            },
          ],
        },
        {
          path: SlideIDs.challenges.path,
          element: <Challenges />,
        },
        {
          path: SlideIDs.courses.path,
          element: <Courses />,
          children: [
            {
              path: "",
              element: <CoursesHome />,
            },
            {
              path: SlideIDs.course.path,
              element: <ChaptersAndLessons />,
              children: [
                {
                  path: "",
                  element: <ChaptersAndLessonsHome />,
                },
                {
                  path: SlideIDs.lesson.path,
                  element: <Lesson />,
                },
                // {
                //   path: SlideIDs.chapter.path,
                //   element: <Lessons />,
                //   children: [
                //     {
                //       path: "",
                //       element: <LessonsHome />,
                //     },

                //   ],
                // },
              ],
            },
          ],
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
      path: SlideIDs.onboarding.path,
      element: <Onboarding />,
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
            // accessToken,
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
                // accessToken,
                displayName,
                email,
                photoURL,
                uid,
                emailVerified,
                isAnonymous,
                metadata: {
                  createdAt: metadata.createdAt,
                  lastLoginAt: metadata.lastLoginAt,
                },
              },
            })
          );
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  // const profileData = useSelector((state) => state.language.profile) ?? {};
  // useEffect(() => {
  //   if (profileData.uid) {
  //     loadState(profileData.uid);
  //   }
  // }, [profileData.uid]);

  return (
    <>
      {/* <CustomButton
        onClick={() => {
          console.log("Clicking firestore button");
          saveStateInFireStore()();
        }}>
        Upload Data to Firebase
      </CustomButton> */}
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
    } else if (theme === STRINGS.THEMES.LIGHT) {
      root.classList.add(STRINGS.THEMES.LIGHT);
      root.classList.remove(STRINGS.THEMES.DARK);
    } else {
      root.classList.remove(STRINGS.THEMES.LIGHT);
      root.classList.remove(STRINGS.THEMES.DARK);
      root.classList.add(theme);
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
