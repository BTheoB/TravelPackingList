import React, { useState } from 'react';
import { Modal, TextInput, Button, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons'; // Importation d'icône
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface AddSubListButtonProps {
  onAddSubList: (titre: string) => void;
}

const AddSubListButton: React.FC<AddSubListButtonProps> = ({ onAddSubList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subListTitle, setSubListTitle] = useState('');

  const handleAddSubList = () => {
    if (subListTitle) {
      onAddSubList(subListTitle);
      setSubListTitle('');
      setIsModalVisible(false);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsModalVisible(true)}>
        <Ionicons name="add-circle-outline" size={wp('7%')} color="white" style={styles.icon} />
        <ThemedText style={styles.buttonText}>SL</ThemedText>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Ajouter une sous-liste</ThemedText>
            <TextInput
              placeholder="Titre de la sous-liste"
              value={subListTitle}
              onChangeText={setSubListTitle}
              style={styles.input}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddSubList}>
                <ThemedText style={styles.modalButtonText}>Ajouter</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                <ThemedText style={styles.modalButtonText}>Fermer</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#05AF63',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('10%'),
    marginVertical: hp('2%'),
    elevation: 4, // Ombrage sur Android
    shadowColor: '#000', // Ombre sur iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'center',
    width: wp('30%'),
    alignSelf: 'flex-end',
  },
  icon: {
    marginRight: wp('2%'),
  },
  buttonText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    textTransform: 'uppercase', // Tout en majuscules pour un effet moderne
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond sombre semi-transparent
  },
  modalContent: {
    backgroundColor: 'white',
    padding: wp('5%'),
    borderRadius: wp('3%'),
    width: wp('80%'),
  },
  modalTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  input: {
    height: hp('6%'),
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: hp('3%'),
    paddingLeft: wp('2%'),
    borderRadius: wp('2%'),
  },
  modalButton: {
    backgroundColor: '#05AF63',
    padding: wp('3%'),
    borderRadius: wp('2.5%'),
    flex: 1,
    alignItems: 'center',
    margin: wp('1%'),
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddSubListButton;
