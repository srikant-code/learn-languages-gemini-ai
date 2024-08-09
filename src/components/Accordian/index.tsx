import { Accordion, AccordionItem } from "@nextui-org/react";

interface CustomAccordianProps {}

const CustomAccordian: FunctionComponent<CustomAccordianProps> = ({
  items = [
    { children: "as", subtitle: "hello" },
    { children: "as", subtitle: "hello" },
    { children: "as", subtitle: "hello" },
    { children: "as", subtitle: "hello" },
    { children: "as", subtitle: "hello" },
  ],
}) => {
  return (
    <Accordion variant="shadow">
      {items.map((item, index) => {
        return (
          <AccordionItem
            key={index}
            aria-label={`Accordion ${index}`}
            title={`Accordion ${index}`}
            {...item}
            // disabledKeys={["2"]}
            // defaultExpandedKeys={["2"]}
          />
        );
      })}
    </Accordion>
  );
};

export default CustomAccordian;
