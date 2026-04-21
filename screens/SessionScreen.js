import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  Alert,
} from 'react-native';

export default function SessionScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const isValidEmail = value => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    const isValid = validateForm();

    if (isValid) {
      navigation.navigate('SessionDetailsScreen');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#8ED6E3" />

      <View style={styles.background}>
        <View style={styles.card}>
          <Image
            source={require('../assests/logo/logo2.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.welcomeText}>Welcome to SPVN</Text>

          <View style={styles.rolePill}>
            <Text style={styles.rolePillText}>Clinician Login</Text>
          </View>

          <Text style={styles.loginTitle}>Login in to your account</Text>

          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={[styles.input, errors.email && styles.errorInput]}
            placeholder="john.doe@example.com"
            placeholderTextColor="#A1A1AA"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (errors.email) {
                setErrors(prev => ({ ...prev, email: '' }));
              }
            }}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.label}>Password *</Text>
          <View
            style={[
              styles.passwordWrapper,
              errors.password && styles.errorInput,
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#A1A1AA"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (errors.password) {
                  setErrors(prev => ({ ...prev, password: '' }));
                }
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TouchableOpacity
            style={styles.forgotWrapper}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              handleContinue();
            }}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require('../assests/logo/googlelogo.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and{'\n'}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8ED6E3',
  },

  background: {
    flex: 1,
    backgroundColor: '#8ED6E3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FAFAFA',
    borderRadius: 28,
    paddingHorizontal: 26,
    paddingTop: 38,
    paddingBottom: 30,
    alignItems: 'center',
  },

  hiddenGooglePreload: {
    width: 0,
    height: 0,
    position: 'absolute',
  },

  logo: {
    width: 76,
    height: 76,
    marginBottom: 18,
  },

  welcomeText: {
    fontSize: 17,
    color: '#1F2937',
    marginBottom: 16,
    fontFamily: 'Hanuman-Bold',
  },

  rolePill: {
    backgroundColor: '#DDE8FA',
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 999,
    marginBottom: 26,
  },

  rolePillText: {
    color: '#3B5DAA',
    fontSize: 13,
    fontWeight: '500',
  },

  loginTitle: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    marginBottom: 24,
    fontFamily: 'Hanuman-ExtraBold',
  },

  label: {
    width: '100%',
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 4,
  },

  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#F1F1F4',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },

  passwordWrapper: {
    width: '100%',
    height: 52,
    backgroundColor: '#F1F1F4',
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },

  eyeIcon: {
    fontSize: 16,
    color: '#A1A1AA',
    marginLeft: 10,
  },

  forgotWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 20,
  },

  forgotText: {
    fontSize: 12,
    color: '#B0B0B0',
  },

  continueButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#020222',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },

  dividerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  orText: {
    marginHorizontal: 14,
    color: '#9CA3AF',
    fontSize: 14,
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
    backgroundColor: '#FFFFFF',
    marginBottom: 42,
  },

  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },

  googleButtonText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },

  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },

  linkText: {
    color: '#2563EB',
  },

  errorText: {
    width: '100%',
    color: '#DC2626',
    fontSize: 12,
    marginBottom: 8,
    marginTop: 2,
    marginLeft: 4,
  },

  errorInput: {
    borderWidth: 1.5,
    borderColor: '#DC2626',
  },
});
