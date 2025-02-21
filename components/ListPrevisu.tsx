import React from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface ListPrevisuProps {
  titre: string;
  id: number;
  date?: string;

}

const ListPrevisu: React.FC<ListPrevisuProps> = ( Props ) => {
  return (
      <ThemedView style={{backgroundColor: '#EDEDE9', padding: 10, borderColor:'black', borderWidth: 1, borderRadius: 10, margin: 10}}>
        <TouchableOpacity onPress={() => {console.log('clicked');
           router.push({ pathname: '/list/[id]', params: { id: Props.id } });
        }}>
          <ThemedText>{Props.titre}</ThemedText>
          <ThemedText>{Props.date}</ThemedText>
        </TouchableOpacity>
      </ThemedView>
  );
};

export default ListPrevisu;