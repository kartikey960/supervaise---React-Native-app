import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleContinue = () => {
    if (!email.trim()) {
      setEmailError('Please enter your Email Id');
      return;
    }

    if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid Email Id');
      return;
    }

    setEmailError('');

    navigation.navigate('OTPScreen', {
      email: email.trim(),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}></Text>
      </View>

      <LinearGradient
        colors={['#8BC1C9', '#5B8EF0', '#45C6D5']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.card}>
          <Image
            source={require('../assests/logo/logo2.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.welcomeText}>Welcome to SPVN</Text>

          <TouchableOpacity style={styles.loginBadge}>
            <Text style={styles.loginBadgeText}>Clinician Login</Text>
          </TouchableOpacity>

          <Text style={styles.forgotPasswordText}>Forgot Password</Text>

          <TouchableOpacity style={styles.iconCircle}>
            <Image
              source={require('../assests/logo/forgotpass.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={styles.instructionText}>
            Please enter your registered Email Id
          </Text>

          <Text style={styles.label}>Email Id</Text>

          <View
            style={[
              styles.inputContainer,
              emailError ? styles.inputError : null,
            ]}
          >
            <Text style={styles.inputIcon}>📧</Text>

            <TextInput
              placeholder="john.kin@gmail.com"
              placeholderTextColor="#A3A3B5"
              style={styles.input}
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3A3A3A',
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: '#3A3A3A',
  },
  headerTitle: {
    color: '#9E9E9E',
    fontSize: 13,
    fontWeight: '500',
  },
  gradientContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    borderRadius: 24,
    alignItems: 'center',
    paddingTop: 42,
    paddingHorizontal: 24,
  },
  logo: {
    width: 65,
    height: 65,
    marginBottom: 14,
  },
  welcomeText: {
    fontSize: 18,
    color: '#2B2B2B',
    fontWeight: '500',
    marginBottom: 18,
  },
  loginBadge: {
    backgroundColor: '#DCE8FF',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 18,
  },
  loginBadgeText: {
    color: '#4A78C9',
    fontSize: 12,
    fontWeight: '500',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#222',
    marginBottom: 28,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: '#4D78FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconImage: {
    width: 54,
    height: 54,
  },
  instructionText: {
    fontSize: 10.5,
    color: '#4F4F4F',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#5C5C5C',
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    height: 42,
    borderWidth: 1,
    borderColor: '#7D99E8',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 18,
    backgroundColor: '#F4F4F4',
  },
  inputError: {
    borderColor: 'red',
  },
  inputIcon: {
    fontSize: 14,
    marginRight: 8,
    color: '#A1A1B0',
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: '#2B2B2B',
  },
  errorText: {
    width: '100%',
    color: 'red',
    fontSize: 11,
    marginTop: -10,
    marginBottom: 18,
    paddingLeft: 4,
  },
  continueButton: {
    width: '100%',
    height: 42,
    backgroundColor: '#020326',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
