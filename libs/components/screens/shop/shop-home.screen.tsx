import {
  selectAllListings,
  useGetListingsLatestQuery,
} from '../../../../slices/api/api.slice';
import { useSelector } from 'react-redux';
import {Center, Divider, FlatList, Heading, Spinner} from 'native-base';
import { showErrorMessage } from '../../../helpers/show-error-message.helper';
import { ShopListItem } from './components/shop-list-item';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {CompositeScreenProps} from "@react-navigation/native";
import {MainTabParamList} from "../../app";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {ShopParamsList} from "./shop-screen";
import {FC} from "react";

type ShopHomeScreenParams = CompositeScreenProps<
    NativeStackScreenProps<ShopParamsList, 'ShopHome'>,
    BottomTabScreenProps<MainTabParamList>
>;

export const ShopHomeScreen:FC<ShopHomeScreenParams> = () => {
  const { isFetching, error } = useGetListingsLatestQuery(undefined);
  const listings = useSelector(selectAllListings);
  if (isFetching) {
    console.log('fetching');
    console.log(listings);
    return <Spinner flex={1} />;
  }
  if (error) {
    console.log('error');
    console.log(listings);
    return <Heading>{showErrorMessage(error)}</Heading>;
  }
  console.log(
    'listings==============================================================',
  );
  console.log(listings);
  return (
    <Center mt={50} flex={1} >
      <FlatList
          width={'100%'}
          px={5}
        data={listings}
        renderItem={({ item }) => <ShopListItem listing={item} />}
        ItemSeparatorComponent={()=><Divider/>}
      />
    </Center>
  );
};
