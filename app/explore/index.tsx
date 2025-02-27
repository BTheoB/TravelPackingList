import {StyleSheet, Text, TouchableOpacity} from 'react-native';


import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ListPrevisu from '@/components/ListPrevisu';
import { useCallback, useEffect, useState } from 'react';

import RoundButtonWithModal from '@/components/AddListButtonWithModal'

import * as PersistenceManager from '@/persistance/PersistenceManager';
import { useFocusEffect } from 'expo-router';

export default function TabTwoScreen() {

  interface ListItem {
    id: number;
    titre: string;
    date: string;
  }

  const [lists, setLists] = useState<ListItem[]>([]);

  const refreshLists = () => {
    PersistenceManager.getNoneArchivedLists().then((lists) => {
      setLists(lists as ListItem[]);
    });
  };

  useFocusEffect(
    useCallback(() => {
      refreshLists();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  useEffect(() => {
    refreshLists();
  }, []);

  const addList = async (titre : string) => {
    await PersistenceManager.addList(titre).then(() => {refreshLists();});
  };

  const deleteList = async (id : number) => {
    await PersistenceManager.deleteList(id).then(() => {refreshLists();});
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style= {{ flexDirection:'row', alignContent:'center', alignItems:'center', justifyContent: 'space-between', marginBottom:'5%'}}>
        <ThemedView>
          <ThemedView style={[styles.titleContainer, {left:'15%', top:'12%'}]}>
            <ThemedText type="title">T</ThemedText>
            <ThemedText style={{fontFamily:'RobotoRegular', fontSize: 25, paddingTop:7,}} type="subtitle">RAVEL</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.titleContainer]}>
            <ThemedText type="title">P</ThemedText>
            <ThemedText style={{fontFamily:'RobotoRegular', fontSize: 25, paddingTop:7,}} type="subtitle">ACKING LIST</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={{ alignItems:'center'}}>
          <RoundButtonWithModal onPress={addList}/>
        </ThemedView>
      </ThemedView>
        

      <ThemedView>
        {lists.length > 0 ? (
          lists.map((item) => (
            <ListPrevisu key={item.id} titre={item.titre} id={item.id} onDelete={deleteList} />
          ))
        ) : (
        <ThemedText style={{width:'80%', textAlign: 'justify',}} type='defaultSemiBold'>Aucune liste disponible, créer en une avec le boutton + !</ThemedText>
        )}
      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row'
  },
  button: {
    width: 60,               // Taille du bouton
    height: 60,              // Taille du bouton (carré)
    borderRadius: 30,        // Bordures arrondies pour le rendre rond
    backgroundColor: '#05AF63', // Couleur de fond (ici vert)
    justifyContent: 'center', // Centrer le texte verticalement
    alignItems: 'center',    // Centrer le texte horizontalement
  },
  buttonText: {
    fontSize: 30,            // Taille du texte
    color: '#fff',           // Couleur du texte
  }
});
