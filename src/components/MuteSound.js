import { useQuiz } from 'contexts/QuizContext';
import { useState } from 'react';
import { GoUnmute, GoMute } from 'react-icons/go';

const MuteSound = () => {
  const { handleMuteSound, muteSound } = useQuiz();

  // return (
  //   <div onClick={handleMute}>
  //     {muteSound ? <GoMute onClick={handleMuteSound} /> : <GoUnmute />}
  //   </div>
  // );
};
export default MuteSound;
