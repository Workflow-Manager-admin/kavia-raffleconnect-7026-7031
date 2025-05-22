import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { globalStyles, colors, spacing, shadows } from '../styles';

// PUBLIC_INTERFACE
/**
 * SuccessScreen - Final screen displayed after successful raffle entry
 * Shows a congratulatory message, animated success icon, and entry summary
 * 
 * @returns {JSX.Element} React component
 */
const SuccessScreen = () => {
  // Animation values
  const scaleAnim = useState(new Animated.Value(0))[0];
  const opacityAnim = useState(new Animated.Value(0))[0];
  
  // Mock user data and prize info
  // In a real app, this would come from navigation params or context
  const [userData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    jobTitle: 'Technical Role',
  });

  const [selectedPrize] = useState({
    id: 1,
    name: 'Kavia Pro AI License',
    description: 'One year premium subscription to Kavia Pro AI with unlimited access to all features',
    image: 'https://via.placeholder.com/300x200?text=Kavia+Pro+AI',
    value: '$1200',
    category: 'software'
  });

  // Run animations when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Handle "Enter Another Raffle" button press
  const handleEnterAnother = () => {
    // In a real app, this would navigate to the first screen
    // or reset the state/navigation stack
    console.log('Enter another raffle pressed');
  };

  // Handle "Return Home" button press
  const handleReturnHome = () => {
    // In a real app, this would navigate to the home screen
    console.log('Return home pressed');
  };

  // Render an information field with label and value
  const renderInfoField = (label, value) => (
    <View style={styles.infoField}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView 
      style={globalStyles.screenContainer}
      contentContainerStyle={globalStyles.contentContainer}
    >
      <Animated.View 
        style={[
          styles.successIconContainer, 
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim
          }
        ]}
      >
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      </Animated.View>

      <View style={styles.header}>
        <Text style={globalStyles.title}>Congratulations!</Text>
        <Text style={globalStyles.bodyText}>
          Your entry has been successfully submitted. Thank you for participating in the Kavia raffle!
        </Text>
      </View>

      {/* Entry Summary Card */}
      <View style={[globalStyles.card, styles.summarySection]}>
        <Text style={styles.sectionTitle}>Entry Summary</Text>
        {renderInfoField('Name', userData.name)}
        {renderInfoField('Email', userData.email)}
        {renderInfoField('Job Title', userData.jobTitle)}
      </View>

      {/* Prize Card */}
      <View style={[globalStyles.card, styles.prizeSection]}>
        <Text style={styles.sectionTitle}>Selected Prize</Text>
        <View style={styles.prizeContainer}>
          <Image 
            source={{ uri: selectedPrize.image }} 
            style={styles.prizeImage}
            resizeMode="cover"
          />
          <View style={styles.prizeInfo}>
            <Text style={styles.prizeName}>{selectedPrize.name}</Text>
            <Text style={styles.prizeValue}>{selectedPrize.value}</Text>
            <Text style={styles.prizeDescription}>{selectedPrize.description}</Text>
          </View>
        </View>
      </View>

      {/* Notification Info */}
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>
          A confirmation has been sent to your email. We'll notify you if you're the lucky winner.
        </Text>
        <Text style={styles.announcementText}>
          Winner announcement: <Text style={styles.announcementDate}>May 31, 2023</Text>
        </Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={globalStyles.buttonPrimary}
          onPress={handleEnterAnother}
          activeOpacity={0.8}
        >
          <Text style={globalStyles.buttonText}>Enter Another Raffle</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[globalStyles.buttonSecondary, styles.secondaryButton]}
          onPress={handleReturnHome}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonSecondaryText}>Return Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  successIconContainer: {
    alignItems: 'center',
    marginBottom: spacing.large,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.successColor,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  checkmark: {
    color: colors.textColor,
    fontSize: 40,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.large,
  },
  summarySection: {
    marginBottom: spacing.large,
  },
  prizeSection: {
    marginBottom: spacing.large,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textColor,
    marginBottom: spacing.medium,
  },
  infoField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  infoValue: {
    color: colors.textColor,
    fontSize: 14,
    fontWeight: '500',
  },
  prizeContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.kaviaDark,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  prizeImage: {
    width: '100%',
    height: 160,
  },
  prizeInfo: {
    padding: spacing.medium,
  },
  prizeName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textColor,
    marginBottom: spacing.small,
  },
  prizeValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.kaviaOrange,
    marginBottom: spacing.small,
  },
  prizeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  notificationContainer: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.medium,
  },
  announcementText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  announcementDate: {
    fontWeight: '700',
    color: colors.textColor,
  },
  buttonContainer: {
    gap: spacing.medium,
    marginBottom: spacing.large,
  },
  secondaryButton: {
    marginTop: spacing.small,
  },
  buttonSecondaryText: {
    color: colors.textColor,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SuccessScreen;
