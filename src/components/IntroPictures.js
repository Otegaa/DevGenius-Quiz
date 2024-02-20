import { Link } from "react-router-dom";
import { data } from "data/data";
import { useQuiz } from "contexts/QuizContext";

const IntroPictures = () => {
  const { dispatch, handleCancel } = useQuiz();

  return (
    <div className="flex flex-col gap-3">
      {data.map((lang) => {
        const { img, name } = lang;
        return (
          <Link
            to={`/questions/${name}`}
            key={name}
            onClick={() => {
              handleCancel();
              dispatch({ type: "start", payload: name });
            }}
          >
            <div className="flex items-center gap-2 rounded bg-white">
              <img
                src={img}
                alt={name}
                className="h-10 w-10 object-contain px-2 py-2"
                onClick={() => {
                  dispatch({ type: "resetState" });
                }}
              />
              <h4 className="uppercase">{name}</h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default IntroPictures;
