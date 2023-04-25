import React from 'react';

import Photo from '../shared/Photo';
import './Advert.css';

const Advert = ({ name, sale, price, tags, photo, createdAt}) => {
  return (
    <article className="advert bordered">
      <div className="left">
        <Photo className="advert-photo" />
      </div>
      <div className="center">
        <div className="advert-header">
          <span className="advert-name">{name}</span>
          <span className="advert-separator">·</span>
        </div>
        <div>
          <p>Type: {sale? 'Sale' : 'Buy'} | Price: {price} | Tags: {tags}</p>
          <p>Created: {createdAt}</p>
          <div className="advert-actions">
          </div>
        </div>
      </div>
      <div className="right">
        <img className="advert-foto" 
        src={photo ? photo : "https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?k=6&m=1216251206&s=612x612&w=0&h=G8kmMKxZlh7WyeYtlIHJDxP5XRGm9ZXyLprtVJKxd-o="} 
        alt="Imagen"/>
      </div>
    </article>
  );
};

export default Advert;
