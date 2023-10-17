import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_KEY, API_LISTINGS_LATEST_URL } from '@env';
import {
  CoinMarketStatus,
  GetListingsLatestResponse,
  Listing,
} from './types/types';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { AppState } from '../../libs/packages/store/store';

const mockApiResult = {
  "status": {
    "timestamp": "2023-10-17T20:49:46.937Z",
    "error_code": 0,
    "error_message": null,
    "elapsed": 22,
    "credit_count": 1,
    "notice": null,
    "total_count": 8877
  },
  "data": [
    {
      "id": 1,
      "name": "Bitcoin",
      "symbol": "BTC",
      "slug": "bitcoin",
      "num_market_pairs": 10494,
      "date_added": "2010-07-13T00:00:00.000Z",
      "tags": [
        "mineable",
        "pow",
        "sha-256",
        "store-of-value",
        "state-channel",
        "coinbase-ventures-portfolio",
        "three-arrows-capital-portfolio",
        "polychain-capital-portfolio",
        "binance-labs-portfolio",
        "blockchain-capital-portfolio",
        "boostvc-portfolio",
        "cms-holdings-portfolio",
        "dcg-portfolio",
        "dragonfly-capital-portfolio",
        "electric-capital-portfolio",
        "fabric-ventures-portfolio",
        "framework-ventures-portfolio",
        "galaxy-digital-portfolio",
        "huobi-capital-portfolio",
        "alameda-research-portfolio",
        "a16z-portfolio",
        "1confirmation-portfolio",
        "winklevoss-capital-portfolio",
        "usv-portfolio",
        "placeholder-ventures-portfolio",
        "pantera-capital-portfolio",
        "multicoin-capital-portfolio",
        "paradigm-portfolio",
        "bitcoin-ecosystem",
        "ftx-bankruptcy-estate"
      ],
      "max_supply": 21000000,
      "circulating_supply": 19516637,
      "total_supply": 19516637,
      "infinite_supply": false,
      "platform": null,
      "cmc_rank": 1,
      "self_reported_circulating_supply": null,
      "self_reported_market_cap": null,
      "tvl_ratio": null,
      "last_updated": "2023-10-17T20:48:00.000Z",
      "quote": {
        "USD": {
          "price": 28508.235425786843,
          "volume_24h": 15537502687.772703,
          "volume_change_24h": -44.6111,
          "percent_change_1h": 0.08278958,
          "percent_change_24h": 0.16843262,
          "percent_change_7d": 4.29658903,
          "percent_change_30d": 7.65885149,
          "percent_change_60d": 8.93011588,
          "percent_change_90d": -5.03632161,
          "market_cap": 556384882315.6222,
          "market_cap_dominance": 51.1453,
          "fully_diluted_market_cap": 598672943941.52,
          "tvl": null,
          "last_updated": "2023-10-17T20:48:00.000Z"
        }
      }
    },
    {
      "id": 1027,
      "name": "Ethereum",
      "symbol": "ETH",
      "slug": "ethereum",
      "num_market_pairs": 7565,
      "date_added": "2015-08-07T00:00:00.000Z",
      "tags": [
        "pos",
        "smart-contracts",
        "ethereum-ecosystem",
        "coinbase-ventures-portfolio",
        "three-arrows-capital-portfolio",
        "polychain-capital-portfolio",
        "binance-labs-portfolio",
        "blockchain-capital-portfolio",
        "boostvc-portfolio",
        "cms-holdings-portfolio",
        "dcg-portfolio",
        "dragonfly-capital-portfolio",
        "electric-capital-portfolio",
        "fabric-ventures-portfolio",
        "framework-ventures-portfolio",
        "hashkey-capital-portfolio",
        "kenetic-capital-portfolio",
        "huobi-capital-portfolio",
        "alameda-research-portfolio",
        "a16z-portfolio",
        "1confirmation-portfolio",
        "winklevoss-capital-portfolio",
        "usv-portfolio",
        "placeholder-ventures-portfolio",
        "pantera-capital-portfolio",
        "multicoin-capital-portfolio",
        "paradigm-portfolio",
        "injective-ecosystem",
        "layer-1",
        "ftx-bankruptcy-estate"
      ],
      "max_supply": null,
      "circulating_supply": 120260916.34672225,
      "total_supply": 120260916.34672225,
      "infinite_supply": true,
      "platform": null,
      "cmc_rank": 2,
      "self_reported_circulating_supply": null,
      "self_reported_market_cap": null,
      "tvl_ratio": null,
      "last_updated": "2023-10-17T20:48:00.000Z",
      "quote": {
        "USD": {
          "price": 1563.015275578461,
          "volume_24h": 5420123469.686561,
          "volume_change_24h": -37.2157,
          "percent_change_1h": 0.01144724,
          "percent_change_24h": -1.74293538,
          "percent_change_7d": 0.6385865,
          "percent_change_30d": -3.67723903,
          "percent_change_60d": -5.95452182,
          "percent_change_90d": -17.91127992,
          "market_cap": 187969649304.9903,
          "market_cap_dominance": 17.2759,
          "fully_diluted_market_cap": 187969649304.99,
          "tvl": null,
          "last_updated": "2023-10-17T20:48:00.000Z"
        }
      }
    }
  ]
};

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  headers: {
    'Accept-Encoding': 'deflate, gzip',
    'Accept': 'application/json',
    'X-CMC_PRO_API_KEY': API_KEY,
  },
});

const listingsEntityAdapter = createEntityAdapter<Listing>({
  sortComparer: (listingA, listingB) =>
    listingA.name.localeCompare(listingB.name),
});

const initialListingsState = listingsEntityAdapter.getInitialState();

type ListingsLatestState = ReturnType<
  typeof listingsEntityAdapter.getInitialState
>;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    getListingsLatest: builder.query<ListingsLatestState, undefined>({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        // const fetchArgs: FetchArgs = {
        //   url: `${API_LISTINGS_LATEST_URL}?convert=USD&limit=10`,
        // };
        try {
          // const response = await baseQuery(fetchArgs);
          //TODO: remove mock
          const response = mockApiResult;
          const apiResult = mockApiResult;
          if (apiResult.status.error_code !== 0) {
            return {
              error: {
                status: apiResult.status.error_code,
                data: apiResult.status.error_message,
              },
            };
          }
          const { data } = response;
          const transformedData = listingsEntityAdapter.addMany(
            listingsEntityAdapter.getInitialState(),
            data ?? [],
          );
          return { data: transformedData };
        } catch (_error) {
          const error = _error as FetchBaseQueryError;
          return { error };
        }
      },
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetListingsLatestQuery } = apiSlice;
export const {
  selectIds: selectListingIds,
  selectById: selectListingById,
  selectAll: selectAllListings,
} = listingsEntityAdapter.getSelectors<AppState>(
  (state) =>
    apiSlice.endpoints.getListingsLatest.select(undefined)(state).data ??
    initialListingsState,
);


