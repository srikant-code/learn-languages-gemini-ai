import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import CustomButton from "../Button";

export const CustomModal = ({
  title,
  body,
  actions,
  Button,
  buttonProps = {
    children: "Open modal",
    variant: "solid",
    size: "lg",
    // className: "w-full",
    onClick: () => console.log("Button clicked"),
  },
  ...props
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={(...e) => {
          if (e.preventDefault) e.preventDefault();
          onOpen(e);
          if (buttonProps.onClick) buttonProps.onClick(e);
        }}
        {...buttonProps}
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="rounded-3xl bg-gradient-to-tr from-slate-100 via-purple-200 to-pink-300 dark:from-slate-800 dark:via-purple-700 dark:to-pink-600 "
        {...props}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 m-3">
                {title}
              </ModalHeader>
              <ModalBody>{body}</ModalBody>
              <ModalFooter>
                {actions.map((action, index) => (
                  <CustomButton
                    key={index}
                    color={action.color}
                    variant={action.variant}
                    onPress={onClose}>
                    {action.text}
                  </CustomButton>
                ))}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
