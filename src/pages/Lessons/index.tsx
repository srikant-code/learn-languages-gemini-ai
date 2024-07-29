import { CardBody, CardHeader, Progress, Spacer } from "@nextui-org/react";
import { CustomCard } from "../../components/Card";
import ParaGraph, { IconHeader } from "../../components/Paragraph";
import { SlideIDs, STRINGS } from "../../utilities/constants";
import CustomButton from "../../components/Button";
import { useEffect, useState } from "react";
import CustomTabs from "../../components/Tabs";
import CustomAutocomplete from "../../components/Autocomplete";
import { GetAllLanguages } from "../../utilities/countryIcons";
import Flag from "../../components/Flag";

interface LessonsProps {}

const Lessons: FunctionComponent<LessonsProps> = () => {
  return (
    <div>
      <IconHeader icon={SlideIDs.lessons.icon}>Lessons</IconHeader>
      <SearchBarForCourses />
      <Spacer y={6} />
      <CustomTabs
        ariaLabel="Courses"
        tabs={[
          {
            title: "My Courses (2)",
            content: <CoursesContent userId={"hello"} />,
            textValue: "textValue",
          },
          {
            title: "Explore New Languages",
            content: <ExploreLanguages userId={"hello"} />,
          },
        ]}
      />
    </div>
  );
};

export default Lessons;

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
const MyCoursesData = [
  {
    id: "1",
    name: "English",
    progress: 30,
    lastTopic: "The most widely spoken language in the world.",
    challenges: ["Challenge 1, Challenge 2"],
  },
  {
    id: "2",
    name: "Hindi",
    progress: 30,
    lastTopic: "The most widely spoken language in the India.",
    challenges: ["Challenge 1, Challenge 2"],
  },
];

const CoursesContent = ({ userId }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const userCourses = await fetchUserCourses(userId);
      const courseDetails = await Promise.all(
        userCourses.map((courseId) => fetchCourseDetails(courseId))
      );
      setCourses(courseDetails);
    };

    fetchCourses();
  }, [userId]);

  const handleSelectCourse = async (courseId) => {
    const course = await fetchCourseDetails(courseId);
    setSelectedCourse(course);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
        My Courses
      </ParaGraph>
      <div className="flex gap-4 ">
        {MyCoursesData.map((course) => (
          <div className="" key={course.id}>
            <CustomCard>
              <CardHeader>
                <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
                  {course.name}
                </ParaGraph>
              </CardHeader>
              <CardBody>
                <ParaGraph>Progress: {course.progress}%</ParaGraph>
                <Progress value={course.progress} color="primary" />
                <CustomButton onClick={() => handleSelectCourse(course.id)}>
                  Continue Course
                </CustomButton>
              </CardBody>
            </CustomCard>
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
    </div>
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

const ExploreLanguages = ({ userId }) => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const languagesSnapshot = await getDocs(collection(db, "courses"));
      const languagesList = languagesSnapshot.docs.map((doc) => doc.data());
      setLanguages(languagesList);
    };

    fetchLanguages();
  }, []);

  const handleAddCourse = async (courseId) => {
    await addUserCourse(userId, courseId);
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
        Explore Languages ({MyLanguagesData?.length})
      </ParaGraph>
      <div className="flex flex-wrap gap-6">
        {MyLanguagesData.map((language) => (
          <div className="max-w-[45%]" key={language.id}>
            <CustomCard className={"p-2"}>
              <CardHeader className="flex justify-between">
                <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
                  {language.name}
                </ParaGraph>
                <Flag flag={language.usedIn[0]?.content} className="w-[40px]" />
              </CardHeader>
              <CardBody className="gap-4">
                <ParaGraph>{language.description}</ParaGraph>
                <CustomButton onClick={() => handleAddCourse(language.id)}>
                  Start Course
                </CustomButton>
              </CardBody>
            </CustomCard>
          </div>
        ))}
      </div>
    </div>
  );
};

// ```

// ### Home Page Component

// ```javascript
// import React from 'react';
// import Courses from './Courses';
// import ExploreLanguages from './ExploreLanguages';

// const HomePage = ({ userId }) => {
//   return (
//     <div>
//       <Courses userId={userId} />
//       <ExploreLanguages userId={userId} />
//     </div>
//   );
// };

// export default HomePage;
// ```

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
