import {StyleSheet} from 'react-native';


import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ListPrevisu from '@/components/ListPrevisu';
import { useEffect, useState } from 'react';


import * as PersistenceManager from '@/persistance/PersistenceManager';

export default function Archive() {

  interface ListItem {
    id: number;
    titre: string;
    date: string;
  }

  const [lists, setLists] = useState<ListItem[]>([]);

  const refreshLists = () => {
    PersistenceManager.getArchivedLists().then((lists) => {
      setLists(lists as ListItem[]);
    });
  };

  useEffect(() => {
    refreshLists();
  }, []);

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
          <ThemedView style={[styles.titleContainer, {left:'15%', top:'12%'}]}>
            <ThemedText type="title">A</ThemedText>
            <ThemedText style={{fontFamily:'RobotoRegular', fontSize: 25, paddingTop:7,}} type="subtitle">RCHIVE</ThemedText>
          </ThemedView>
      </ThemedView>
        

      <ThemedView>
        {lists.length > 0 ? (
          lists.map((item) => (
            <ListPrevisu key={item.id} titre={item.titre} id={item.id} onDelete={deleteList} />
          ))
        ) : (<>
              <ThemedText type='defaultSemiBold'>Aucune archives / template disponible</ThemedText>
              <ThemedText style={{width:'80%', textAlign: 'justify',}}>tu peux créer un template à partir d'une liste existante en cliquant sur le titre de la liste !</ThemedText>
            </>
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
