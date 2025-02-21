import {StyleSheet} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ListElementType } from '../../types';

import { useLocalSearchParams } from 'expo-router';
import ListElement from '@/components/ListElement';

interface ListViewProps {
  id: string;
  elements: ListElementType[];
}

export default function ListView(Props: ListViewProps) { 

  //Potentiellement inverser l'ordre pour avoir les plus récents en premier
  const data = [
    {
      id: 1,
      titre: 'Liste de course',
      date: '27-07-2000',
    }
  ];

  const { id } = useLocalSearchParams();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      >
      <ThemedView>
        <ThemedView style={[styles.titleContainer, {left:'15%', top:'12%'}]}>
          <ThemedText type="title">T</ThemedText>
          <ThemedText style={{fontFamily:'RobotoRegular', fontSize: 25, paddingTop:7,}} type="subtitle">{id}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.titleContainer]}>
          <ThemedText type="title">P</ThemedText>
          <ThemedText style={{fontFamily:'RobotoRegular', fontSize: 25, paddingTop:7,}} type="subtitle">ACKING LIST</ThemedText>
        </ThemedView>
        </ThemedView>
      <ThemedView>
      {data.map((item) => (
            <ListElement key={item.id} titre={item.titre} checked={false} />
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
  },
});
