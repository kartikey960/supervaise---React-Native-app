import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function SuperviseScreen2({ navigation }) {
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

            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Choose your preferred sign up method
            </Text>

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

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.emailButton}
              onPress={() => navigation.navigate('SessionDetailsScreen')}
            >
              <Image
                source={require('../assests/logo/EmailIcon.png')}
                style={styles.EmailIcon}
              />

              <Text style={styles.emailButtonText}>Sign up with Email</Text>
            </TouchableOpacity>

            <View style={styles.signInRow}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}
              >
                <Text style={styles.signInLink}>Sign in</Text>
              </TouchableOpacity>
            </View>

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
    backgroundColor: '#A9D9E6',
  },

  background: {
    flex: 1,
    backgroundColor: '#A9D9E6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  card: {
    width: '100%',
    height: '93%',
    backgroundColor: '#F8F8F8',
    borderRadius: 28,
    paddingHorizontal: 26,
    paddingTop: 24,
    paddingBottom: 28,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  backRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    top: 1,
    left: 1,
  },
  backArrow: {
    fontSize: 24,
    color: '#5B6470',
    marginRight: 2,
    marginTop: -2,
  },

  backText: {
    fontSize: 18,
    color: '#5B6470',
    fontWeight: '400',
  },

  logo: {
    width: 68,
    height: 68,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  welcomeText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#1F2937',
    marginBottom: 20,
    fontFamily: 'ARIAL.TTF',
  },

  badge: {
    backgroundColor: '#DCE8FA',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 999,
    marginBottom: 30,
  },

  badgeText: {
    color: '#3366CC',
    fontSize: 15,
    fontWeight: '500',
  },

  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1F2937',
    marginBottom: 10,
    lineHeight: 24,
  },

  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 34,
    fontWeight: '400',
    linearheight: 24,
  },

  googleButton: {
    width: '100%',
    height: 62,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },

  googleIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 14,
  },
  EmailIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 14,
  },

  googleText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '400',
    fontWeight: '400',
    linearheight: 20,
  },
  dividerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#DADADA',
  },

  orText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontSize: 16,
  },

  emailButton: {
    width: '100%',
    height: 62,
    backgroundColor: '#020222',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  emailIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    marginRight: 12,
  },

  emailButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    linearheight: 20,
  },

  signInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 'auto',
    padding: 5,
  },

  signInText: {
    fontSize: 12,
    color: '#6B7280',
    linearheight: 16,
  },

  signInLink: {
    fontSize: 12,
    color: '#3366FF',
    fontWeight: '500',
    linearheight: 16,
  },

  footer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 6,
  },

  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#7B7B7B',
    lineHeight: 20,
  },

  footerLink: {
    color: '#3366FF',
    fontWeight: '500',
    fontSize: 12,
  },
});
