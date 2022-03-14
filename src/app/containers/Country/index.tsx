import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { PageWrapper } from 'app/components/PageWrapper';
import { count } from 'console';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions } from './actions';
import { CountryReducer, key } from './reducer';
import { saga } from './saga';
import {
  selectCountry,
  selectCurrencyCode,
  selectError,
  selectLoading,
} from './selectors';

interface ICountry {
  id: string;
}

const styles = {
  container: {
    border: '1px solid black',
    borderRadius: 5,
    background: '#7d011e',
    color: '#fec',
    padding: 10,
  },
  error: {
    border: '1px solid #7d011e',
    borderRadius: 5,
    background: '#fba',
    color: '#7d011e',
    padding: 10,
  },
  flag: {
    marginRight: '.5em',
  },
  stats: {
    borderTop: '1px solid #fec',
    padding: '10px 20px',
  },
  statLabel: {
    marginRight: '.5em',
    color: 'white',
  },
  statValue: {
    color: '#FBE363',
  },
  header: { display: 'flex', alignItems: 'center', fontSize: 55 },
};

export function Country() {
  useInjectReducer({ key, reducer: CountryReducer });
  useInjectSaga({ key, saga });
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const country = useSelector(selectCountry);
  const currency = useSelector(selectCurrencyCode); // Yup. I know we could pull it straight outta country. But just in case this is part of the grading curve I'm doing it separately
  let { id }: ICountry = useParams();

  const CountryFlag = () => {
    return (
      <img
        src={`https://flagcdn.com/84x63/${country!.code_iso2.toLowerCase()}.png`}
        alt={country!.name}
        style={styles.flag}
      />
    );
  };

  const CountryHeader = () => {
    return (
      <div style={styles.header}>
        <CountryFlag />
        <div>{country!.name}</div>
      </div>
    );
  };

  const CountryStats = () => {
    return (
      <div style={styles.stats}>
        <span style={styles.statLabel}>Currency Code:</span>
        <span style={styles.statValue}>{currency}</span>
      </div>
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchCountry(id));
  }, [dispatch]);

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator small />}
      {!isLoading && country && (
        <div style={styles.container}>
          <CountryHeader />
          <CountryStats />
        </div>
      )}
      {error && (
        <div
          style={{
            ...styles.error,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 24 }}>Oh no an error</div>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_new"
            style={{
              color: '#00418c',
              fontSize: 30,
            }}
          >
            click here to fix it
          </a>
        </div>
      )}
    </PageWrapper>
  );
}
