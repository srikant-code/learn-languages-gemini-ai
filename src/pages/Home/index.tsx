import { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomAutocomplete from "../../components/Autocomplete";
import Footer from "../../components/Footer";
import LeftSideBar from "../SideBar";
import RightSideBar from "../SideBar/rightSideBar";
import { FaSearch } from "react-icons/fa";
import { SettingsObject } from "../Settings";
import { SlideIDs, STRINGS } from "../../utilities/constants";
import { ScrollShadow } from "@nextui-org/react";
import { useSelector } from "react-redux";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [count, setCount] = useState(0);
  const settingsFromRedux = useSelector((state) => state.language) ?? {};
  // JSON.parse(
  //   localStorage.getItem(STRINGS.STORAGE.SETTINGS)
  // );

  return (
    <div className="flex justify-between gap-4 p-4 ">
      <LeftSideBar className="flex-1 min-w-[220px] border dark:border-primary-300 rounded-3xl" />
      <div className="flex-col flex w-full p-6 max-h-[97vh] overflow-auto">
        <ScrollShadow size={40} hideScrollBar visibility={"bottom"}>
          <CustomAutocomplete
            className="sticky top-0 z-[99] bg-white dark:bg-black"
            items={[
              ...Object.values(SlideIDs).map((slide) => {
                return {
                  label: slide.name,
                  route: slide.route,
                  description: slide.description,
                  value: slide.name,
                  icon: slide.icon,
                };
              }),
              ...SettingsObject.map((setting) => {
                console.log({ setting, settingsFromRedux });
                const settingTypeCustom = setting.type === STRINGS.TYPES.CUSTOM;
                return {
                  label: setting.componentProps?.label,
                  route: setting?.route ?? undefined,
                  description:
                    settingsFromRedux[setting.key]?.label ??
                    (settingTypeCustom
                      ? setting.valueExtractor({
                          setting: settingsFromRedux[setting.key],
                        })
                      : settingsFromRedux[setting.key]),
                  value: settingTypeCustom
                    ? setting.valueExtractor({
                        setting: settingsFromRedux[setting.key],
                      })
                    : setting.key,
                  icon: setting?.icon,
                };
              }),
            ]}
            startContent={
              <FaSearch
                className="mx-2 text-default-40"
                strokeWidth={2}
                size={14}
              />
            }
            placeholder="Quick access..."
          />
          <Outlet />
          <div className="" style={{ flex: 2.5 }}>
            <Footer />
          </div>
        </ScrollShadow>
      </div>
      <RightSideBar className="dark bg-slate-800 flex-1 resize-x min-w-[300px] border dark:border-primary-300 rounded-3xl pt-5" />
    </div>
  );
};

export default Home;
