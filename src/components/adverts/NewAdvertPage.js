import { memo, useCallback, useMemo, useState } from 'react';
import Layout from '../layout/Layout';
import Button from '../shared/Button';
import Photo from '../shared/Photo';
import FormField from '../shared/FormField'

import './NewAdvertPage.css';
import { createAdvert } from './service';
import { useNavigate } from 'react-router-dom';

const MIN_CHARACTERS = 5;
const MAX_CHARACTERS = 140;

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [sale, setSale] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');

  const handleChangeName = event => {
    setName(event.target.value);
  };
  const handleChangeSale = event => {
    setSale(event.target.value);
  };
  const handleChangePrice = event => {
    setPrice(event.target.value);
  };
  const handleChangeTags = event => {
    setTags(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const advert = await createAdvert({ name, sale, price, tags });
      setIsLoading(false);
      navigate(`/adverts/${advert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

  const isDisabled = isLoading || name.length < MIN_CHARACTERS;
  const characters = `${name.length} / ${MAX_CHARACTERS} characters`;

  /*
  const objProperty = useMemo(() => {
    return { isLoading };
  }, [isLoading]);

  const funcProperty = useCallback(() => {
    console.log('isLoading', isLoading);
  }, [isLoading]);
  */

  return (
    <Layout title="New advert">
      <div className="newAdvertPage bordered">
        <div className="left">
          <Photo />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
          <FormField
              name="name"
              className="newAdvertPage-formfield"
              placeholder="Advert's name"
              onChange={handleChangeName}
              value={name}
              maxLength={MAX_CHARACTERS}
              autofocus
            />
            <FormField
              name="sale"
              className="newAdvertPage-formfield"
              placewholder="is for sale"
              onChange={handleChangeSale}
              value={sale}
              maxLength={MAX_CHARACTERS}
            />
            <FormField
              name="price"
              className="newAdvertPage-formfield"
              placeholder="Advert's price"
              onChange={handleChangePrice}
              value={price}
              maxLength={MAX_CHARACTERS}
            />
            <FormField
              name="tags"
              className="newAdvertPage-formfield"
              placeholder="Advert's tags"
              onChange={handleChangeTags}
              value={tags}
              maxLength={MAX_CHARACTERS}
            />
            <div className="newAdvertPage-footer">
              <span className="newAdvertPage-characters">{characters}</span>
              <Button
                type="submit"
                className="newAdvertPage-submit"
                variant="primary"
                disabled={isDisabled}
              >
                Add advert
              </Button>
            </div>
          </form>          
        </div>
      </div>
    </Layout>
  );
};

export default NewAdvertPage;
