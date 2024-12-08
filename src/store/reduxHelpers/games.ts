import { useSelector } from "react-redux";
import { setSetting } from "../reducer";
import store from "../store";
import { STRINGS } from "../../utilities/constants";

// I also have a requirement for storing gamesData in redux, more likely below is a sample idea.

// gamesData: {
//     [game1ID]:{
//         name: "Memory maestro",
//         id: game1ID,
//         availableDifficulty: ["easy", "medium", "hard"],
//         maxPointsOnWin: 50,
//         maxXpsOnWin: 30,
//         timeBonus: 10,
//         winningMessage: "",
//         route: "/games/memory-maestro",
//         bestScore: {
//             [easy]: {
//                 [level1]: [gamePlays time object]
//                 [level2]: [gamePlays time object]
//                 // more levels
//             }
//             [medium]: {
//                 [level1]: [gamePlays time object]
//                 [level2]: [gamePlays time object]
//                 // more levels
//             }
//             [hard]: {
//                 [level1]: [gamePlays time object]
//                 [level2]: [gamePlays time object]
//                 // more levels
//             }
//         },
//         challenges: {
//             [challenge1]: {
//                 id: challenge1,
//                 name: "Win 3 games in east mode" // name of the challenge
//                 description: "description of the challenge",
//                 reward: {
//                     coins: 50,
//                     xps: 20,
//                 },
//                 progress: {
//                     completed: 2,
//                     total: 3,
//                 }
//             }
//             [challenge2]: {// details here}
//             // more challenges
//         },
//         auditDetails: {
//             lastPlayed: {
//                 [easy]: time,
//                 [medium]: time,
//                 [hard]: time,
//                 // more audits can be added
//             },
//         }
//         modes: {
//             [timeBoundMode]: {
//                 difficulty: {
//                     [easy]: {
//                         [level1 // autoIncrementing ID]: {
//                             gamePlays: {
//                                 [time]: {
//                                     gameStateData: {} // state of the game data to restore the gamePlay
//                                     gameSummary: { // if game is finished this will populate
//                                         timeElapsed: 300, //time in seconds it took to finish the level.
//                                         coinsEarned: 30,
//                                         xpsEarned: 15,
//                                         hintsUsed: 3,
//                                         timeBonus: 0,
//                                         totalScore: 45,
//                                         stars: 3,
//                                     }
//                                 }
//                                 // more gamePlays
//                                 // user can play same level multiple times
//                             }
//                         [level2]: {}
//                         // more levels on easy mode
//                     },
//                     [medium]: {// all levels and gameplays}
//                     [hard]: {// all levels and gameplays}
//                     [//more difficulties can be introduced]: {// all levels and gameplays}
//                 }
//             },
//             [casualMode]: // difficulty -> levels -> gameplays
//             [multiplayerMode]: // difficulty -> levels -> gameplays
//             // more modes can be introduced
//         }
//     }
// // other games
// }

// It should provide ways to add a game and its details, update a game and its details
// add/update bestScores, add gamePlays on each difficulty and level(create the difficulty and next level ),
// update auditDetails, add/update challenges and its progress,

// The helper functions should be able to
// listAll games, challenges, bestscores, gameplays(of each dificulty and mode), levels reached(on each difficulty and mode),

export const CreateGameData = ({
  gameID,
  gameDetails,
  id = STRINGS.STORAGE.GAMES_DATA,
}) => {
  const games = store.getState().language[id];
  const time = new Date().toISOString();
  let gamesObj = {};

  if (!games || !games[gameID]) {
    // If the game data doesn't exist, create a new one
    gamesObj = {
      [gameID]: {
        ...gameDetails,
        lastUpdateOn: time,
      },
    };
  } else {
    // If the game data exists, update it
    gamesObj = { ...games };
    gamesObj[gameID] = {
      ...games[gameID],
      ...gameDetails,
      lastUpdateOn: time,
    };
  }

  store.dispatch(
    setSetting({
      key: id,
      value: gamesObj,
    })
  );

  return gamesObj;
};

// CreateGameData({
//   gameID: "GAME_ID_1",
//   gameDetails: {
//     name: "Memory Maestro",
//     availableDifficulty: ["easy", "medium", "hard"],
//     maxPointsOnWin: 50,
//     maxXpsOnWin: 30,
//     timeBonus: 10,
//     winningMessage: "Congratulations! You won the game.",
//     route: "/games/memory-maestro",
//   },
// });

