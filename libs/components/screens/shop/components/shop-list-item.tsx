import { FC, useCallback } from 'react';
import { Listing } from '../../../../../slices/api/types/types';
import { Button, Center, HStack, Image, Text, VStack } from 'native-base';
import { API_IMAGE_BASE_URL } from '@env';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch.hook';
import { addEntry } from '../../../../../slices/basket/basket.slice';
import NumericInput from 'react-native-numeric-input'

type Properties = { listing: Listing };
export const ShopListItem: FC<Properties> = ({ listing }) => {
  const dispatch = useAppDispatch();
  const handlePressBuy = useCallback(() => {
    //TODO: number input for amount
    dispatch(addEntry({ chosenListing: { ...listing }, amount: 1 }));
  }, [listing]);
  return (
    <HStack
      my={30}
      flexDirection={'row'}
      justifyContent={'space-between'}
      flex={1}
    >
      <HStack space={2} flex={3}>
        <Center>
          <Image
            alt={listing.slug}
            source={{
              uri: `${API_IMAGE_BASE_URL}${listing.slug}.png`,
            }}
            size={10}
          />
        </Center>
        <VStack space={1} alignContent={'start'}>
          <Text>{listing.name}</Text>
          <Text>{listing.symbol}</Text>
        </VStack>
      </HStack>
      <VStack space={10} flex={1}>
        <Text color={'warning'}>{listing.quote.USD.price.toFixed(2)} $</Text>
        <Button onPress={handlePressBuy} size={10} colorScheme={'info'} width={75}>
          Buy
        </Button>
        {/*<NumericInput onChange={value => console.log(value)} />*/}
      </VStack>
    </HStack>
  );
};
