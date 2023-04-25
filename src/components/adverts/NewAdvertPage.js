import { useState } from 'react';
import Layout from '../layout/Layout';
import Button from '../shared/Button';
import Photo from '../shared/Photo';
import FormField from '../shared/FormField'
import ListaSeleccionMultiple from '../shared/ListElement';


import './NewAdvertPage.css';
import { createAdvert } from './service';
import { useNavigate } from 'react-router-dom';

const MIN_CHARACTERS = 5;
const MAX_CHARACTERS_NAME = 60;

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [sale, setSale] = useState(null);
  const [price, setPrice] = useState(null);
  const [tags, setTags] = useState(null);

  const handleChangeName = event => {
    setName(event.target.value);
  };
  function handleCheckboxChange(event) {
    const newValue = event.target.value;
    setSale(newValue === sale ? null : newValue);
  }
  const handleChangePrice = event => {
    setPrice(event.target.value);
  };
  const handleChangeTags = event => {
    setTags(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsLoading(true);
      console.log('Entrada: ' ,{ name, sale, price, tags });
      const advert = await createAdvert({ name, sale, price, tags });
      console.log('Salida: ', advert);
      setIsLoading(false);
      navigate(`/adverts/${advert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

  const isDisabled = isLoading || name.length < MIN_CHARACTERS;
  const charactersName = `${name.length} / ${MAX_CHARACTERS_NAME} chars (min 5)`;

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
            <div className="newAdvertPage-flex"> 
              <div className="FieldLabel right">Name</div>
              <div className="newAdvertPage-characters left">{charactersName}</div>
            </div>
          <FormField
              name="name"
              className="newAdvertPage-formfield"
              placeholder="Advert's name"
              onChange={handleChangeName}
              value={name}
              maxLength={MAX_CHARACTERS_NAME}
              autofocus
              />
            <div className="newAdvertPage-flex">
              <span className="FieldLabel">Type</span>
              <div>

      <label>
        <input
          type="checkbox"
          name="For sale"
          value="true"
          checked={sale === "true"}
          onChange={handleCheckboxChange}
          />
        For sale
      </label>

      <label>
        <input
          type="checkbox"
          name="For buy"
          value="false"
          checked={sale === "false"}
          onChange={handleCheckboxChange}
          />
        For buy
      </label>
    </div>

    </div>
            <div className="newAdvertPage-flex"> 
              <div className="FieldLabel right">Price</div>
              <div className="newAdvertPage-characters left">Only numbers</div>
            </div>
            <FormField
              name="price"
              className="newAdvertPage-formfield"
              placeholder="Advert's price"
              onChange={handleChangePrice}
              value={price}
              maxLength={MAX_CHARACTERS_NAME}
            />
            <div>
            <span className="FieldLabel">Tags</span>
            <ListaSeleccionMultiple 
              opciones={['lifestyle', 'mobile', 'motor', 'work']}
              name="tags"
              value="tags"
              onChange={handleChangeTags}
              />
              </div>
            <div className="newAdvertPage-footer">
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
