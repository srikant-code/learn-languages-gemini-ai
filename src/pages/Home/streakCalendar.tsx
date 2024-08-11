import moment from "moment";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { useSelector } from "react-redux";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import ParaGraph from "../../components/Paragraph";

// const streakCalendar = {
//   "2024-08-04": true,
//   "2024-08-05": true,
//   "2024-08-06": true,
//   "2024-08-08": false,
//   "2024-08-09": true,
// };

const StreakCalendar = ({ noOfPastDaysToShow = 30 }) => {
  const streakCalendar =
    useSelector((state) => state.language?.streakCalendar) || {};
  const [currentDate, setCurrentDate] = useState(moment());

  const getPreviousWeek = () => {
    setCurrentDate(moment(currentDate).subtract(noOfPastDaysToShow, "days"));
  };

  const getNextWeek = () => {
    setCurrentDate(moment(currentDate).add(noOfPastDaysToShow, "days"));
  };

  const renderDays = () => {
    const days = [];
    for (let i = noOfPastDaysToShow - 1; i >= 0; i--) {
      const tempDate = moment(currentDate).subtract(i, "days");
      const dateString = tempDate.format("YYYY-MM-DD");
      const date = streakCalendar[dateString];
      const isToday =
        moment().format("YYYY-MM-DD") === tempDate.format("YYYY-MM-DD");
      days.push(
        <CustomCard
          key={dateString}
          as={CustomButton}
          color={date ? "success" : date === false ? "danger" : "default"}
          variant={date ? "flat" : date === false ? "faded" : "bordered"}
          className={`p-0  ${
            isToday ? "bg-blue-100" : date ? "bg-green-100" : "opacity-80"
          }`}>
          <div className="w-16 h-16 flex flex-col items-center justify-center">
            <ParaGraph
              className={`font-bold text-2xl  ${
                date || isToday ? "opacity-100" : "opacity-50"
              }`}>
              {tempDate.date()}
            </ParaGraph>
            <div className="flex items-center gap-1">
              <ParaGraph
                className={`font-bold text-sm ${
                  date ? "opacity-100" : "opacity-50"
                }`}>
                {tempDate.format("ddd")}
              </ParaGraph>
              <FiTarget
                className={`${date ? "text-green-500" : "text-orange-500"}`}
              />
            </div>
          </div>
          {/* <ParaGraph className="text-2xl"></ParaGraph> */}
        </CustomCard>
      );
    }
    return days;
  };

  return (
    <CustomCard className="streak-calendar mt-4">
      <div className="flex gap-4 justify-between items-center pb-5">
        <CustomButton isIconOnly onClick={getPreviousWeek}>
          <FaArrowLeft />
        </CustomButton>
        <ParaGraph>
          {currentDate.format("MMMM")} {currentDate.format("YYYY")}
        </ParaGraph>
        <CustomButton isIconOnly onClick={getNextWeek}>
          <FaArrowRight />
        </CustomButton>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center w-full">
        {renderDays()}
      </div>
    </CustomCard>
  );
};

export default StreakCalendar;
