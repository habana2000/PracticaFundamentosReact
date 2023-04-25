import { useEffect, useState } from 'react';
import { getLatestAdverts } from './service';
import Button from '../shared/Button';
import Layout from '../layout/Layout';
import Advert from './Advert';
import { Link } from 'react-router-dom';
// import { useRef } from 'react';

import './AdvertsPage.css'

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>There are NO adverts posted yet !</p>
    <Button as={Link} variant="primary" to="/adverts/new">
      Post an advert
    </Button>
  </div>
);

const AdvertsPage = () => {
  // const isMounted = useRef(false);

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [adverts, setAdverts] = useState([]);

  /*
  useEffect(() => {
    isMounted.current = true;
  }, []);
  */

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const adverts = await getLatestAdverts();
      setAdverts(adverts);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const filteredAdverts = adverts.filter(advert =>
    (advert.name ?? '').toUpperCase().startsWith(query.toUpperCase()),
  );

  return (
    <Layout title="List of Adverts">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {!!adverts.length ? (
            <>
              <div className="search-block">
                <label>
                  Search:{' '}
                  <input
                    type="text"
                    style={{ borderWidth: 1 }}
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                  />
                </label>
              </div>
              <ul>
              {filteredAdverts.map(advert => (
                  <li key={advert.id}>
                    <Link to={`/adverts/${advert.id}`}>
                      <Advert {...advert} />
                    </Link>
                  </li>
              ))}
              </ul>
            </>
          ) : (
            <EmptyList />
          )}
        </div>
      )}
    </Layout>
  );
};

export default AdvertsPage;
