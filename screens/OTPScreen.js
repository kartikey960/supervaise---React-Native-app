import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import axios from 'axios';

export default function OTPscreen({ navigation, route }) {
  const email = route?.params?.email || 'john*****@gmail.com';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text, index) => {
    if (text.length > 1) {
      const pastedOtp = text.slice(0, 6).split('');
      const newOtp = [...otp];

      pastedOtp.forEach((digit, i) => {
        if (i < 6) {
          newOtp[i] = digit;
        }
      });

      setOtp(newOtp);

      const nextIndex = pastedOtp.length >= 6 ? 5 : pastedOtp.length;
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, '');
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;

    setOtp(['', '', '', '', '', '']);
    setTimer(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();

    Alert.alert(
      'OTP Sent',
      'A new verification code has been sent to your email.',
    );
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length < 6) {
      Alert.alert('Invalid OTP', 'Please enter the complete 6-digit OTP.');
      return;
    }

    try {
      const res = await axios.post(
        'https://testing-1dzm.onrender.com/api/auth/verify-otp',
        {
          email: email,
          otp: enteredOtp,
        },
      );

      Alert.alert('Success', res.data.message);

      navigation.navigate('SessionScreen');
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert('Error', error.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#6FD3E6" />

      <View style={styles.background}>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.backRow}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>✉️</Text>
            <View style={styles.checkBadge}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          </View>

          <Text style={styles.heading}>Verify Your Email</Text>
          <Text style={styles.subHeading}>We've sent a 6-digit code to</Text>

          <Text style={styles.emailText}>{email}</Text>
          <Text style={styles.validText}>
            Your code is valid for 10 minutes
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={6}
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                textAlign="center"
                selectionColor="#1E3A8A"
              />
            ))}
          </View>

          <Text style={styles.didntText}>Didn't receive code?</Text>

          <View style={styles.resendRow}>
            <TouchableOpacity onPress={handleResend} disabled={!canResend}>
              <Text
                style={[
                  styles.resendText,
                  !canResend && styles.disabledResendText,
                ]}
              >
                Resend Code
              </Text>
            </TouchableOpacity>

            {!canResend && (
              <Text style={styles.timerText}>
                {' '}
                - 00:{timer < 10 ? `0${timer}` : timer}sec
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6FD3E6',
  },

  background: {
    flex: 1,
    backgroundColor: '#6FD3E6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  card: {
    width: '100%',
    maxWidth: 360,
    minHeight: '88%',
    backgroundColor: '#F8F8F8',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
  },

  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
  },

  backArrow: {
    fontSize: 20,
    color: '#4B5563',
    marginRight: 6,
    marginTop: -1,
  },

  backText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '400',
  },

  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: '#E9EEF6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 26,
    position: 'relative',
  },

  iconText: {
    fontSize: 32,
  },

  checkBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkText: {
    color: '#1D4ED8',
    fontSize: 10,
    fontWeight: '700',
  },

  heading: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },

  subHeading: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 18,
  },

  emailText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },

  validText: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 28,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 34,
  },

  otpInput: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#EFEFEF',
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  didntText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 6,
  },

  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },

  resendText: {
    fontSize: 13,
    color: '#1D4ED8',
    textDecorationLine: 'underline',
  },

  disabledResendText: {
    color: '#9CA3AF',
  },

  timerText: {
    fontSize: 13,
    color: '#111827',
  },

  verifyButton: {
    marginTop: 'auto',
    width: '100%',
    height: 54,
    backgroundColor: '#020222',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
});
