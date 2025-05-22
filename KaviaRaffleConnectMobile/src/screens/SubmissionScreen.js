import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { globalStyles, colors, spacing, shadows } from '../styles';

// PUBLIC_INTERFACE
/**
 * SubmissionScreen - Screen for reviewing and submitting raffle entry
 * Displays a summary of user information and prizes with a submit button
 * 
 * @param {object} props - Component props
 * @param {object} props.navigation - React Navigation object for screen transitions
 * @param {object} props.route - React Navigation route object containing params
 * @param {object} props.route.params - Parameters passed from previous screen
 * @param {object} props.route.params.userData - User data from the participant form
 * @param {Array} props.route.params.prizes - Array of prizes available in the raffle
 * @returns {JSX.Element} React component
 */
const SubmissionScreen = ({ navigation, route }) => {
  // Get user data and prizes from route params
  const { userData, prizes } = route.params;

  // Handle submission button press
  const handleSubmit = () => {
    Alert.alert(
      "Confirm Submission",
      "Are you sure you want to submit your raffle entry?",
      [
        { 
          text: "Cancel", 
          style: "cancel" 
        },
        { 
          text: "Submit", 
          onPress: () => {
            // Navigate to the Success screen with user data and the first prize
            // In a real app, the selected prize might be chosen randomly or based on user preference
            navigation.navigate('Success', {
              userData,
              selectedPrize: prizes[0] // For demo purposes, use the first prize
            });
          } 
        }
      ]
    );
  };

  // Render an information field with label and value
  const renderInfoField = (label, value) => (
    <View style={styles.infoField}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  // Render a prize card
  const renderPrizeCard = (prize) => (
    <View key={prize.id} style={styles.prizeCard}>
      <View style={styles.prizeImageContainer}>
        <Image 
          source={{ uri: prize.image }} 
          style={styles.prizeImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.prizeDetails}>
        <Text style={styles.prizeName}>{prize.name}</Text>
        <Text style={styles.prizeValue}>{prize.value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={globalStyles.screenContainer}
      contentContainerStyle={globalStyles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={globalStyles.title}>Review Your Entry</Text>
        <Text style={globalStyles.bodyText}>
          Please review your information before submitting your raffle entry
        </Text>
      </View>

      {/* User Information Summary */}
      <View style={[globalStyles.card, styles.section]}>
        <Text style={styles.sectionTitle}>Your Information</Text>
        {renderInfoField('Name', userData.name)}
        {renderInfoField('Email', userData.email)}
        {renderInfoField('Job Title', userData.jobTitle)}
      </View>

      {/* Prizes Section */}
      <View style={[globalStyles.card, styles.section]}>
        <Text style={styles.sectionTitle}>Available Prizes</Text>
        <Text style={styles.prizesDescription}>
          You'll be entered to win one of these amazing prizes:
        </Text>
        
        <View style={styles.prizesContainer}>
          {prizes.map(prize => renderPrizeCard(prize))}
        </View>
      </View>

      {/* Terms and Conditions */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By submitting, you agree to the raffle terms and conditions.
          Winners will be notified via email.
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={globalStyles.buttonPrimary}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={globalStyles.buttonText}>Submit Entry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.large,
  },
  section: {
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
  prizesContainer: {
    marginTop: spacing.medium,
  },
  prizesDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.medium,
  },
  prizeCard: {
    flexDirection: 'row',
    backgroundColor: colors.kaviaDark,
    borderRadius: 8,
    marginBottom: spacing.medium,
    borderWidth: 1,
    borderColor: colors.borderColor,
    overflow: 'hidden',
    ...shadows.small,
  },
  prizeImageContainer: {
    width: 80,
    height: 80,
  },
  prizeImage: {
    width: '100%',
    height: '100%',
  },
  prizeDetails: {
    flex: 1,
    padding: spacing.medium,
  },
  prizeName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textColor,
    marginBottom: spacing.small,
  },
  prizeValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.kaviaOrange,
  },
  termsContainer: {
    marginBottom: spacing.large,
  },
  termsText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default SubmissionScreen;
