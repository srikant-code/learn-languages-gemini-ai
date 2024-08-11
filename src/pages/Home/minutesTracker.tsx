import React, { useState, useEffect } from "react";
import { STRINGS } from "../../utilities/constants";
import { setSetting } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { GrammarSingularPlural } from "../../utilities/utilities";
import moment from "moment";

const SetupUserLearningGoalTime = () => {
  const settings = useSelector((state) => state.language) ?? {};
  const STORAGE = STRINGS.STORAGE;
  const userGoal = 10;

  const [timeSpent, setTimeSpent] = useState(
    settings[STORAGE.TIME_SPENT] ? parseInt(settings[STORAGE.TIME_SPENT]) : 0
  );
  const [streak, setStreak] = useState(
    settings[STORAGE.STREAK] ? parseInt(settings[STORAGE.STREAK]) : 0
  );
  const [lastDate, setLastDate] = useState(
    settings[STORAGE.LAST_DATE]
      ? new Date(settings[STORAGE.LAST_DATE]).toISOString()
      : null
  );
  const [streakCalendar, setStreakCalendar] = useState(
    settings[STORAGE.STREAK_CALENDAR] ? settings[STORAGE.STREAK_CALENDAR] : {}
  );
  const dispatch = useDispatch();

  const updateSetting = (key, value) => {
    dispatch(setSetting({ key, value }));
  };

  // Initialize the localStorage with the initial state values when the component mounts
  useEffect(() => {
    updateSetting(STORAGE.TIME_SPENT, timeSpent);
    updateSetting(STORAGE.STREAK, streak);
    updateSetting(
      STORAGE.LAST_DATE,
      lastDate ? lastDate.toISOString() : new Date().toISOString()
    );
    updateSetting(STORAGE.STREAK_CALENDAR, streakCalendar);
  }, []);

  console.log({
    timeSpent,
    streak,
    lastDate,
    j:
      JSON.parse(localStorage.getItem(`${STORAGE.SETTINGS}`))[
        STORAGE.TIME_SPENT
      ] || 0,
    h: lastDate?.getDate(),
    ads: new Date().getDate(),
  });

  const streakCal = (st = true) => {
    return {
      ...streakCalendar,
      [new Date().toISOString().split("T")[0]]: st ? savedTimeSpent : false,
    };
  };

  const increaseStreak = () => {
    // The user completed their learning goal today
    setStreak(streak + 1);
    updateSetting(STORAGE.STREAK, streak + 1);

    setStreakCalendar(streakCal());
    updateSetting(STORAGE.STREAK_CALENDAR, streakCal());
  };

  // Update the time spent every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let savedTimeSpent =
        JSON.parse(localStorage.getItem(`${STORAGE.SETTINGS}`))[
          STORAGE.TIME_SPENT
        ] || 0;

      if (lastDate && now.getDate() !== lastDate.getDate()) {
        // A new day has started
        if (savedTimeSpent >= userGoal) {
          // The user completed their learning goal yesterday
          increaseStreak();
        } else {
          // The user did not complete their learning goal yesterday
          setStreak(0);
          updateSetting(STORAGE.STREAK, 0);
          setStreakCalendar(streakCal(false));
          updateSetting(STORAGE.STREAK_CALENDAR, streakCal(false));
        }
        savedTimeSpent = 0;
        updateSetting(STORAGE.TIME_SPENT, 0);
        setLastDate(now);
        updateSetting(STORAGE.LAST_DATE, now.toISOString());
      } else {
        savedTimeSpent += 1;
        if (savedTimeSpent >= userGoal && streak === 0) {
          increaseStreak();
        }
        updateSetting(STORAGE.TIME_SPENT, savedTimeSpent);
      }
      setTimeSpent(savedTimeSpent);
    }, 60000); // 60000 milliseconds = 1 minute

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [lastDate, timeSpent, streak]);

  return (
    <div>
      {/* <h1>Learning Page</h1>
      <p>
        You have spent {timeSpent} {GrammarSingularPlural("minute", timeSpent)}{" "}
        learning today.
      </p>
      <p>Your current streak is {streak} days.</p> */}
    </div>
  );
};

export default SetupUserLearningGoalTime;
