import { SERVER_URL } from '../api';

const CategoryCard = ({ title, image }) => {
  const imageUrl = image && image.startsWith('/uploads') 
      ? `${SERVER_URL}${image}` 
      : image;

  return (
    <div className="card">
      <div 
        className="card-background" 
        style={{ backgroundImage: `url(${imageUrl})` }} 
      ></div>
      <h2>{title}</h2>
    </div>
  );
};
export default CategoryCard;