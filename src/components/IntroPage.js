import IntroPictures from './IntroPictures';

const IntroPage = () => {
  return (
    <div className="intro-page">
      <h1>Welcome to the DevGenius Quiz!😇</h1>
      <p>
        Do you want to test your coding knowledge with fun and challenging
        quizzes?
      </p>
      <h3>You're in the right place!</h3>
      <div className="languages-box">
        <h4>Please select your favorite language!</h4>
        <IntroPictures />
      </div>
    </div>
  );
};
export default IntroPage;
