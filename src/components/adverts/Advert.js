import React from 'react';

import Photo from '../shared/Photo';
import './Advert.css';

const Advert = ({ name, sale, price, tags, updatedAt}) => {
  return (
    <article className="advert bordered">
      <div className="left">
        <Photo className="advert-photo" />
      </div>
      <div className="right">
        <div className="advert-header">
          <span className="advert-name">{name}</span>
          <span className="advert-separator">·</span>
        </div>
        <div>
          {name}
          {sale}
          {price}
          {tags}
          <div className="advert-actions">
          </div>
        </div>
      </div>
    </article>
  );
};

export default Advert;