export const UpdateGame = ({
  gameID,
  mode = null,
  difficulty = null,
  level = null,
  gamePlayDetails = {},
  bestScoreDetails = {},
  auditDetails = {},
  challengeID = null,
  challengeDetails = {},
  id = STRINGS.STORAGE.GAMES_DATA,
}) => {
  const games = store.getState().language[id];
  const time = new Date().toISOString();
  let gamesObj = {};

  if (games && games[gameID]) {
    // If the game data exists, update it
    gamesObj = { ...games };
    gamesObj[gameID] = {
      ...games[gameID],
      lastUpdateOn: time,
    };

    if (mode && difficulty && level) {
      // If mode, difficulty, and level are provided, update the game play
      if (!gamesObj[gameID].modes[mode].difficulty[difficulty][level]) {
        // If the level doesn't exist, create a new one
        gamesObj[gameID].modes[mode].difficulty[difficulty][level] = {
          gamePlays: {
            [time]: {
              ...gamePlayDetails,
              completedOn: time,
            },
          },
        };
      } else {
        // If the level exists, update it
        gamesObj[gameID].modes[mode].difficulty[difficulty][level].gamePlays[
          time
        ] = {
          ...gamePlayDetails,
          completedOn: time,
        };
      }

      // Update the best score
      if (
        !gamesObj[gameID].bestScore[difficulty][level] ||
        gamesObj[gameID].bestScore[difficulty][level].totalScore <
          gamePlayDetails.totalScore
      ) {
        gamesObj[gameID].bestScore[difficulty][level] = {
          ...bestScoreDetails,
          totalScore: gamePlayDetails.totalScore,
        };
      }
    }

    // Update the audit details
    gamesObj[gameID].auditDetails = {
      ...gamesObj[gameID].auditDetails,
      ...auditDetails,
    };

    if (challengeID) {
      // If a challenge ID is provided, update the challenge
      gamesObj[gameID].challenges[challengeID] = {
        ...gamesObj[gameID].challenges[challengeID],
        ...challengeDetails,
      };
    }

    store.dispatch(
      setSetting({
        key: id,
        value: gamesObj,
      })
    );
  }

  return gamesObj;
};

// // When a game is played
// UpdateGame({
//   gameID: "GAME_ID_1",
//   mode: "MODE_1",
//   difficulty: "DIFFICULTY_1",
//   level: "LEVEL_1",
//   gamePlayDetails: { totalScore: 100, timeElapsed: 300, hintsUsed: 3 },
//   bestScoreDetails: { totalScore: 100 },
// });

// // When a challenge is completed
// UpdateGame({
//   gameID: "GAME_ID_1",
//   challengeID: "CHALLENGE_ID_1",
//   challengeDetails: { progress: { completed: 3, total: 3 } },
// });

// Custom hook to get all games
export const useAllGames = () => {
  return (
    useSelector((state) => state.language?.[STRINGS.STORAGE.GAMES_DATA]) || {}
  );
};

// Custom hook to get a specific game
export const useGame = (gameID) => {
  return (
    useSelector(
      (state) => state.language?.[STRINGS.STORAGE.GAMES_DATA]?.[gameID]
    ) || {}
  );
};

// Custom hook to get all challenges of a game
export const useGameChallenges = (gameID) => {
  return (
    useSelector(
      (state) =>
        state.language?.[STRINGS.STORAGE.GAMES_DATA]?.[gameID]?.challenges
    ) || {}
  );
};

// Custom hook to get best scores of a game
export const useGameBestScores = (gameID) => {
  return (
    useSelector(
      (state) =>
        state.language?.[STRINGS.STORAGE.GAMES_DATA]?.[gameID]?.bestScore
    ) || {}
  );
};

// Custom hook to get game plays of a game
export const useGamePlays = (gameID, mode, difficulty, level) => {
  return (
    useSelector(
      (state) =>
        state.language?.[STRINGS.STORAGE.GAMES_DATA]?.[gameID]?.modes?.[mode]
          ?.difficulty?.[difficulty]?.[level]?.gamePlays
    ) || {}
  );
};

// Custom hook to get levels reached of a game
export const useGameLevels = (gameID, mode, difficulty) => {
  return (
    useSelector((state) =>
      Object.keys(
        state.language?.[STRINGS.STORAGE.GAMES_DATA]?.[gameID]?.modes?.[mode]
          ?.difficulty?.[difficulty]
      )
    ) || {}
  );
};
