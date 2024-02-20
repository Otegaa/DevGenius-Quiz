import { useQuiz } from "contexts/QuizContext";

const ToggleSound = () => {
  const { isSoundEnabled, dispatch } = useQuiz();

  const handleToggle = () => {
    dispatch({ type: "toggleSound" });
  };

  return (
    <div className="self-end rounded bg-[#f3ccff]">
      <button onClick={handleToggle} className="px-5 py-1 text-xl">
        {isSoundEnabled ? "🔈" : "🔇"}
      </button>
    </div>
  );
};
export default ToggleSound;
