import React from 'react';

const CategoryCard = ({ title, image }) => {
  return (
    <div className="col">
      <div className="card rounded-3 h-100">
        <img className="card-img-top img-fluid rounded-3" src={image} alt={title} />
        <div className="card-body d-flex align-items-center justify-content-center">
          <h4 className="card-title text-center">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
