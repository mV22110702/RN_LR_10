export type GetListingsLatestResponse = {
  data: Listing[];
  status: CoinMarketStatus
};

export type CoinMarketStatus = {
  timestamp: string,
  error_code: number,
  error_message: string,
  elapsed: number,
  credit_count: number
}

export type Listing = {
  id: number;
  name: string;
  symbol: string;
  slug:string;
  quote: {
    USD: Quote;
  };
};

export type Quote = {
  price: number;
  last_updated: string;
};
