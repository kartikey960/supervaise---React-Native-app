import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
export default function ScreenDetailsScreen({ navigation }) {
  const [logPreviousHours, setLogPreviousHours] = useState('yes');
  const [showPassword, setShowPassword] = useState(false);

  const [showLicenseOptions, setShowLicenseOptions] = useState(false);
  const [showStateOptions, setShowStateOptions] = useState(false);
  const [showDurationOptions, setShowDurationOptions] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseType, setLicenseType] = useState('');
  const [stateOfPractice, setStateOfPractice] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState({});

  const licenseOptions = [
    'LPC',
    'LMFT',
    'LCSW',
    'Psychologist',
    'Intern / Trainee',
  ];

  const stateOptions = [
    'California',
    'Texas',
    'Florida',
    'New York',
    'Illinois',
    'Arizona',
    'Nevada',
  ];

  const durationOptions = [
    '30 minutes',
    '1 hour',
    '1.5 hours',
    '2 hours',
    '3 hours',
    '4 hours',
    '5 hours',
  ];

  const isValidEmail = value => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const formatDate = date => {
    return date.toDateString();
  };

  const onChangeDate = (event, selected) => {
    setShowDatePicker(false);

    if (selected) {
      setSelectedDate(selected);
      setSessionDate(formatDate(selected));
      setErrors(prev => ({ ...prev, sessionDate: '' }));
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take profile photo',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
    return true;
  };

  const openImageOptions = () => {
    Alert.alert('Upload Profile Image', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: openCamera,
      },
      {
        text: 'Choose from Gallery',
        onPress: openGallery,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required.');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          Alert.alert(
            'Camera Error',
            response.errorMessage || 'Something went wrong',
          );
        } else if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri);
          setErrors(prev => ({ ...prev, profileImage: '' }));
        }
      },
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled gallery');
        } else if (response.errorCode) {
          Alert.alert(
            'Gallery Error',
            response.errorMessage || 'Something went wrong',
          );
        } else if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri);
          setErrors(prev => ({ ...prev, profileImage: '' }));
        }
      },
    );
  };

  const validateForm = () => {
    let newErrors = {};

    if (!profileImage) {
      newErrors.profileImage = 'Profile Image is required';
    }

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

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

    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    }

    if (!licenseType.trim()) {
      newErrors.licenseType = 'License Type is required';
    }

    if (!stateOfPractice.trim()) {
      newErrors.stateOfPractice = 'State of Practice is required';
    }

    if (!sessionDate.trim()) {
      newErrors.sessionDate = 'Session Date is required';
    }

    if (!duration.trim()) {
      newErrors.duration = 'Duration is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    console.log('API HIT START');

    setLoading(true);

    try {
      const controller = new AbortController(); // for timeout
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(
        'https://testing-1dzm.onrender.com/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: fullName || 'testuser',
            email: email || `test${Date.now()}@gmail.com`,
            password: password || '123456',
          }),
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      const data = await response.json();

      // 🔥 manual error handling (important)
      if (!response.ok) {
        console.log('STATUS:', response.status);
        console.log('DATA:', data);

        Alert.alert(`Server Error ${response.status}`, JSON.stringify(data));
        return;
      }

      console.log('SUCCESS RESPONSE:', response.status, data);

      Alert.alert('SUCCESS', JSON.stringify(data));

      navigation.navigate('OTPScreen', {
        email,
        username: fullName,
        password,
      });
    } catch (error) {
      console.log('FULL ERROR:', error);

      if (error.name === 'AbortError') {
        Alert.alert('Timeout', 'Request took too long');
      } else {
        Alert.alert(
          'Network Error',
          error.message + '\nCheck internet or server down',
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={['#A7D8E6', '#6EC1C7', '#3AA6A6']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background}>
          <View style={styles.card}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <TouchableOpacity
                style={styles.backRow}
                onPress={() => navigation?.goBack()}
              >
                <Text style={styles.backArrow}>←</Text>
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>

              <Text style={styles.heading}>Complete Your Profile</Text>
              <Text style={styles.subHeading}>
                Tell us a bit about yourself
              </Text>

              <TouchableOpacity
                style={styles.uploadWrapper}
                onPress={openImageOptions}
              >
                <View
                  style={[
                    styles.uploadCircle,
                    errors.profileImage && styles.errorInput,
                  ]}
                >
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Text style={styles.uploadIcon}>🖼️</Text>
                  )}
                </View>

                <View style={styles.cameraBadge}>
                  <Text style={styles.cameraIcon}>📷</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={openImageOptions}>
                <Text style={styles.uploadText}>Upload Profile Image</Text>
              </TouchableOpacity>
              {errors.profileImage && (
                <Text
                  style={[
                    styles.errorText,
                    { textAlign: 'center', marginBottom: 10 },
                  ]}
                >
                  {errors.profileImage}
                </Text>
              )}

              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={[styles.textInput, errors.fullName && styles.errorInput]}
                placeholder="John Doe"
                placeholderTextColor="#9CA3AF"
                value={fullName}
                onChangeText={text => {
                  setFullName(text);
                  setErrors(prev => ({ ...prev, fullName: '' }));
                }}
              />
              {errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={[styles.textInput, errors.email && styles.errorInput]}
                placeholder="john.doe@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setErrors(prev => ({ ...prev, email: '' }));
                }}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

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
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    setErrors(prev => ({ ...prev, password: '' }));
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? '🚫' : '👁️'}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={[styles.textInput, errors.phone && styles.errorInput]}
                placeholder="(555) 123-4567"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={text => {
                  setPhone(text);
                  setErrors(prev => ({ ...prev, phone: '' }));
                }}
              />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              <Text style={styles.label}>License Type *</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownBox,
                  errors.licenseType && styles.errorInput,
                ]}
                onPress={() => {
                  setShowLicenseOptions(!showLicenseOptions);
                  setShowStateOptions(false);
                  setShowDurationOptions(false);
                }}
              >
                <Text
                  style={
                    licenseType ? styles.inputText : styles.placeholderText
                  }
                >
                  {licenseType || 'Select license type'}
                </Text>
                <Text style={styles.dropdownArrow}>⌄</Text>
              </TouchableOpacity>

              {showLicenseOptions && (
                <View style={styles.optionsContainer}>
                  {licenseOptions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionItem}
                      onPress={() => {
                        setLicenseType(item);
                        setShowLicenseOptions(false);
                        setErrors(prev => ({ ...prev, licenseType: '' }));
                      }}
                    >
                      <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {errors.licenseType && (
                <Text style={styles.errorText}>{errors.licenseType}</Text>
              )}

              <Text style={styles.label}>State of Practice *</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownBox,
                  errors.stateOfPractice && styles.errorInput,
                ]}
                onPress={() => {
                  setShowStateOptions(!showStateOptions);
                  setShowLicenseOptions(false);
                  setShowDurationOptions(false);
                }}
              >
                <Text
                  style={
                    stateOfPractice ? styles.inputText : styles.placeholderText
                  }
                >
                  {stateOfPractice || 'Select state'}
                </Text>
                <Text style={styles.dropdownArrow}>⌄</Text>
              </TouchableOpacity>

              {showStateOptions && (
                <View style={styles.optionsContainer}>
                  {stateOptions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionItem}
                      onPress={() => {
                        setStateOfPractice(item);
                        setShowStateOptions(false);
                        setErrors(prev => ({ ...prev, stateOfPractice: '' }));
                      }}
                    >
                      <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {errors.stateOfPractice && (
                <Text style={styles.errorText}>{errors.stateOfPractice}</Text>
              )}

              <Text style={styles.label}>Want to log any previous hours?</Text>

              <TouchableOpacity
                style={styles.radioRow}
                onPress={() => setLogPreviousHours('yes')}
              >
                <View
                  style={[
                    styles.radioOuter,
                    logPreviousHours === 'yes' && styles.radioOuterBlue,
                    logPreviousHours !== 'yes' && styles.radioOuterGray,
                  ]}
                >
                  {logPreviousHours === 'yes' && (
                    <View style={styles.radioInnerBlue} />
                  )}
                </View>
                <Text style={styles.radioText}>
                  I want to log previous hours
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioRow}
                onPress={() => setLogPreviousHours('no')}
              >
                <View
                  style={[
                    styles.radioOuter,
                    logPreviousHours === 'no' && styles.radioOuterGray,
                  ]}
                >
                  {logPreviousHours === 'no' && (
                    <View style={styles.radioInnerGray} />
                  )}
                </View>
                <Text style={styles.radioText}>
                  I don’t want to log previous hours
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Session Date *</Text>
              <TouchableOpacity
                style={[
                  styles.dateBox,
                  errors.sessionDate && styles.errorInput,
                ]}
                onPress={() => {
                  setShowDatePicker(true);
                  setShowLicenseOptions(false);
                  setShowStateOptions(false);
                  setShowDurationOptions(false);
                }}
              >
                <Text style={styles.calendarIcon}>📅</Text>
                <Text
                  style={sessionDate ? styles.dateText : styles.placeholderText}
                >
                  {sessionDate || 'Select session date'}
                </Text>
              </TouchableOpacity>
              {errors.sessionDate && (
                <Text style={styles.errorText}>{errors.sessionDate}</Text>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                  minimumDate={new Date()}
                />
              )}

              <Text style={styles.label}>Duration *</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownBox,
                  errors.duration && styles.errorInput,
                ]}
                onPress={() => {
                  setShowDurationOptions(!showDurationOptions);
                  setShowLicenseOptions(false);
                  setShowStateOptions(false);
                }}
              >
                <Text
                  style={duration ? styles.inputText : styles.placeholderText}
                >
                  {duration || 'Select duration'}
                </Text>
                <Text style={styles.dropdownArrow}>⌄</Text>
              </TouchableOpacity>

              {showDurationOptions && (
                <View style={styles.optionsContainer}>
                  {durationOptions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionItem}
                      onPress={() => {
                        setDuration(item);
                        setShowDurationOptions(false);
                        setErrors(prev => ({ ...prev, duration: '' }));
                      }}
                    >
                      <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {errors.duration && (
                <Text style={styles.errorText}>{errors.duration}</Text>
              )}

              <Text style={styles.label}>Session Notes (Optional)</Text>
              <TextInput
                style={styles.notesBox}
                placeholder="Add any relevant notes about this session..."
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                value={notes}
                onChangeText={setNotes}
              />

              <Text style={styles.label}>Supporting Documents (Optional)</Text>

              <View style={styles.documentOuterBox}>
                <TouchableOpacity style={styles.uploadDocumentBox}>
                  <Text style={styles.uploadDocIcon}>⤴</Text>
                  <Text style={styles.uploadDocText}>
                    Click to upload documents
                  </Text>
                  <Text style={styles.uploadDocSubText}>
                    PDF, DOC, or images
                  </Text>
                </TouchableOpacity>

                <View style={styles.fileRow}>
                  <Text style={styles.fileIcon}>📄</Text>
                  <Text style={styles.fileName}>Document_1.pdf</Text>
                  <Text style={styles.fileClose}>✕</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.continueButton,
                  loading && styles.disabledButton,
                ]}
                onPress={handleContinue}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.continueButtonText}>Continue</Text>
                )}
              </TouchableOpacity>

              <View style={{ height: 30 }} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
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
    paddingHorizontal: 12,
  },

  card: {
    width: '100%',
    height: '96%',
    backgroundColor: '#FAFAFA',
    borderRadius: 28,
    overflow: 'hidden',
  },

  scrollContent: {
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 40,
  },

  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  backArrow: {
    fontSize: 24,
    color: '#5B6470',
    marginRight: 8,
    marginTop: -2,
  },

  backText: {
    fontSize: 18,
    color: '#5B6470',
  },

  heading: {
    fontSize: 22,
    color: '#1F2937',
    fontWeight: '600',
    marginBottom: 10,
  },

  subHeading: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 28,
  },

  uploadWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  uploadCircle: {
    width: 92,
    height: 92,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#2F64D6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FBFF',
    overflow: 'hidden',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },

  uploadIcon: {
    fontSize: 34,
  },

  cameraBadge: {
    position: 'absolute',
    right: 65,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cameraIcon: {
    fontSize: 15,
  },

  uploadText: {
    textAlign: 'center',
    color: '#6B7280',
    textDecorationLine: 'underline',
    marginBottom: 18,
    fontSize: 14,
  },

  label: {
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 10,
    marginTop: 14,
    fontWeight: '500',
  },

  textInput: {
    width: '100%',
    height: 54,
    backgroundColor: '#F1F1F4',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#111827',
  },

  passwordWrapper: {
    width: '100%',
    height: 54,
    backgroundColor: '#F1F1F4',
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  eyeIcon: {
    fontSize: 18,
    color: '#6B7280',
    marginLeft: 12,
  },

  dropdownBox: {
    width: '100%',
    height: 54,
    backgroundColor: '#F1F1F4',
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  placeholderText: {
    color: '#9CA3AF',
    fontSize: 15,
  },

  inputText: {
    color: '#111827',
    fontSize: 15,
  },

  dropdownArrow: {
    fontSize: 18,
    color: '#9CA3AF',
  },

  optionsContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 8,
    overflow: 'hidden',
  },

  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  optionText: {
    fontSize: 15,
    color: '#111827',
  },

  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  radioOuterBlue: {
    borderColor: '#2563EB',
  },

  radioOuterGray: {
    borderColor: '#BDBDBD',
  },

  radioInnerBlue: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#2563EB',
  },

  radioInnerGray: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#BDBDBD',
  },

  radioText: {
    fontSize: 15,
    color: '#6B7280',
  },

  dateBox: {
    width: '100%',
    height: 54,
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  calendarIcon: {
    fontSize: 18,
    marginRight: 12,
  },

  dateText: {
    fontSize: 15,
    color: '#1F2937',
  },

  notesBox: {
    width: '100%',
    height: 108,
    backgroundColor: '#F1F1F4',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    fontSize: 15,
    color: '#111827',
  },

  documentOuterBox: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    marginTop: 6,
  },

  uploadDocumentBox: {
    width: '100%',
    height: 132,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  uploadDocIcon: {
    fontSize: 28,
    color: '#2563EB',
    marginBottom: 8,
  },

  uploadDocText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 4,
  },

  uploadDocSubText: {
    fontSize: 13,
    color: '#9CA3AF',
  },

  fileRow: {
    marginTop: 12,
    width: '100%',
    height: 46,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  fileIcon: {
    fontSize: 16,
    marginRight: 10,
  },

  fileName: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
  },

  fileClose: {
    fontSize: 15,
    color: '#6B7280',
  },

  continueButton: {
    width: '100%',
    height: 58,
    backgroundColor: '#020222',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },

  disabledButton: {
    opacity: 0.6,
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
  },

  errorInput: {
    borderWidth: 1.5,
    borderColor: '#DC2626',
  },
});
