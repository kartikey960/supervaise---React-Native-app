import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../assests/logo/Container.png'),
    title: 'Connect With\nSupervisors.',
    desc: 'Find Qualified supervisors in\nyour state and build meaningful\nprofessional relationships.',
  },
  {
    id: '2',
    image: require('../assests/logo/container2.png'),
    title: 'Track Supervision\nHours.',
    desc: 'Easily Log and Monitor your\nsupervision hours to meet licensing\nrequirements.',
  },
  {
    id: '3',
    image: require('../assests/logo/Container3.png'),
    title: 'AI-Powered\nDocumentation',
    desc: 'Streamline your clinical\ndocumentation with intelligent AI\nassistance.',
  },
];

export default function OnboardingScreen({ navigation }) {
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('SuperviseScreen1');
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <LinearGradient
        colors={['#A7D8E6', '#6EC1C7', '#3AA6A6']}
        style={{ width, flex: 1 }}
      >
        <View style={styles.page}>
          {/* Skip */}
          <TouchableOpacity
            style={styles.skip}
            onPress={() => navigation.replace('SuperviseScreen1')}
          >
            <Text>Skip</Text>
          </TouchableOpacity>

          {/* Image */}
          <Image source={item.image} style={styles.item} />

          {/* Text */}
          <View style={styles.mini}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text2}>{item.desc}</Text>
          </View>

          {/* Dots */}
          <View style={styles.slider}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    width: currentIndex === i ? 30 : 10,
                    backgroundColor: currentIndex === i ? '#043C87' : '#D1D5DC',
                  },
                ]}
              />
            ))}
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.inside}>
              {currentIndex === 2 ? 'Get Started' : 'Next    >'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      onMomentumScrollEnd={event => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
      }}
    />
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',

    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 15,
  },
  item: {
    height: 150,
    width: 150,
    marginTop: 65,
  },
  mini: {
    margin: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: 40,
    fontWeight: '600',
  },
  text2: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'black',
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  inside: {
    color: 'white',
    fontSize: 16,
  },
  skip: {
    alignSelf: 'flex-end',
    margin: 20,
  },
  slider: {
    flexDirection: 'row',
    marginTop: 170,
  },
  dot: {
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});
