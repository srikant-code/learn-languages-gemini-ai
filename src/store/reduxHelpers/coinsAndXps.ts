import { useSelector } from "react-redux";
import { STRINGS } from "../../utilities/constants";
import { setSetting } from "../reducer";
import store from "../store";

export const COINS_OBJ = {
  COURSE_LESSON_UNLOCK: "COURSE_LESSON_UNLOCK",
  USE_AI: "USE_AI",
};
export const XP_OBJ = {
  COURSE_LESSON_UNLOCK: "COURSE_LESSON_UNLOCK",
};
export const COINS = {
  [COINS_OBJ.COURSE_LESSON_UNLOCK]: {
    id: COINS_OBJ.COURSE_LESSON_UNLOCK,
    coins: 200,
  },
  [COINS_OBJ.USE_AI]: {
    id: COINS_OBJ.USE_AI,
    coins: 100,
  },
};
export const XP = {
  [XP_OBJ.COURSE_LESSON_UNLOCK]: {
    id: XP_OBJ.COURSE_LESSON_UNLOCK,
    xp: 250,
  },
};
export const UpdateCoins = ({
  earnedForID = "COMPLETE_CHAPTER",
  earnedForDetails = {},
  id = STRINGS.STORAGE.COINS,
}) => {
  const coins = store.getState().language[id];
  const time = new Date().toISOString();
  let coinsObj = {};

  const amount =
    id === STRINGS.STORAGE.COINS
      ? COINS[earnedForID].coins
      : XP[earnedForID].xp;

  const newEntry = {
    [time]: {
      earnedAmount: amount,
      earnedFor: {
        id: earnedForID,
        ...earnedForDetails,
      },
    },
  };

  if (!coins) {
    coinsObj = {
      total: amount,
      lastLog: time,
      logs: {
        ...newEntry,
      },
    };
  } else {
    coinsObj = {
      ...coins,
      total: coins.total + amount,
      lastLog: time,
      logs: {
        ...coins.logs,
        ...newEntry,
      },
    };
  }

  if (amount >= 0)
    store.dispatch(
      setSetting({
        key: id,
        value: coinsObj,
      })
    );
  return false;

  return coinsObj;
};

export const UpdateXPs = ({
  earnedForID = "COMPLETE_CHAPTER",
  earnedForDetails = {},
}) => {
  UpdateCoins({ earnedForID, earnedForDetails, id: STRINGS.STORAGE.XP });
};

// export const DeleteExistingChat = ({ chatID = null, dispatch }) => {
//   const savedChats = store.getState().language.savedChats;
//   const { [chatID]: chatToBeDeleted, ...otherChats } = savedChats;

//   dispatch(
//     setSetting({
//       key: STORAGE.SAVED_CHATS,
//       value: {
//         ...otherChats,
//       },
//     })
//   );
// };

// Custom hook to get coins details
export const useCoinsDetails = () => {
  return useSelector((state) => state.language[STRINGS.STORAGE.COINS]);
};

// Custom hook to get XP details
export const useXPDetails = () => {
  return useSelector((state) => state.language[STRINGS.STORAGE.XP]);
};

// const CoinsComponent = () => {
//   const coins = useCoinsDetails();
//   // Use coins details...
// };

// const XPComponent = () => {
//   const xp = useXPDetails();
//   // Use XP details...
// };
