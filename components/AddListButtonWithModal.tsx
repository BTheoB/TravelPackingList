import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface RoundButtonWithModalProps {
  onPress?: (title: string) => void; // Ajout du props onPress optionnel
}

const RoundButtonWithModal: React.FC<RoundButtonWithModalProps> = ({ onPress }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Pour gérer l'ouverture/fermeture de la modal
  const [title, setTitle] = useState(''); // Pour gérer le texte du titre du formulaire

  const handleOpenModal = () => {
    setIsModalVisible(true); // Ouvre la modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Ferme la modal
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter un titre</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Entrez un titre"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  if (onPress && title !== '') onPress(title);
                  handleCloseModal();
                }}>
                <Text style={styles.modalButtonText}>Ajouter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: wp('15%'), // Largeur du bouton responsive
    height: wp('15%'), // Hauteur du bouton responsive
    borderRadius: wp('7.5%'), // Bordure arrondie responsive
    backgroundColor: '#05AF63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: wp('7%'), // Taille du texte responsive
    color: '#fff',
    fontFamily: 'RobotoRegular',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond sombre semi-transparent
  },
  modalContent: {
    width: wp('80%'), // Largeur du modal responsive
    padding: wp('5%'), // Padding responsive
    backgroundColor: '#fff',
    borderRadius: wp('3%'), // Bordure arrondie responsive
  },
  modalTitle: {
    fontSize: wp('5%'), // Taille du titre responsive
    marginBottom: hp('2%'), // Marge en bas responsive
  },
  input: {
    height: hp('6%'), // Hauteur du champ de saisie responsive
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: hp('3%'), // Marge en bas responsive
    paddingLeft: wp('2%'), // Padding gauche responsive
    borderRadius: wp('2%'), // Bordure arrondie responsive
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#05AF63',
    padding: wp('3%'), // Padding responsive
    borderRadius: wp('2.5%'), // Bordure arrondie responsive
    flex: 1,
    alignItems: 'center',
    margin: wp('1%'), // Espacement entre les boutons responsive
  },
  modalButtonText: {
    color: '#fff',
    fontSize: wp('4%'), // Taille du texte des boutons responsive
  },
});

export default RoundButtonWithModal;
