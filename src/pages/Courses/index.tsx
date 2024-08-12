import { Spacer } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import CustomAutocomplete from "../../components/Autocomplete";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import Flag from "../../components/Flag";
import CustomImage, { AllImages } from "../../components/Image";
import ParaGraph from "../../components/Paragraph";
import { CustomProgress } from "../../components/Progress";
import CustomTabs from "../../components/Tabs";
import { SlideIDs, STRINGS } from "../../utilities/constants";
import { GetAllLanguages } from "../../utilities/countryIcons";
import { AppCurrencyWithText } from "../Home/homeContent";
import { LanguageFinderToLearn } from "../LoginAndSignup/onboarding";
import { setSetting } from "../../store/reducer";
import {
  DeleteCourse,
  useChapterDetails,
  useCourseDetails,
} from "../../store/reduxHelpers/courseChapterLessons";

interface CoursesProps {}

const Courses: FunctionComponent<CoursesProps> = () => {
  return (
    <div>
      {/* <SearchBarForCourses /> */}
      {/* <Spacer y={6} /> */}
      <Outlet />
    </div>
  );
};

export default Courses;

// Another requirement, The app needs to have a lessons/courses tab UI, using firebase
// it should pull the users selected language courses and its progress on topics using
// helper functions, give me a homepage for the same, the user can explore languages and
// select the required language to start the course. There should be a place to show the
// last left of topic, what languages the user has progressed learning etc. The progresses
// can be shown on the basis of read, write and speaking and any other skills(I am unsure
// on this). The courses should display the required number of challenges inside it, and
// also in the end give me ideas on what else can I include in the homepage of lessons
// that I missed which should make it more meanigful to the user and give them more interest
// to.

// Let's create a comprehensive lessons/courses tab UI for your app. We'll use Firebase to pull the user's selected language courses and their progress on various topics. The homepage will allow users to explore languages, select a language to start a course, and track their progress in reading, writing, speaking, and other skills.

// ### Firebase Setup

// First, ensure you have Firebase set up in your project. If not, you can follow the [Firebase setup guide](https://firebase.google.com/docs/web/setup).

// ### Firebase Collections

// We'll have the following collections in Firebase:
// 1. `courses`: Stores all available language courses.
// 2. `users`: Stores user-specific data, including their selected courses and progress.

// ### Helper Functions

// We'll create helper functions to interact with Firebase, such as fetching courses, adding new courses, and updating user progress.

// ### React Components

// We'll create React components to display the user's courses, allow them to explore new languages, and track their progress.

// ### Firebase Configuration

// ```javascript
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// ```

// ### Helper Functions

// ```javascript
// const fetchUserCourses = async (userId) => {
//   const userDoc = doc(db, "users", userId);
//   const userSnapshot = await getDoc(userDoc);
//   const userData = userSnapshot.data();
//   return userData.courses;
// };

// const fetchCourseDetails = async (courseId) => {
//   const courseDoc = doc(db, "courses", courseId);
//   const courseSnapshot = await getDoc(courseDoc);
//   return courseSnapshot.data();
// };

// const addUserCourse = async (userId, courseId) => {
//   const userDoc = doc(db, "users", userId);
//   await updateDoc(userDoc, {
//     courses: arrayUnion(courseId)
//   });
// };

// const updateUserProgress = async (userId, courseId, progress) => {
//   const userDoc = doc(db, "users", userId);
//   const userSnapshot = await getDoc(userDoc);
//   const userData = userSnapshot.data();

//   const updatedCourses = userData.courses.map(course => {
//     if (course.id === courseId) {
//       return { ...course, progress };
//     }
//     return course;
//   });

//   await setDoc(userDoc, { ...userData, courses: updatedCourses });
// };
// ```

// ### React Components

// #### Courses Component

// ```javascript

export const CoursesHome = () => {
  return (
    <CustomTabs
      ariaLabel="Courses"
      fullWidth
      id={STRINGS.STORAGE.TABS.coursePage}
      tabs={[
        // {
        //   title: "Active",
        //   content: <CoursesContent />,
        //   // textValue: "textValue",
        // },
        // {
        //   title: "Archived",
        //   content: <CoursesContent archived />,
        //   // textValue: "textValue",
        // },
        // {
        //   title: "Completed",
        //   content: <CoursesContent completed />,
        //   // textValue: "textValue",
        // },
        {
          title: "Add New Languages",
          content: <ExploreLanguages />,
        },
        {
          title: "Languages you know",
          content: (
            <ExploreLanguages
              languageSettingKey={STRINGS.STORAGE.languagesUserKnows}
              heading="Languages you know"
              inputProps={null}
              messageForConfirmation={null}
              messageForNoSelection={null}
            />
          ),
        },
      ]}
    />
  );
};

const MyCoursesData = [
  {
    id: "1",
    name: "English",
    id: "en",
    progress: 30,
    lastTopic: "The most widely spoken language in the world.",
    challenges: ["Challenge 1, Challenge 2"],
  },
  {
    id: "2",
    name: "Hindi",
    id: "hi",
    progress: 70,
    lastTopic: "The most widely spoken language in the India.",
    challenges: ["Challenge 1, Challenge 2"],
  },
];

