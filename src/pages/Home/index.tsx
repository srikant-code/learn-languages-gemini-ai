import { STRINGS } from "../../utilities/constants";
import LeftSideBar from "../SideBar";
import RightSideBar from "../SideBar/rightSideBar";
import AppHeader from "./appHeader";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div
      className={`flex justify-between gap-4 p-4 bg-gradient-to-tr light:from-slate-200 light:via-pink-200
       light:to-violet-200 dark:from-slate-800 dark:via-pink-950 dark:to-violet-800`}>
      <LeftSideBar
        className={`border dark:border-primary-300 rounded-3xl 
          transition-all ease-in-out duration-500 ${STRINGS.CLASSES.basicTransitions}`}
      />
      <div
        className={`flex-col flex w-full p-6 max-w-[1200px] max-h-[97vh] overflow-auto 
        backdrop-blur-md backdrop-saturate-200 rounded-3xl `}>
        {/* <CustomListbox items={menuItems} /> */}
        <AppHeader />
      </div>
      <RightSideBar className="dark bg-gradient-to-tr from-slate-900 via-purple-950 to-violet-950 flex-1 resize-x min-w-[400px] border dark:border-primary-300 rounded-3xl pt-5" />
    </div>
  );
};

export default Home;
