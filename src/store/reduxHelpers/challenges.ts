// I have another requirement for challenges feature.
// The final redux should look the below.

import { useSelector } from "react-redux";
import { STRINGS } from "../../utilities/constants";
import { setSetting } from "../reducer";
import store from "../store";

// challenges:  {daily: {
//     [challengeID]: {[today's date]: {
//       id: 1,
//       title: "Complete 10 lessons",
//       description: "Complete 10 lessons in any course and chapter to win 20 coins.",
//       coins: 20,
// xp: 15,
// currentProgress: 1,
// totalProgress: 10,
// percentageCompletion: 10,
//       endDate: moment().endOf("day").toISOString(), // end of the day.
//       isCompleted: false,
// isClaimed: false,
// logs: {
// [time] : {
// progress: 1,
// completedOn: time,
// details: {heading: "Completed lesson on Ancient India", route: "/course/en/Ancient_India"},
// },{
// progress: 2,
// completedOn: time,
// details:  {heading: "Completed lesson on Ancient Africa", route: "/course/en/Ancient_Africa"},}
// }
//     },
// // more daily challenges
// },
// // more dates, since the daily challenges should be updated daily.
// },
// weekly: {// weekly challenges for each week}

// yearly: {//lifetime challenges for each year}
// // any other categories
// }

// The helper functions should be able to update the daily, weekly and yearly challenges, the completion status, the logs of progress of each challenge, when the progress is completed, user needs to click the claim button which needs to updated the isClaimed. etc.

// It is the high level idea.

export const CreateChallenge = ({
  type = "daily", // or "weekly", "yearly"
  challengeID,
  challengeDetails,
  id = STRINGS.STORAGE.CHALLENGES,
}) => {
  const challenges = store.getState().language[id];
  const time = new Date().toISOString();
  let challengesObj = {};

  if (!challenges || !challenges[type] || !challenges[type][challengeID]) {
    // If the challenge doesn't exist, create a new one
    challengesObj = {
      [type]: {
        [challengeID]: {
          ...challengeDetails,
          lastUpdateOn: time,
        },
      },
    };
  } else {
    // If the challenge exists, update it
    challengesObj = { ...challenges };
    challengesObj[type][challengeID] = {
      ...challenges[type][challengeID],
      ...challengeDetails,
      lastUpdateOn: time,
    };
  }

  store.dispatch(
    setSetting({
      key: id,
      value: challengesObj,
    })
  );

  return challengesObj;
};

// CreateChallenge({
//   type: "daily",
//   challengeID: "CHALLENGE_ID_1",
//   challengeDetails: {
//     name: "Win 3 games in easy mode",
//     description: "Win 3 games in easy mode to earn 50 coins and 20 XP.",
//     reward: {
//       coins: 50,
//       xps: 20,
//     },
//     progress: {
//       completed: 0,
//       total: 3,
//     },
//   },
// });

export const UpdateChallenge = ({
  type = "daily", // or "weekly", "yearly"
  challengeID,
  progress,
  details,
  isCompleted = false,
  isClaimed = false,
  id = STRINGS.STORAGE.CHALLENGES,
}) => {
  const challenges = store.getState().language[id];
  const time = new Date().toISOString();
  let challengesObj = {};

  if (challenges && challenges[type] && challenges[type][challengeID]) {
    // If the challenge exists, update it
    challengesObj = { ...challenges };
    challengesObj[type][challengeID].currentProgress += progress;
    challengesObj[type][challengeID].percentageCompletion = Math.round(
      (challengesObj[type][challengeID].currentProgress /
        challengesObj[type][challengeID].totalProgress) *
        100
    );
    challengesObj[type][challengeID].isCompleted = isCompleted;
    challengesObj[type][challengeID].isClaimed = isClaimed;
    challengesObj[type][challengeID].logs[time] = {
      progress,
      completedOn: time,
      details,
    };

    store.dispatch(
      setSetting({
        key: id,
        value: challengesObj,
      })
    );
  }

  return challengesObj;
};

// Custom hook to get all challenges of a type
export const useChallenges = (type) => {
  return useSelector(
    (state) => state.language?.[STRINGS.STORAGE.CHALLENGES]?.[type]
  );
};

// Custom hook to get completed challenges of a type
export const useCompletedChallenges = (type) => {
  return useSelector(
    (state) =>
      Object.values(
        state.language?.[STRINGS.STORAGE.CHALLENGES]?.[type] || {}
      )?.filter((challenge) => challenge.isCompleted) ?? []
  );
};

// Custom hook to get incomplete challenges of a type
export const useIncompleteChallenges = (type) => {
  return useSelector(
    (state) =>
      Object.values(
        state.language?.[STRINGS.STORAGE.CHALLENGES]?.[type] || {}
      )?.filter((challenge) => !challenge.isCompleted) ?? []
  );
};

// Custom hook to get claimed challenges of a type
export const useClaimedChallenges = (type) => {
  return useSelector(
    (state) =>
      Object.values(
        state.language?.[STRINGS.STORAGE.CHALLENGES]?.[type] || {}
      )?.filter((challenge) => challenge.isClaimed) ?? []
  );
};

// Custom hook to get unclaimed challenges of a type
export const useUnclaimedChallenges = (type) => {
  return useSelector(
    (state) =>
      Object.values(
        state.language?.[STRINGS.STORAGE.CHALLENGES]?.[type] || {}
      )?.filter((challenge) => !challenge.isClaimed) ?? []
  );
};

// const ChallengesComponent = ({ type }) => {
//   const challenges = useChallenges(type);
//   const completedChallenges = useCompletedChallenges(type);
//   const incompleteChallenges = useIncompleteChallenges(type);
//   const claimedChallenges = useClaimedChallenges(type);
//   const unclaimedChallenges = useUnclaimedChallenges(type);
//   // Use challenges, completedChallenges, incompleteChallenges, claimedChallenges, and unclaimedChallenges...
// };

// // When a challenge is completed
// UpdateChallenge({
//   type: "daily",
//   challengeID: "CHALLENGE_ID_1",
//   progress: 1,
//   details: { heading: "Completed lesson on Ancient India", route: "/course/en/Ancient_India" },
//   isCompleted: true,
// });

// // When a challenge is claimed
// UpdateChallenge({
//   type: "daily",
//   challengeID: "CHALLENGE_ID_1",
//   progress: 0,
//   details: {},
//   isClaimed: true,
// });
