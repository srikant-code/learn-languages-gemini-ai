import { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomAutocomplete from "../../components/Autocomplete";
import Footer from "../../components/Footer";
import LeftSideBar from "../SideBar";
import RightSideBar from "../SideBar/rightSideBar";
import { FaSearch } from "react-icons/fa";
import { SettingsObject } from "../Settings";
import { STRINGS } from "../../utilities/constants";
import { ScrollShadow } from "@nextui-org/react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-between gap-4 p-4 ">
      <LeftSideBar className="flex-1 min-w-[280px]" />
      <div
        className="flex-col flex w-full p-6 dark:border-l-slate-700
       border-l-slate-200 border-solid border-l-2 max-h-[97vh] overflow-auto">
        <ScrollShadow size={40} hideScrollBar visibility={"bottom"}>
          <CustomAutocomplete
            className="sticky top-0 z-10"
            items={[
              ...SettingsObject.map((setting) => {
                const settingsFromLS = JSON.parse(
                  localStorage.getItem(STRINGS.STORAGE.SETTINGS)
                );
                return {
                  label: setting.componentProps?.label,
                  description:
                    settingsFromLS[setting.key]?.label ??
                    settingsFromLS[setting.key],
                  value: setting.key,
                };
              }),
            ]}
            // items={[
            //   {
            //     title: "Settings",
            //     items: [
            //       ...SettingsObject.map((setting) => {
            //         const settingsFromLS = JSON.parse(
            //           localStorage.getItem(STRINGS.STORAGE.SETTINGS)
            //         );
            //         return {
            //           label: setting.componentProps?.label,
            //           description:
            //             settingsFromLS[setting.key]?.label ??
            //             settingsFromLS[setting.key],
            //           value: setting.key,
            //         };
            //       }),
            //     ],
            //   },
            // ]}
            // sectionsEnable
            startContent={
              <FaSearch
                className="mx-2 text-default-40"
                strokeWidth={2}
                size={14}
              />
            }
            placeholder="Search an animal"
          />
          <Outlet />
          <div className="" style={{ flex: 2.5 }}>
            <Footer />
          </div>
        </ScrollShadow>
      </div>
      <RightSideBar className="flex-1 resize-x min-w-[300px] dark:border-l-slate-700 border-l-slate-200 border-solid border-l-2 pt-5" />
    </div>
  );
};

export default Home;
