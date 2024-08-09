import moment from "moment";
import { useState } from "react";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortAmountDown,
  FaSortAmountUpAlt,
} from "react-icons/fa";
import CustomButton from ".";

const SortButton = ({
  data,
  setData,
  sortProperty,
  iconAsc = <FaSortAlphaDown />,
  iconDesc = <FaSortAlphaUp />,
  date,
}) => {
  const icons = {
    iconAsc: date ? <FaSortAmountUpAlt /> : iconAsc,
    iconDesc: date ? <FaSortAmountDown /> : iconDesc,
  };
  const [isAscending, setIsAscending] = useState(true);
  const [icon, setIcon] = useState(icons.iconAsc); // Initial icon

  const sortData = () => {
    const sorted = [...data].sort((a, b) => {
      let propA = a;
      let propB = b;

      // If sortProperty is not provided, sort alphabetically by converting objects to strings
      if (!sortProperty) {
        propA = JSON.stringify(a);
        propB = JSON.stringify(b);
      } else {
        // Handle nested properties
        sortProperty.split(".").forEach((prop) => {
          propA = propA[prop];
          propB = propB[prop];
        });
      }

      // Check if property is a date
      if (
        moment(propA, moment.ISO_8601, true).isValid() &&
        moment(propB, moment.ISO_8601, true).isValid()
      ) {
        propA = moment(propA).unix();
        propB = moment(propB).unix();
      }

      // Compare properties
      if (typeof propA === "string") {
        return isAscending
          ? propA.localeCompare(propB)
          : propB.localeCompare(propA);
      } else {
        return isAscending ? propA - propB : propB - propA;
      }
    });

    setData(sorted);
    setIsAscending(!isAscending); // Toggle sort order for next click
    setIcon(isAscending ? icons.iconDesc : icons.iconAsc); // Toggle icon
  };

  return (
    <CustomButton isIconOnly onClick={sortData}>
      {icon}
    </CustomButton>
  );
};

export default SortButton;