export function GetArchivedCourses(coursesData, languagesUserWantsToKnow) {
  const archivedCourses = {};

  // Iterate over each course in coursesData
  for (const course in coursesData) {
    // If the course is not present in languagesUserWantsToKnow, add it to archivedCourses
    if (!(course in languagesUserWantsToKnow)) {
      archivedCourses[course] = coursesData[course];
    }
  }

  console.log({ archivedCourses });

  return archivedCourses;
}

const CoursesContent = ({ archived, completed }) => {
  const settings = useSelector((state) => state.language) ?? {};
  const coursesData = settings?.[STRINGS.STORAGE.COURSES_DATA] || {};
  const languagesUserWantsToKnow =
    settings?.[STRINGS.STORAGE.languagesUserWantsToKnow] || {};
  const languagesUserKnows =
    settings?.[STRINGS.STORAGE.languagesUserKnows] || {};

  const renderCourses = (courses) =>
    Object.keys(courses)
      ?.map((course) => {
        return {
          id: course,
          name: GetAllLanguages[course].languageName,
          progress: 30,
          lastTopic: "The most widely spoken language in the world.",
        };
      })
      ?.map((course) => (
        // <div className={`${archived ? "w-[47%]" : "w-full"}`}>
        <CourseCard course={course} archived={archived} key={course.id} />
        // </div>
      ));

  const wantToLearnCourses = archived
    ? GetArchivedCourses(coursesData, {
        ...languagesUserWantsToKnow,
        ...languagesUserKnows,
      })
    : languagesUserWantsToKnow;
  const alreadyKnowCourses = archived ? {} : languagesUserKnows;

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-2">
        <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
          {completed ? "Completed" : archived ? "Archived" : "My Courses"}
        </ParaGraph>
        <ParaGraph className={`text-sm`}>
          {completed
            ? "The courses that you have finished learning."
            : archived
            ? "The courses on which you had some progress but later dropped it."
            : "The courses you have enrolled in."}
        </ParaGraph>
      </div>
      <div className="flex gap-8 flex-col">
        {Object.keys(wantToLearnCourses)?.length +
          Object.keys(wantToLearnCourses)?.length ===
          0 || completed ? (
          <NoCourses
            text={
              archived
                ? "You have no archived courses yet."
                : "You have no completed courses yet."
            }
            image={completed ? AllImages.app.completed : undefined}
          />
        ) : (
          <div className="flex flex-col gap-8">
            {Object.keys(wantToLearnCourses)?.length ? (
              <>
                <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
                  {archived ? "Archived courses" : "I want to learn"} (
                  {Object.keys(wantToLearnCourses)?.length})
                </ParaGraph>
                <div
                  className="flex flex-col gap-4"
                  style={{ flexFlow: "row wrap" }}>
                  {renderCourses(wantToLearnCourses)}
                </div>
              </>
            ) : null}
            {Object.keys(alreadyKnowCourses)?.length ? (
              <>
                <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
                  I already know ({Object.keys(alreadyKnowCourses)?.length})
                </ParaGraph>
                <div
                  className="flex flex-col gap-4"
                  style={{ flexFlow: "row wrap" }}>
                  {renderCourses(alreadyKnowCourses)}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export const NoCourses = ({
  text = "You have no courses yet.",
  image = AllImages.app.archived,
}) => {
  return (
    <div className="w-full flex items-center justify-center flex-wrap">
      <CustomImage src={image} className={"max-w-[300px]"} />
      <ParaGraph className="text-lg font-bold">{text}</ParaGraph>
    </div>
  );
};

const CourseCard = ({
  course,
  onClick = () => {
    console.log("clicked course card");
  },
  archived,
}) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.language) || {};
  const courseData = useCourseDetails(course?.id);
  // const chapterData = useChapterDetails(course);

  const lastOpenedChapter = courseData?.lastOpenedChapter;
  const lastOpenedLesson = courseData?.lastOpenedLesson;

  console.log({ lastOpenedChapter });
  return (
    <CustomCard
      bg-gradient-to-tr
      from-green-500
      to-yellow-500
      className={`flex p-0 flex-row ${archived ? "w-[47%] flex-1" : "w-full"}`}>
      <div
        className={`flex flex-col gap-4 bg-gradient-to-tr 
      from-pink-400 to-purple-400 ${
        archived ? "from-slate-700 to-slate-800" : ""
      } px-10 pr-12 py-8 flex-1 justify-between h-full `}>
        <div className="flex flex-col justify-between items-start gap-2">
          <ParaGraph className="text-sm font-bold uppercase text-white">
            course
          </ParaGraph>
          <div className="flex flex-col gap-2">
            <ParaGraph className={`${STRINGS.CLASSES.heading} text-white`}>
              {course.name} Fundamentals
            </ParaGraph>
            <Flag
              flag={GetAllLanguages[course.id]?.usedIn[0]?.content}
              className="w-[5rem]"
            />
          </div>
        </div>
        <CustomButton
          onClick={() => {
            DeleteCourse({ courseID: course.id });
            const { [course.id]: langToRemove, ...otherLangs } =
              settings[STRINGS.STORAGE.languagesUserWantsToKnow];
            if (settings[STRINGS.STORAGE.languagesUserWantsToKnow][course.id]) {
              console.log("Removing course", course.id);
              dispatch(
                setSetting({
                  key: STRINGS.STORAGE.languagesUserWantsToKnow,
                  value: {
                    ...(Object.keys(otherLangs)?.length >= 1
                      ? otherLangs
                      : {
                          en: {
                            read: true,
                            write: true,
                            speak: true,
                          },
                        }),
                  },
                })
              );
            }
          }}
          className="self-start hover:text-black dark:hover:text-white"
          variant="faded"
          color="danger">
          Delete
        </CustomButton>
        <CustomButton
          as={Link}
          to={course.id}
          onClick={() => {
            dispatch(
              setSetting({
                key: STRINGS.STORAGE.CURRENT_LEARNING_LANGUAGE,
                value: course.id,
              })
            );
          }}
          className="self-start hover:text-black dark:hover:text-white"
          variant="faded"
          color="primary">
          View all chapters
        </CustomButton>
      </div>
      {!archived && (
        <div
          className="py-8 px-10 flex flex-col justify-between"
          style={{ flex: 3 }}>
          <div className="flex flex-col gap-2">
            <ParaGraph className="text-sm font-bold uppercase">
              {lastOpenedChapter?.chapterName}
            </ParaGraph>
            <ParaGraph className={`${STRINGS.CLASSES.heading} `}>
              {lastOpenedLesson?.lesson}
            </ParaGraph>
          </div>
          <Spacer y={8} />
          <div className="flex flex-col gap-4">
            <CustomProgress value={course.progress} />
            <ParaGraph className="">{course.progress}/16 Challenges</ParaGraph>
            <div>
              <AppCurrencyWithText text={30} />
            </div>
          </div>
          <CustomButton
            // onClick={() => onClick(course.id)}
            as={Link}
            to={course.id}
            className="self-end hover:text-white"
            color={"primary"}
            variant="solid">
            Continue
          </CustomButton>
        </div>
      )}
    </CustomCard>
  );
};

// ```

// #### Explore Languages Component

// ```javascript

const MyLanguagesData = Object.values(GetAllLanguages).map((lang) => {
  return {
    ...lang,
    id: lang.languageCode,
    name: lang.languageName,
    description: "The most widely spoken language in the world.",
  };
});
console.log({ GetAllLanguages });
// ??
//   [
//   {
//     id: "1",
//     name: "English",
//     description: "The most widely spoken language in the world.",
//   },
//   {
//     id: "2",
//     name: "Hindi",
//     description: "The most widely spoken language in the India.",
//   },
// ];

const ExploreLanguages = ({
  languageSettingKey = STRINGS.STORAGE.languagesUserWantsToKnow,
  heading = "Explore Languages",
  ...props
}) => {
  const settings = useSelector((state) => state.language) ?? {};
  const languagesUWTK = settings[languageSettingKey] ?? [];

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 p-2">
      <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
        {heading} ({MyLanguagesData?.length})
      </ParaGraph>
      <LanguageFinderToLearn
        langsUserWantsToKnow={languagesUWTK}
        setLangsUserWantsKnow={(data) => {
          dispatch(
            setSetting({
              key: languageSettingKey,
              value: data,
            })
          );
        }}
        {...props}
      />
    </div>
  );
};

// ### Additional Ideas for the Homepage

// 1. **Leaderboard**: Show a leaderboard of top learners to motivate users.
// 2. **Daily Goals**: Set and track daily learning goals.
// 3. **Achievements**: Display badges or achievements for completing milestones.
// 4. **Community**: Include a section for community discussions or language exchange partners.
// 5. **Notifications**: Remind users of their progress and encourage them to continue learning.
// 6. **Personalized Recommendations**: Suggest courses or challenges based on the user's progress and interests.

// These additions can make the homepage more engaging and encourage users to stay motivated in their language learning journey. Let me know if you need any more help!
export const CourseItems = [
  ...Object.values(GetAllLanguages).map((lang) => {
    return {
      label: `Learn ${lang.languageName}`,
      // route: lang.route,
      description: `Widely used in ${
        lang.usedIn ? lang.usedIn[0]?.id?.countryName : ""
      }`,
      value: lang.languageCode,
      route: `${SlideIDs.settings.route}`,
      icon: (
        <Flag
          className={"w-[20px]"}
          flag={lang.usedIn ? lang.usedIn[0].content : undefined}
        />
      ),
    };
  }),
];
const SearchBarForCourses = () => {
  return (
    <CustomAutocomplete
      className="sticky top-0 z-[99]"
      allowsCustomValue
      items={CourseItems}
      placeholder="Search anything in courses and languages..."
    />
  );
};
