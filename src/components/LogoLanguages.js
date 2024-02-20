import { data } from "data/data";
import useLanguageParam from "../hooks/useLanguageParams";
import getLanguageImage from "./getLanguageImage";

const LogoLanguages = () => {
  const language = useLanguageParam();

  return (
    <div>
      <img
        src={getLanguageImage(data, language)}
        alt={language}
        className="h-10 w-10"
      />
    </div>
  );
};

export default LogoLanguages;
