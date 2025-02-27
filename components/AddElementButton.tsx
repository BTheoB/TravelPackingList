import React, { useState } from 'react';
import { Modal, TextInput, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface AddElementButtonProps {
  onAddElement: (idSublist: number, titre: string) => void;
  idSublist: number;
}

const AddElementButton: React.FC<AddElementButtonProps> = ({ onAddElement, idSublist }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [elementTitle, setElementTitle] = useState('');

  const handleAddElement = () => {
    if (elementTitle && idSublist !== null) {
      onAddElement(idSublist, elementTitle);
      setElementTitle('');
      setIsModalVisible(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter un élément</Text>
            <TextInput
              style={styles.input}
              value={elementTitle}
              onChangeText={setElementTitle}
              placeholder="Entrez un titre"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddElement}>
                <Text style={styles.modalButtonText}>Ajouter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                <Text style={styles.modalButtonText}>Fermer</Text>
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
    alignItems: 'flex-end',
    marginBottom:hp('1.7%')
  },
  button: {
    width: wp('9%'), // Utilisation de wp pour rendre la largeur responsive
    height: wp('9%'), // Utilisation de wp pour la hauteur aussi, pour garder un carré
    borderRadius: wp('7.5%'), // Bordure arrondie responsive
    backgroundColor: '#05AF63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: wp('7%'), // Taille de texte responsive
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
    width: wp('80%'), // Largeur responsive
    padding: wp('5%'), // Padding responsive
    backgroundColor: '#fff',
    borderRadius: wp('3%'), // Bordure arrondie responsive
  },
  modalTitle: {
    fontSize: wp('5%'), // Taille de titre responsive
    marginBottom: hp('2%'), // Marge en haut
  },
  input: {
    height: hp('6%'), // Hauteur de l'input responsive
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: hp('3%'), // Marge en bas
    paddingLeft: wp('2%'), // Padding responsive
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
    margin: wp('1%'), // Espacement entre les boutons
  },
  modalButtonText: {
    color: '#fff',
    fontSize: wp('4%'), // Taille de texte responsive pour les boutons
  },
});

export default AddElementButton;
