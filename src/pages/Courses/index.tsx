import { Spacer } from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import CustomAutocomplete from "../../components/Autocomplete";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import Flag from "../../components/Flag";
import CustomImage, { AllImages } from "../../components/Image";
import ParaGraph from "../../components/Paragraph";
import { CustomProgress } from "../../components/Progress";
import CustomTabs from "../../components/Tabs";
import { STRINGS } from "../../utilities/constants";
import { GetAllLanguages } from "../../utilities/countryIcons";
import { AppCurrencyWithText } from "../Home/homeContent";
import { LanguageFinderToLearn } from "../LoginAndSignup/onboarding";

interface CoursesProps {}

const Courses: FunctionComponent<CoursesProps> = () => {
  return (
    <div>
      <SearchBarForCourses />
      <Spacer y={6} />
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
      tabs={[
        {
          title: "My Courses",
          content: <CoursesContent />,
          textValue: "textValue",
        },
        {
          title: "Explore New Languages",
          content: <ExploreLanguages />,
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

const CoursesContent = ({}) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courses);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
        My Courses
      </ParaGraph>
      <div className="flex gap-8 flex-col">
        {MyCoursesData.map((course) => (
          <div className="" key={course.id}>
            <CourseCard
              course={course}
              onClick={() => handleSelectCourse(course.id)}
            />
          </div>
        ))}
      </div>
      {selectedCourse && (
        <div>
          <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
            {selectedCourse.name}
          </ParaGraph>
          <ParaGraph>Last Topic: {selectedCourse.lastTopic}</ParaGraph>
          <ParaGraph>
            Challenges: {selectedCourse.challenges.join(", ")}
          </ParaGraph>
        </div>
      )}
      <CustomImage src={AllImages.book} />
    </div>
  );
};

const CourseCard = ({ course, onClick }) => {
  return (
    <CustomCard
      bg-gradient-to-tr
      from-green-500
      to-yellow-500
      className="flex p-0 flex-row">
      <div
        className="flex flex-col gap-4 bg-gradient-to-tr 
      from-pink-400 to-purple-400 px-10 pr-12 py-8 flex-1 justify-between">
        <div className="flex flex-col justify-between items-start gap-2">
          <ParaGraph className="text-sm font-bold uppercase text-white">
            course
          </ParaGraph>
          <div className="flex flex-row flex-wrap gap-2">
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
          as={Link}
          to={course.id}
          className="self-start"
          variant="faded"
          color="primary">
          View all chapters
        </CustomButton>
      </div>
      <div
        className="py-8 px-10 flex flex-col justify-between"
        style={{ flex: 3 }}>
        <div className="flex flex-col gap-2">
          <ParaGraph className="text-sm font-bold uppercase">
            Chapter 5
          </ParaGraph>
          <ParaGraph className={`${STRINGS.CLASSES.heading} `}>
            Types Of Arrays & Strings
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
          onClick={() => onClick(course.id)}
          className="self-end"
          color={"primary"}
          variant="solid">
          Continue
        </CustomButton>
      </div>
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

const ExploreLanguages = ({}) => {
  const settings = useSelector((state) => state.language) ?? {};
  const [languages2, setLanguages2] = useState(
    settings[STRINGS.STORAGE.languagesUserWantsToKnow] ?? []
  );

  return (
    <div className="flex flex-col gap-4 p-2">
      <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
        Explore Languages ({MyLanguagesData?.length})
      </ParaGraph>
      <LanguageFinderToLearn
        langsUserWantsToKnow={languages2}
        setLangsUserWantsKnow={setLanguages2}
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

const SearchBarForCourses = () => {
  return (
    <CustomAutocomplete
      className="sticky top-0 z-[99]"
      allowsCustomValue
      items={[
        ...Object.values(GetAllLanguages).map((lang) => {
          return {
            label: `Learn ${lang.languageName}`,
            // route: lang.route,
            description: `Widely used in ${
              lang.usedIn ? lang.usedIn[0]?.id?.countryName : ""
            }`,
            value: lang.languageCode,
            icon: (
              <Flag
                className={"w-[20px]"}
                flag={lang.usedIn ? lang.usedIn[0].content : undefined}
              />
            ),
          };
        }),
      ]}
      placeholder="Search anything in courses and languages..."
    />
  );
};
