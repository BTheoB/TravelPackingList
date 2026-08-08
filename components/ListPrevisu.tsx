import React from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { TouchableOpacity, StyleSheet  } from 'react-native';
import { router } from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { IconSymbol } from './ui/IconSymbol';

interface ListPrevisuProps {
  titre: string;
  id: number;
  onDelete: (id: number) => void;
}

const ListPrevisu: React.FC<ListPrevisuProps> = ( Props ) => {
  return (
      <ThemedView style={{backgroundColor: '#EDEDE9', padding: 15, borderColor:'black', borderWidth: 1, 
                          borderRadius: 10, margin: 10, borderStyle:'dashed',
                          flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
        <TouchableOpacity onPress={() => {
           router.push({ pathname: '/explore/list/[id]', params: { id: Props.id } });
        }}>
          <ThemedText style={{flexWrap: 'wrap', maxWidth:'90%'}}>{Props.titre}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => Props.onDelete(Props.id)}>
          <IconSymbol name="trash" size={24} color="#ff0000" />
        </TouchableOpacity>
      </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEDE9',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});

export default ListPrevisu;