import { useParams } from 'react-router-dom';

const useLanguageParam = () => {
  return useParams().language;
};

export default useLanguageParam;
