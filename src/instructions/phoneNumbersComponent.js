import React from 'react';
import {FlatList, Linking, View, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PhoneCardInfo} from '../shared/cards';
import {Header} from '../shared/header';

const phonesJson = require('../../assets/jsons/lineasCOVID.json');
const nationalPhone = phonesJson.shift();

const openAlert = (state, phones) => {
  const buttons = phones.map((phone) => {
    return {
      text: phone,
      onPress: () => Linking.openURL(`tel:${phone}`),
    };
  });
  Alert.alert(
    'Llamar a:',
    'Selecciona una opción',
    [
      ...buttons,
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ],
    {cancelable: false},
  );
}

export const PhoneNumbersComponent = ({navigation}) => (
  <SafeAreaView style={{flex: 1}}>
    <Header
      title={'Lineas de atención fuera de San Luis Potosí'}
      showInfoColumn={false}
      navigation={navigation}
      horizontalMark={true}
    />
    <View style={{flex: 1}}>
      <PhoneCardInfo
        onPress={() => Linking.openURL(`tel:${nationalPhone.LineaEstatal}`)}
        title={nationalPhone.Entidad}
        iconName={'phone'}
        text={nationalPhone.LineaEstatal}
      />
      <FlatList
        data={phonesJson}
        renderItem={({item}) => (
          <PhoneCardInfo
            text={item.LineaEstatal.split(',').join('\n')}
            title={item.Entidad}
            iconName={'phone'}
            onPress={() => {
              const lines = item.LineaEstatal.split(',');
              if (lines.length > 1) {
                openAlert(item.Entidad, lines);
              } else {
                Linking.openURL(`tel:${item.LineaEstatal}`);
              }
            }}
          />
        )}
        keyExtractor={(item) => item.Entidad}
      />
    </View>
  </SafeAreaView>
);
