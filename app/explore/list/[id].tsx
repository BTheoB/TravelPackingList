import {Alert, Pressable, StyleSheet} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ListElementType, ListType, SubListType } from '../../types';

import { useLocalSearchParams } from 'expo-router';
import ListElement from '@/components/ListElement';
import { IconSymbol } from '@/components/ui/IconSymbol';
import * as PersistenceManager from '@/persistance/PersistenceManager';
import { useEffect, useState } from 'react';
import { Collapsible } from '@/components/Collapsible';

import AddElementButton from '@/components/AddElementButton';
import AddSubListButton from '@/components/AddSubListButton';

import { router } from 'expo-router';
import DupliqueListButton from '@/components/DupliqueListButton';
export default function ListView() { 

  //Potentiellement inverser l'ordre pour avoir les plus récents en premier
  const { id } = useLocalSearchParams();

  
  const [elements, setElements] = useState<ListElementType[]>([]);
  const [sublists, setSublists] = useState<SubListType[]>([]);
  const [list, setList] = useState<ListType>();

  const [archived, setArchived] = useState<boolean>();

  const refreshElements = () => {
    PersistenceManager.getElementsViaList(id as unknown as number).then((elements) => {
      setElements(elements as ListElementType[]);
    });
  };

  const refreshSubLists = () => {
    PersistenceManager.getSubLists(id as unknown as number).then((sublists) => {
      setSublists(sublists as SubListType[]);
    });
  };

  useEffect(() => {
    PersistenceManager.isArchived(id as unknown as number).then((result)=>{
      const typedResult = result as { archived: number };
      setArchived(!!typedResult.archived);
    });
    PersistenceManager.getList(id as unknown as number).then((list) => {
      setList(list as ListType);
    });
    refreshElements();
    refreshSubLists();
  }, []);

  const addSubList = async (titre : string) => {
    await PersistenceManager.addSubList(id as unknown as number, titre).then(() => {refreshSubLists();});
  };
  const deleteSubList = (idSubList : number) => {
    if(!archived){
      PersistenceManager.deleteSubList(id as unknown as number, idSubList).then(() => {refreshSubLists(); refreshElements();});
    }
  };

  const addElement = async (idSublist : number,titre : string) => {
    await PersistenceManager.addElement(id as unknown as number, idSublist, titre).then(() => {refreshElements();});
  }
  const deleteElement = async (idSublist : number,idElement : number) => {
    if(!archived){
      await PersistenceManager.deleteElement(id as unknown as number, idSublist, idElement).then(() => {refreshElements();});
    }
  }
  const checkElement = async (idSublist : number, idElement : number, value : number) => {
    await PersistenceManager.checkElement(id as unknown as number, idSublist, idElement, value).then(() => {refreshElements();});
    await PersistenceManager.getElementsViaList(id as unknown as number);
  }

  const duplicateArchive = async (newTitre: string) => {
    await PersistenceManager.duplicateArchive(id as unknown as number, newTitre);
    router.back();
  }

  const handleArchiveList = () => {
    Alert.alert(
      "Archiver la liste",
      "Êtes-vous sûr de vouloir archiver cette liste ?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Confirmer", 
          onPress: async () => {
            await PersistenceManager.archiveList(Number(id), 1);
            setArchived(true);
            router.back();
          } 
        }
      ]
    );
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
        <ThemedView>
          <Pressable onPress={handleArchiveList} >
            <ThemedView style={[styles.titleContainer, {top:'14%', right:'15%', backgroundColor:'#EFEFD9'}]}>
              <ThemedText type="title" style={{padding:'5%', left:'10%'}}>{list?.titre[0]}</ThemedText>
              <ThemedText style={{fontFamily:'RobotoRegular', fontSize: 25, padding:10, flexWrap:'wrap', maxWidth:'90%'}} type="subtitle">{list?.titre.slice(1)}</ThemedText>
            </ThemedView>
          </Pressable>
        </ThemedView>
        {!archived && <ThemedView>
          <AddSubListButton onAddSubList={addSubList}/>
        </ThemedView>}
        {archived && list && <DupliqueListButton oldTitre={list.titre} onDupliqueSubList={duplicateArchive} />}
        <ThemedView>
          {sublists.map((subList) => (
            <Collapsible key={subList.idSublist} title={subList.titre} longPressFunc={() => deleteSubList(subList.idSublist)} idSubList={subList.idSublist}>
              {!archived && <AddElementButton onAddElement={addElement}  idSublist={subList.idSublist}/>}
              {elements.filter(element => element.idSublist === subList.idSublist)
              .slice() // Copie la liste pour éviter la mutation
              .sort((a, b) => a.titre.localeCompare(b.titre)) // Trie les éléments par ordre alphabétique
              .map((element,index) => (
                <ListElement key={index} elementKey={index} idElem={element.idElem} idSubList={subList.idSublist} 
                titre={element.titre} checked={!!element.checked} disabled={!!archived}
                checkedInDb={checkElement} onLongPress={deleteElement} />
              ))}
          </Collapsible>
          ))}
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
  }
});
