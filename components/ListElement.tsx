import React, { useState } from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Checkbox from 'expo-checkbox';

interface ListElementProps {
  titre: string;
  checked: boolean;
}

const ListElement: React.FC<ListElementProps> = ( Props ) => {

  const [isChecked, setChecked] = useState(Props.checked);

  const checkElement = () => {
    setChecked(!isChecked);
    //ici mettre en base le changement de l'élément
    return isChecked ? 'checked' : 'unchecked';
  }

  return (
      <ThemedView style={{backgroundColor: '#EDEDE9', padding: 10, borderColor:'black', borderWidth: 1, borderRadius: 10, margin: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Checkbox style={{margin: 8}} value={isChecked} onValueChange={setChecked} color={isChecked ? '#4630EB' : undefined} />
        <ThemedText>{Props.titre}</ThemedText>
      </ThemedView>
  );
};

export default ListElement;