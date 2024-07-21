import {
  Avatar,
  Chip,
  Listbox,
  ListboxItem,
  ListboxSection,
} from "@nextui-org/react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListboxWrapper } from "../../components/ListBoxWrapper";
import CustomSwitch from "../../components/Switch";
import { setSetting } from "../../store/reducer";
import { SlideIDs, STRINGS } from "../../utilities/constants";
interface LeftSideBarProps {}

const LeftSideBar: FunctionComponent<LeftSideBarProps> = ({ className }) => {
  const theme = useSelector((state) => state.language.theme);
  const dispatch = useDispatch();
  const toggleTheme = () => {
    dispatch(
      setSetting({
        key: "theme",
        value:
          theme === STRINGS.THEMES.DARK
            ? STRINGS.THEMES.LIGHT
            : STRINGS.THEMES.DARK,
      })
    );
  };

  const menuItems = [
    {
      title: "Actions",
      showDivider: true,
      items: [
        SlideIDs.games,
        SlideIDs.challenges,
        SlideIDs.lessons,
        SlideIDs.dictionary,
        SlideIDs.alphabets,
      ],
    },

    {
      items: [
        SlideIDs.settings,
        {
          name: "Dark Mode",
          // route: "/Dark Mode",
          description: "Toggle theme",
          icon: theme === STRINGS.THEMES.DARK ? <FaMoon /> : <FaSun />,
          onClick: toggleTheme,
          EndContent: (
            <CustomSwitch
              onClick={toggleTheme}
              // defaultSelected={theme === STRINGS.THEMES.DARK}
              isSelected={theme === STRINGS.THEMES.DARK}
              size="lg"
              color="primary"
              startContent={<FaSun />}
              endContent={<FaMoon />}
              aria-label="Dark mode toggle"
            />
          ),
        },
      ],
    },
  ];

  return (
    <div className={className} style={{ height: "97vh" }}>
      <div variant="light" bordered>
        <div className="p-4 flex items-center gap-4 ">
          <Avatar
            isBordered
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            radius="lg"
            size="lg"
          />
          <div className="flex flex-col p-0">
            <p className="headerText p-1">Hi, Srikant!</p>
            <div className="flex gap-2 items-center p-1">
              <Chip className="" color="success">
                Novice
              </Chip>
              <Chip className="" color="warning">
                23 coins
              </Chip>
            </div>
          </div>
        </div>

        <ListboxWrapper>
          <Listbox
            aria-label="Listbox Variants"
            // color={selectedColor}
            // variant={selectedVariant}
          >
            {menuItems.map((section) => {
              const { items, ...props } = section;
              return (
                <ListboxSection {...props}>
                  {(items ?? []).map((item) => {
                    const props = {
                      key: item.name,
                      description: item.description,
                      startContent: <span className="px-4 ">{item.icon}</span>,
                      endContent: (
                        <span className="px-4">{item.EndContent}</span>
                      ),
                      className: `p-6 ${
                        window.location.pathname === item.route ? "" : ""
                      }`,
                    };
                    return (
                      <ListboxItem
                        {...props}
                        as={item.route ? Link : undefined}
                        to={item.route ? item.route : undefined}
                        color="default"
                        className={"text-foreground"}
                        onClick={() => {
                          item?.onClick ? item.onClick() : "";
                        }}>
                        {item.name ?? item?.children}
                      </ListboxItem>
                    );
                  })}
                </ListboxSection>
              );
            })}
          </Listbox>
        </ListboxWrapper>
      </div>
    </div>
  );
};

export default LeftSideBar;
