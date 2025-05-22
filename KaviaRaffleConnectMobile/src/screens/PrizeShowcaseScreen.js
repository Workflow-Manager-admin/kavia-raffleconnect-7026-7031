import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { globalStyles, colors, spacing, shadows } from '../styles';

// Prize data
const prizes = [
  {
    id: 1,
    name: 'Kavia Pro AI License',
    description: 'One year premium subscription to Kavia Pro AI with unlimited access to all features',
    image: 'https://via.placeholder.com/300x200?text=Kavia+Pro+AI',
    value: '$1200',
    category: 'software'
  },
  {
    id: 2,
    name: 'MacBook Pro M2',
    description: 'Latest MacBook Pro with M2 chip, 16GB RAM and 512GB storage',
    image: 'https://via.placeholder.com/300x200?text=MacBook+Pro',
    value: '$2499',
    category: 'hardware'
  }
];

// PUBLIC_INTERFACE
/**
 * PrizeShowcaseScreen - Screen for displaying available raffle prizes
 * Shows two prizes in an attractive layout with details and a Continue button
 * 
 * @param {object} props - Component props
 * @param {object} props.navigation - React Navigation object for screen transitions
 * @param {object} props.route - React Navigation route object containing params
 * @param {object} props.route.params - Parameters passed from previous screen
 * @param {object} props.route.params.userData - User data from the participant form
 * @returns {JSX.Element} React component
 */
const PrizeShowcaseScreen = ({ navigation, route }) => {
  // Get user data from route params
  const { userData } = route.params;

  // Handle continue button press
  const handleContinue = () => {
    // Navigate to the Submission screen with user data and prizes
    navigation.navigate('Submission', { 
      userData,
      prizes
    });
  };

  // Render an individual prize card
  const renderPrizeCard = (prize) => (
    <View key={prize.id} style={styles.prizeCard}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: prize.image }} 
          style={styles.prizeImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.prizeDetails}>
        <Text style={styles.prizeName}>{prize.name}</Text>
        <Text style={styles.prizeValue}>{prize.value}</Text>
        <Text style={styles.prizeDescription}>{prize.description}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView 
      style={globalStyles.screenContainer}
      contentContainerStyle={globalStyles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={globalStyles.title}>Available Prizes</Text>
        <Text style={globalStyles.bodyText}>
          These are the amazing prizes available in this raffle
        </Text>
      </View>

      <View style={styles.prizesContainer}>
        {prizes.map(prize => renderPrizeCard(prize))}
      </View>

      <TouchableOpacity
        style={globalStyles.buttonPrimary}
        onPress={handleContinue}
        activeOpacity={0.8}
      >
        <Text style={globalStyles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.large,
  },
  prizesContainer: {
    marginBottom: spacing.large,
  },
  prizeCard: {
    backgroundColor: colors.kaviaDarkLighter,
    borderRadius: 8,
    marginBottom: spacing.large,
    borderWidth: 1,
    borderColor: colors.borderColor,
    overflow: 'hidden',
    ...shadows.small,
  },
  imageContainer: {
    height: 180,
    width: '100%',
  },
  prizeImage: {
    width: '100%',
    height: '100%',
  },
  prizeDetails: {
    padding: spacing.medium,
  },
  prizeName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textColor,
    marginBottom: spacing.small,
  },
  prizeValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.kaviaOrange,
    marginBottom: spacing.small,
  },
  prizeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default PrizeShowcaseScreen;
