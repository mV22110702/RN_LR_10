import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../app';
import { FC, Fragment, useCallback } from 'react';
import {
    Button,
    Toast,
    Divider,
    FlatList,
    Text,
    VStack,
    Center, Box,
} from 'native-base';
import { useSelector } from 'react-redux';
import {
  clearBasket,
  selectAllEntries,
} from '../../../../slices/basket/basket.slice';
import { BasketListItem } from './components/basket-list-item';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import { Notification } from '../../notification';

export type BasketScreenProps = BottomTabScreenProps<
  MainTabParamList,
  'Basket'
>;
export const BasketScreen: FC<BasketScreenProps> = () => {
  const basketEntries = useSelector(selectAllEntries);
  const dispatch = useAppDispatch();
  const handlePressCheckout = useCallback(() => {
    dispatch(clearBasket());
    Toast.show({
      render: ({ id }) => {
        return (
          <Notification
            marginTop={20}
            id={id}
            title={'Currency bought'}
            variant={'solid'}
            status={'success'}
          />
        );
      },
      placement: 'top',
    });
  }, []);
  return (
    <VStack flex={1}>
      {basketEntries.length === 0 ? (
        <Box
        flex={1}
          justifyContent={'center'}
          alignItems={'center'}

        >
          <Text fontSize={'4xl'}>Basket is empty!</Text>
        </Box>
      ) : (
        <Fragment>
          <FlatList
            data={basketEntries}
            px={5}
            renderItem={({ item }) => <BasketListItem basketEntry={item} />}
            ItemSeparatorComponent={() => <Divider />}
          />
          <Button onPress={handlePressCheckout}>Checkout</Button>
        </Fragment>
      )}
    </VStack>
  );
};
