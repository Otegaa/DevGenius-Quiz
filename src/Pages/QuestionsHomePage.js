import IntroPictures from '../components/IntroPictures';
const QuestionsHomePage = () => {
  console.log('QuestionsHomePage rendered');
  return (
    <div className="languages-box">
      <h2>Welcome!... There are X questions for each language</h2>
      <h4>Please select your favorite language!</h4>
      <IntroPictures />
    </div>
  );
};
export default QuestionsHomePage;
