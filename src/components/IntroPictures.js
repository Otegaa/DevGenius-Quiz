import { data } from 'data/data';

const IntroPictures = () => {
  return (
    <div className="container">
      <div className="intropic-container">
        {data.map((lang) => {
          const { img, name } = lang;
          return (
            <div className="picture-box" key={name}>
              <img src={img} alt={name} className="intropage-img" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default IntroPictures;
