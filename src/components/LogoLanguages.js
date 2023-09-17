import { data } from 'data/data';
import useLanguageParam from './useLanguageParams';
import getLanguageImage from './getLanguageImage';

const LogoLanguages = () => {
  const language = useLanguageParam();

  return (
    <div>
      <img
        src={getLanguageImage(data, language)}
        alt={language}
        className="header-img"
      />
    </div>
  );
};

export default LogoLanguages;
