import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
  Spacer,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { BiSquareRounded } from "react-icons/bi";
import { FaPaintBrush, FaSave, FaUndo } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import CustomButton from "../../../components/Button";
import { CustomCard } from "../../../components/Card";
import ParaGraph from "../../../components/Paragraph";
import { PopOverProps } from "../../../components/Popover/popover";
import CustomSlider from "../../../components/Slider";
import { generateUUID } from "../../../utilities/utilities";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const DrawingCanvas = ({ onSend }) => {
  const canvasRef = useRef();
  const [snapshots, setSnapshots] = useState([]);
  const [brushRadius, setBrushRadius] = useState(4);
  const [previewSize, setPreviewSize] = useState(200);
  const [isOpenBrushPopover, setIsOpenBrushPopover] = useState(false);

  const handleUndo = () => {
    canvasRef.current.undo();
  };

  const handleRedo = () => {
    canvasRef.current.redo();
  };

  const handleSave = () => {
    const snapshot = canvasRef.current.getDataURL();
    console.log({ snapshot });
    // const snapshot = canvasRef.current.getSaveData();
    setSnapshots([...snapshots, { id: generateUUID(), snapshot }]);
  };

  const handleClear = () => {
    canvasRef.current.clear();
  };

  const handleSend = (snapshot) => {
    onSend(snapshot);
  };

  console.log({ snapshots });
  const [parent] = useAutoAnimate();
  return (
    <div>
      <CustomCard className={"relative p-0"}>
        <CanvasDraw
          ref={canvasRef}
          brushRadius={brushRadius}
          brushColor={"#555"}
          canvasWidth={500}
          canvasHeight={500}
          enablePanAndZoom
        />
        <CustomCard className="flex gap-2 py-4 absolute top-4 left-4">
          <CustomButton onClick={handleUndo} isIconOnly>
            <FaUndo />
          </CustomButton>
          <CustomButton onClick={handleSave} isIconOnly>
            <FaSave />
          </CustomButton>
          <CustomButton
            onClick={handleClear}
            isIconOnly
            variant="ghost"
            color="danger">
            <FaTrash />
          </CustomButton>
          <Popover
            {...PopOverProps}
            isOpen={isOpenBrushPopover}
            showArrow
            placement="left"
            onClose={() => setIsOpenBrushPopover(false)}>
            <PopoverTrigger>
              <div>
                <CustomButton
                  onClick={() => setIsOpenBrushPopover(true)}
                  isIconOnly
                  variant="ghost">
                  <FaPaintBrush />
                </CustomButton>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="w-">
                <CustomSlider
                  size="md"
                  step={0.5}
                  label={"Brush Size"}
                  defaultValue={4}
                  minValue={1}
                  maxValue={10}
                  value={brushRadius}
                  onChange={(e) => setBrushRadius(e)}
                  className="w-[200px]"
                />
              </div>
            </PopoverContent>
          </Popover>
        </CustomCard>
      </CustomCard>
      <Spacer y={4} />
      {snapshots?.length ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <ParaGraph className={`text-2xl font-bold`}>
              Saved Images ({snapshots?.length})
            </ParaGraph>
            <div className="flex gap-2 items-center">
              <CustomButton
                isIconOnly
                onClick={() => setPreviewSize(75)}
                className={"flex"}>
                <BiSquareRounded className="text-sm" />
                <BiSquareRounded className="text-sm" />
              </CustomButton>
              <CustomButton isIconOnly onClick={() => setPreviewSize(200)}>
                <BiSquareRounded className="text-lg" />
              </CustomButton>
              <CustomButton
                color="danger"
                variant="faded"
                onClick={() => {
                  setSnapshots([]);
                }}>
                Delete all
              </CustomButton>
            </div>
          </div>
          <ScrollShadow orientation="horizontal">
            <div ref={parent} className="flex flex-row gap-4">
              {snapshots.map((snapshot, index) => (
                <div key={index} onClick={() => handleSend(snapshot)}>
                  {/* <CanvasDraw disabled saveData={snapshot} /> */}
                  <CustomCard
                    style={{
                      backgroundImage: `url(${snapshot.snapshot})`,
                      width: previewSize,
                      height: previewSize,
                      backgroundSize: "contain",
                    }}
                    className="relative">
                    <CustomButton
                      className="absolute top-2 right-2"
                      isIconOnly
                      variant="flat"
                      size="sm"
                      color="danger"
                      onClick={() => {
                        setSnapshots(
                          snapshots.filter((snap) => {
                            return snap.id !== snapshot.id;
                          })
                        );
                      }}>
                      <FaTrash />
                    </CustomButton>
                  </CustomCard>
                </div>
              ))}
            </div>
          </ScrollShadow>
        </div>
      ) : null}
    </div>
  );
};

export default DrawingCanvas;

const ColorPicker = ({ onColorSelect }) => {
  const colors = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#8B00FF", // Violet
    "#FFC0CB", // Pink
    "#A52A2A", // Brown
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  return (
    <div>
      {colors.map((color, index) => (
        <button
          key={index}
          style={{ backgroundColor: color, width: "50px", height: "50px" }}
          onClick={() => handleColorSelect(color)}>
          {selectedColor === color && "✓"}
        </button>
      ))}
    </div>
  );
};
