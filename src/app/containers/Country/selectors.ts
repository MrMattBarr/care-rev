import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './reducer';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.country || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  countryState => countryState.isLoading,
);

export const selectError = createSelector(
  [selectDomain],
  countryState => countryState.error,
);

export const selectCountry = createSelector([selectDomain], countryState => {
  return countryState.country;
});
export const selectCurrencyCode = createSelector(
  [selectDomain],
  countryState => {
    return countryState.country?.currency_code;
  },
);
