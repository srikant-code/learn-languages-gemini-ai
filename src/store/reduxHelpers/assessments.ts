// I have another requirement of User Submissions and its Assessments.

import { useSelector } from "react-redux";
import { STRINGS } from "../../utilities/constants";
import { setSetting } from "../reducer";
import store from "../store";

// The redux should look something like this.

// {
//   [courseID] : {
//     [submission1] : {
//       isCompleted,
//       chapterId,
//       lessonId,
//       sumbissionId: // since there can be multiple submissions to one assessment
//       type: "reaading" // "or writing, speaking, listening"
//       name,
//       id:,
//       isReviewed: false,
//       submissionData:{ // other data of submission}
//       route: "/assess/assessment1"
//       assessmentReviewComments: ""
//     }
//     // more submissions will be added
//   }
//   // more courseIDs like en, es, hi language courses
// }

// The helper functions should be able to mark isCompleted, update the assessmentReview in a submission and other details, add a new submission to a course.

// The useSelectors can be like to pull the completed assessments, also those based on a chapter or a lesson or any other criteria. all the submissions across courses

// Also give me same usage examples

export const CreateSubmission = ({
  courseID,
  submissionID,
  submissionDetails,
  id = STRINGS.STORAGE.SUBMISSIONS_DATA,
}) => {
  const submissions = store.getState().language[id];
  const time = new Date().toISOString();
  let submissionsObj = {};

  if (
    !submissions ||
    !submissions[courseID] ||
    !submissions[courseID][submissionID]
  ) {
    // If the submission doesn't exist, create a new one
    submissionsObj = {
      [courseID]: {
        [submissionID]: {
          ...submissionDetails,
          lastUpdateOn: time,
        },
      },
    };
  } else {
    // If the submission exists, update it
    submissionsObj = { ...submissions };
    submissionsObj[courseID][submissionID] = {
      ...submissions[courseID][submissionID],
      ...submissionDetails,
      lastUpdateOn: time,
    };
  }

  store.dispatch(
    setSetting({
      key: id,
      value: submissionsObj,
    })
  );

  return submissionsObj;
};

export const UpdateSubmission = ({
  courseID,
  submissionID,
  submissionDetails,
  id = STRINGS.STORAGE.SUBMISSIONS_DATA,
}) => {
  const submissions = store.getState().language[id];
  const time = new Date().toISOString();
  let submissionsObj = {};

  if (
    submissions &&
    submissions[courseID] &&
    submissions[courseID][submissionID]
  ) {
    // If the submission exists, update it
    submissionsObj = { ...submissions };
    submissionsObj[courseID][submissionID] = {
      ...submissions[courseID][submissionID],
      ...submissionDetails,
      lastUpdateOn: time,
    };

    store.dispatch(
      setSetting({
        key: id,
        value: submissionsObj,
      })
    );
  }

  return submissionsObj;
};

// Custom hook to get all submissions of a course
export const useSubmissions = (courseID) => {
  return (
    useSelector(
      (state) => state.language?.[STRINGS.STORAGE.SUBMISSIONS_DATA]?.[courseID]
    ) ?? {}
  );
};

// Custom hook to get a specific submission
export const useSubmission = (courseID, submissionID) => {
  return (
    useSelector(
      (state) =>
        state.language?.[STRINGS.STORAGE.SUBMISSIONS_DATA]?.[courseID]?.[
          submissionID
        ]
    ) ?? {}
  );
};

// Custom hook to get completed assessments of a course
export const useCompletedAssessments = (courseID) => {
  return useSelector((state) =>
    Object.values(
      state.language?.[STRINGS.STORAGE.SUBMISSIONS_DATA]?.[courseID] || {}
    )?.filter((submission) => submission.isCompleted)
  );
};

// Custom hook to get incomplete assessments of a course
export const useIncompleteAssessments = (courseID) => {
  return useSelector((state) =>
    Object.values(
      state.language?.[STRINGS.STORAGE.SUBMISSIONS_DATA]?.[courseID] || {}
    )?.filter((submission) => !submission.isCompleted)
  );
};

// // Creating a new submission
// CreateSubmission({
//   courseID: "COURSE_ID_1",
//   submissionID: "SUBMISSION_ID_1",
//   submissionDetails: {
//     isCompleted: false,
//     chapterId: "CHAPTER_ID_1",
//     lessonId: "LESSON_ID_1",
//     type: "reading",
//     name: "Reading Assessment 1",
//   },
// });

// // Updating a submission
// UpdateSubmission({
//   courseID: "COURSE_ID_1",
//   submissionID: "SUBMISSION_ID_1",
//   submissionDetails: {
//     isCompleted: true,
//     assessmentReviewComments: "Great job!",
//   },
// });

// // When a submission is completed
// UpdateSubmission({
//   courseID: "COURSE_ID_1",
//   submissionID: "SUBMISSION_ID_1",
//   submissionDetails: {
//     isCompleted: true,
//   },
// });

// // When a submission is reviewed
// UpdateSubmission({
//   courseID: "COURSE_ID_1",
//   submissionID: "SUBMISSION_ID_1",
//   submissionDetails: {
//     isReviewed: true,
//     assessmentReviewComments: "Great job!",
//   },
// });
