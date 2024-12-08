import CustomButton from "../../components/Button";

const RenderLetters = ({ word = "Sample word", handleClick }) => {
  // Create a set to store unique characters
  const uniqueChars = new Set(word?.replaceAll(" ", "").split(""));

  return (
    <div className="flex gap-2">
      {[...uniqueChars].map((char, index) => (
        <CustomButton
          isIconOnly
          key={index}
          onClick={() => handleClick(char)}
          variant="flat"
          className="font-bold text-xl">
          {char?.toUpperCase()}
        </CustomButton>
      ))}
    </div>
  );
};

export default RenderLetters;
