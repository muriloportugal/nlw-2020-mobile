import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';

import api from '../../services/api';

interface Items {
  id: number;
  title: string;
  image_url: string;
}

interface Point {
  id: number;
  image: string;
  image_url: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface Params {
  uf: string;
  city: string;
}

const Points = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([0])
  const [initialPositon, setInitialPosition] = useState<[number,number]>([0,0]);

  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  // Busca os pontos de coleta
  useEffect(() =>{

    api.get('/points',{
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItems
      }
    }).then(response => {
      setPoints(response.data)
    })
    .catch(error => {
      console.log(`Erro ao buscar pontos ${error.message}`);
      Alert.alert('Sem acesso a servidor.','Erro ao tentar buscar pontos de reciclagem');
    });
    // Sempre que o usuário selecionar um item precisa executar essa chamada
  }, [selectedItems]);

  // Busca a posição do usuário
  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted' ) {
        console.log('Sem acesso para geolocalização');
        Alert.alert('Oooops...', 'Precisamos de sua permissão para obter sua localização');
        return;
      }

      const location = await Location.getLastKnownPositionAsync();
      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude,longitude]);
    }
    loadPosition();
  },[]);

  // Busca os items recicláveis da api
  useEffect(() => {
    api.get('/items')
      .then(response => {
      setItems(response.data);
      })
      .catch(error => {
        Alert.alert('Sem acesso a servidor.','Erro ao tentar buscar pontos de reciclagem');
        console.log(`Erro ao buscar itens ${error.message}`);
      });
  }, []);
  
  function handleNaviteBack(){
    navigation.goBack();
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { point_id: id });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if(alreadySelected >= 0){
      const filteredItems = selectedItems.filter(item => item !== id)
      setSelectedItems(filteredItems);
    }else {
      setSelectedItems([...selectedItems, id ]);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNaviteBack}>
          <Icon name='arrow-left' size={20} color='#34cb79' />
        </TouchableOpacity>

        <Text style={styles.title}>Bem Vindo</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta</Text>

        <View style={styles.mapContainer}>
          { initialPositon[0] !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: initialPositon[0],
                longitude: initialPositon[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map(point => {
                return (
                  <Marker
                    key={point.id} 
                    style={styles.mapMarker}
                    coordinate={{
                      latitude: point.latitude,
                      longitude: point.longitude,
                    }}
                    onPress={() => handleNavigateToDetail(point.id)}
                  >
                    <View style={styles.mapMarkerContainer}>
                      <Image style={styles.mapMarkerImage} source={{uri: point.image_url}} />
                      <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                    </View>
                  </Marker>
                );
              })}
            </MapView>
          )}
        </View>

      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20 }} 
        >
          {items.map(item => {
            return (
              <TouchableOpacity
                key={String(item.id)}
                style={[
                  styles.item,
                  //Só atribui o estilo de selecionado se o item estiver no selectedItems
                  selectedItems.includes(item.id) ? styles.selectedItem : {},
                ]}
                onPress={()=>handleSelectItem(item.id)}
                activeOpacity={0.6}
              >
                <SvgUri width={42} height={42} uri={item.image_url} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

      </View>
    </>
  );
}

export default Points;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});