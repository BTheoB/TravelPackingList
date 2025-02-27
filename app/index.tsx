import { Image, StyleSheet, Pressable } from 'react-native';
import { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';

import * as PersistenceManager from '@/persistance/PersistenceManager';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';

export default function HomeScreen() {
  useEffect(() => {
    PersistenceManager.initFirstUse();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <Pressable onPress={() => router.push({ pathname: '/explore' })}>
          <ThemedText type="title">Belli Bella</ThemedText>
        </Pressable>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.textAccuil}>
          Parce que je veux te faciliter la vie et t’accompagner même quand je ne suis pas là,
           j’ai créé cette petite application rien que pour toi. ೭(❛▿❛✿)੭
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.textAccuil}>
          Une façon douce et simple d’organiser tes listes, de ne rien oublier et de cocher ce qui est fait… 
          Notre premier (et j'espère pas le dernier) travail commun entre tes mains.
          Un petit bout de moi, toujours à tes côtés, dans chaque liste cochée. 💙ヾ(๑❛ ▿ ◠๑ )
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Petit tips</ThemedText>
        <ThemedText style={styles.textAccuil}>
          - Si tu souhaite supprimer une sous-liste ou un élément de la liste, 
          il te suffit de rester appuyé sur son nom.
        </ThemedText>
        <ThemedText style={styles.textAccuil}>
          - Tu peux archiver t'es listes !
          Ca te permet de les réutiliser plus tard (en les dupliquant).
          Pour archiver ta liste, clique sur son titre.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Prête ?</ThemedText>
        <Pressable onPress={() => router.push({ pathname: '/explore' })}>
          <ThemedText type='link'>
            Mes listes
          </ThemedText>
        </Pressable>
        <Pressable onPress={() => router.push({ pathname: '/explore/archived' })}>
          <ThemedText type='link'>
            Mes archives
          </ThemedText>
        </Pressable>
      </ThemedView>
      
      <Collapsible title=":P">
        <ExternalLink href="https://www.instagram.com/fuu._u?igsh=czJpZXA2Z2Z6MnI0&ueas logintm_source=qr">
          <ThemedText type="link">Vers où mène ce liens ?...</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'), // Adapté à la largeur de l'écran
  },
  stepContainer: {
    gap: hp('1%'),
    marginBottom: hp('1%'),
  },
  reactLogo: {
    height: hp('20%'), // Rend l'image responsive en hauteur
    width: wp('60%'),  // Rend l'image responsive en largeur
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  textAccuil: {
    textAlign: 'justify',
    fontSize: wp('4%'), // Taille du texte responsive
    paddingHorizontal: wp('2%'), // Marge sur les côtés
  },
});
