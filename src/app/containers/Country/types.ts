export interface CountryState {
  isLoading: boolean;
  error?: string;
  country?: {
    currency_code: string;
    name: string;
    code: string;
    code_iso2: string;
    code_iso3: string;
  };
}
