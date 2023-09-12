import { Link } from 'react-router-dom';
import { data } from 'data/data';

const IntroPictures = () => {
  return (
    <div className="container">
      <div className="intropic-container">
        {data.map((lang) => {
          const { img, name } = lang;

          if (name === 'Javascript') {
            return (
              <Link to={`/questions/frameworks`} key={name}>
                <div className="picture-box">
                  <img src={img} alt={name} className="intropage-img" />
                </div>
              </Link>
            );
          }

          return (
            <Link to={`/questions/${name}`} key={name}>
              <div className="picture-box">
                <img src={img} alt={name} className="intropage-img" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default IntroPictures;
