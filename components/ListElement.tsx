import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Checkbox from 'expo-checkbox';
import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';


interface ListElementProps {
  elementKey: number;
  titre: string;
  checked: boolean;
  idSubList: number;
  idElem: number;
  disabled: boolean;
  checkedInDb: (idSublist: number, idElement: number, value: number) => void;
  onLongPress?: (idSubList: number, idElem: number) => void;
}

const ListElement: React.FC<ListElementProps> = ({ elementKey, titre, checked, idSubList, idElem, disabled, checkedInDb, onLongPress }) => {
  const [isChecked, setChecked] = useState(checked);

  const checkElement = (value: boolean) => {
    checkedInDb(idSubList, idElem, value ? 1 : 0);
    setChecked(value);
  };

  return (
    <Pressable 
      onLongPress={() => onLongPress?.(idSubList, idElem)}
      onStartShouldSetResponder={() => false} // Permet à la Checkbox de fonctionner normalement
    >
      <ThemedView style={styles.container}>
        <Checkbox 
          style={styles.checkbox} 
          value={isChecked} 
          onValueChange={checkElement} 
          color={isChecked ? '#05AF63' : undefined} 
          disabled={disabled}
        />
        {elementKey === 0 && <ThemedText style={styles.firstTextWithBorder}>{titre}</ThemedText>}
        {elementKey !== 0 && <ThemedText style={styles.textWithBorder}>{titre}</ThemedText>}
      </ThemedView>
    </Pressable>
  );
};

const styles =  StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',  // Centre les éléments verticalement
    marginBottom:hp('0.5%'),
  },
  checkbox: {
    marginRight:wp('1.3%'),
    width: hp('3%'),  // Taille de la checkbox adaptée à l'écran
    height: hp('3%'),
  },
  textWithBorder: {
    borderRightWidth: wp('0.3%'),     // Bordure à droite
    borderBottomWidth: wp('0.3%'),    // Bordure en bas
    borderColor: 'black',    // Couleur de la bordure
    flex:1,    // Espacement du texte par rapport à la bordure
    height:hp('3%'),
    flexWrap: 'wrap', 
    maxWidth:'90%'
  },
  firstTextWithBorder: {
    borderTopWidth:wp('0.3%'),
    borderRightWidth: wp('0.3%'),     // Bordure à droite
    borderBottomWidth: wp('0.3%'),    // Bordure en bas
    borderColor: 'black',    // Couleur de la bordure
    flex:1,    // Espacement du texte par rapport à la bordure
    height:hp('3.5%'),
    flexWrap: 'wrap', 
    maxWidth:'90%'
  },
});

export default ListElement;
