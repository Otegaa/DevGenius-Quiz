import { data } from 'data/data';
import useLanguageParam from './useLanguageParams';

export const Logo = () => {
  const language = useLanguageParam();

  return (
    <div>
      <img
        src={getLanguageImage(language)}
        alt={language}
        className="header-img"
      />
    </div>
  );
};

// Function to get the image based on the language
function getLanguageImage(language) {
  const matchingLanguage = data.find((lang) => lang.name === language);
  return matchingLanguage ? matchingLanguage.img : '';
}
