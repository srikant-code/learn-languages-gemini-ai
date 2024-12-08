import { useEffect, useState } from "react";
import { GameSummary, RenderStats } from "./memoryMaestro";
import CustomButton from "../../../components/Button";
import { GameButtonCard } from ".";
import CustomInput from "../../../components/Input";
import ParaGraph from "../../../components/Paragraph";
import { STRINGS } from "../../../utilities/constants";

interface EquationSolverGamePlayProps {}

const EquationSolverGamePlay: FunctionComponent<
  EquationSolverGamePlayProps
> = ({ isTimerEnabled, TimerComponent, difficulty }) => {
  const generateEquations = () => {
    let newEquations = [];
    for (let i = 0; i < 10; i++) {
      let num1 = Math.floor(Math.random() * 10) + 1;
      let num2 = Math.floor(Math.random() * 10) + 1;
      let answer = num1 + num2;
      let equation = { question: `${num1} + ${num2} = ?`, answer: answer };

      if (mode !== STRINGS.DIFFICULTY.hard.id) {
        let options = [answer, answer + 1, answer - 1, answer + 2];
        options.sort(() => Math.random() - 0.5); // Shuffle the options
        equation.options = options;
      }

      newEquations.push(equation);
    }
    return newEquations;
  };

  const [mode, setMode] = useState(difficulty);
  const [equations, setEquations] = useState(generateEquations());

  const checkAnswer = (equation, userAnswer) => {
    if (parseInt(userAnswer) === equation.answer) {
      alert("Correct answer!");
    } else {
      alert("Incorrect answer. Try again.");
    }
  };

  const handleHint = () => {
    alert(`The correct answer is ${equations[0].answer}`);
  };

  console.log(generateEquations());

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {equations.map((equation, index) => (
            <div key={index} className="flex flex-col gap-4">
              <ParaGraph className="text-3xl font-bold">
                {equation.question}
              </ParaGraph>
              <div className="flex gap-4">
                {mode !== STRINGS.DIFFICULTY.hard.id ? (
                  equation.options.map((option, i) => (
                    <GameButtonCard
                      key={i}
                      onClick={() => checkAnswer(equation, option)}>
                      <ParaGraph className="text-3xl font-bold">
                        {option}
                      </ParaGraph>
                    </GameButtonCard>
                  ))
                ) : (
                  <CustomInput
                    type="number"
                    onBlur={(e) => checkAnswer(equation, e.target.value)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <CustomButton onClick={handleHint}>Show Hint 💡</CustomButton>
      </div>
    </div>
  );
};

export default EquationSolverGamePlay;
