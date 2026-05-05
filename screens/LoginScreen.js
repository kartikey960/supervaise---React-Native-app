import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function SuperviseScreen2({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const hlo = () => {
    Alert.alert('clicked');
  };

  return (
    <LinearGradient
      colors={['#A7D8E6', '#6EC1C7', '#3AA6A6']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#A9D9E6" />

        <View style={styles.background}>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.backRow}
              onPress={() => navigation?.goBack()}
            >
              <Text style={styles.backArrow}>←</Text>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Image
              source={require('../assests/logo/logo2.png')}
              style={styles.logo}
            />

            <Text style={styles.welcomeText}>Welcome to SPVN</Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>Clinician Sign Up</Text>
            </View>

            <Text style={styles.title}>Log in to Your Account</Text>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              placeholder="john.doe@example.com"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Password *</Text>
            <View style={{ width: '100%' }}>
              <TextInput
                placeholder="******"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Text style={styles.forgot}>Forgot Password?</Text>
            </View>

            <TouchableOpacity style={styles.emailButton} onPress={hlo}>
              <Text style={styles.emailButtonText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => navigation.navigate('ViewDetailScreen')}
            >
              <Image
                source={require('../assests/logo/googlelogo.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                By continuing, you agree to our{' '}
                <Text style={styles.footerLink}>Terms of Service</Text> and
                {'\n'}
                <Text style={styles.footerLink}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  card: {
    width: '100%',
    height: '92%',
    backgroundColor: '#F4F6F8',
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },

  backRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  backArrow: {
    fontSize: 20,
    color: '#6B7280',
    marginRight: 6,
  },

  backText: {
    fontSize: 16,
    color: '#6B7280',
  },

  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 15,
  },

  welcomeText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 40,
  },

  badge: {
    backgroundColor: '#E6EEF8',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },

  badgeText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '500',
  },

  title: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 30,
    fontWeight: 400,
    lineHeight: 24,
    color: '#101828',
  },

  label: {
    width: '100%',
    fontSize: 14,
    color: '#0A0A0A',
    marginBottom: 4,
    fontWeight: 400,
    lineHeight: 14,
    marginBottom: 13,
  },

  input: {
    width: '100%',
    backgroundColor: '#EDEDED',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 13,
  },

  forgot: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: -6,
    marginBottom: 14,
  },

  emailButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#020222',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  emailButtonText: {
    color: '#fff',
    fontSize: 14,
  },

  dividerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  orText: {
    marginHorizontal: 10,
    color: '#9CA3AF',
    fontSize: 12,
  },

  googleButton: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },

  googleText: {
    fontSize: 13,
    color: '#111827',
  },

  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },

  footerText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9CA3AF',
    lineHeight: 16,
  },

  footerLink: {
    color: '#2563EB',
  },
});
