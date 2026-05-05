import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuperviseScreen1({ navigation }) {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <LinearGradient
      colors={['#A7D8E6', '#6EC1C7', '#3AA6A6']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.outerContainer}>
        <View style={styles.innerCard}>
          <View style={styles.topSection}>
            <Image
              source={require('../assests/logo/logo2.png')}
              style={styles.logo}
            />

            <Text style={styles.title}>Choose Your Role</Text>
            <Text style={styles.subtitle}>
              Select how you'll be using the platform
            </Text>

            <TouchableOpacity
              style={[
                styles.card,
                styles.flexCard,
                selectedRole === 'clinician' && styles.blueCard,
              ]}
              onPress={() => setSelectedRole('clinician')}
            >
              <View style={styles.row}>
                <Image
                  source={require('../assests/logo/logosupervise1.png')}
                  style={styles.cardImage}
                />

                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>I'm a Clinician</Text>
                  <Text style={styles.cardDesc}>
                    Find supervisors, track hours, and manage your supervision
                    journey
                  </Text>

                  <View style={styles.tags}>
                    <Text style={styles.tag}>Graduate</Text>
                    <Text style={styles.tag}>Pre-licensed</Text>
                    <Text style={styles.tag}>Provisionally Licensed</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.card2,
                styles.flexCard,
                selectedRole === 'supervisor' && styles.greenCard,
              ]}
              onPress={() => setSelectedRole('supervisor')}
            >
              <View style={styles.row}>
                <Image
                  source={require('../assests/logo/logosupervise2.png')}
                  style={styles.cardImage}
                />

                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>I'm a Supervisor</Text>
                  <Text style={styles.cardDesc}>
                    Manage supervisees, approve hours, and provide guidance
                  </Text>

                  <View style={styles.tags}>
                    <Text style={styles.tagGreen}>Licensed Professional</Text>
                    <Text style={styles.tagGreen}>Mentor</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, !selectedRole && styles.disabledButton]}
            disabled={!selectedRole}
            onPress={() => {
              navigation.navigate('SuperviseScreen2');
            }}
          >
            <Text style={styles.buttonText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#6CB4C7',
    padding: 12,
  },

  innerCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 20,
  },

  topSection: {
    flex: 1,
    justifyContent: 'space-evenly',
  },

  logo: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },

  card: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#DBEAFE',
  },
  card2: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#D9FFE7',
  },

  flexCard: {
    flex: 0.4,
    justifyContent: 'center',
  },

  blueCard: {
    backgroundColor: '#EAF2FF',
    borderColor: '#4A90E2',
  },

  greenCard: {
    backgroundColor: '#E9F8EF',
    borderColor: '#34C759',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  cardImage: {
    width: 60,
    height: 60,
    marginRight: 14,
    resizeMode: 'contain',
  },

  textContainer: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
  },

  cardDesc: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  tag: {
    backgroundColor: '#DCE8FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 6,
    fontSize: 12,
  },

  tagGreen: {
    backgroundColor: '#DFF5E7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 6,
    fontSize: 12,
  },

  button: {
    backgroundColor: '#111',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  disabledButton: {
    backgroundColor: '#aaa',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
