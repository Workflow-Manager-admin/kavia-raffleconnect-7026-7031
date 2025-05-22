/**
 * Global styles for the Kavia RaffleConnect Mobile app
 * Contains reusable style patterns for consistent UI
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export default StyleSheet.create({
  // Container styles
  screenContainer: {
    flex: 1,
    backgroundColor: colors.kaviaDark,
    padding: spacing.medium,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: spacing.large,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.kaviaDarkLighter,
    borderRadius: 8,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  
  // Text styles
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textColor,
    marginBottom: spacing.medium,
  },
  subtitle: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.medium,
    color: colors.textColor,
    marginBottom: spacing.medium,
  },
  bodyText: {
    fontSize: typography.fontSize.body,
    color: colors.textColor,
    marginBottom: spacing.medium,
    lineHeight: 20,
  },
  captionText: {
    fontSize: typography.fontSize.small,
    color: colors.textSecondary,
  },
  
  // Form styles
  formGroup: {
    marginBottom: spacing.large,
  },
  label: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    marginBottom: spacing.small,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    padding: spacing.medium,
    color: colors.textColor,
    fontSize: typography.fontSize.body,
  },
  inputError: {
    borderColor: colors.errorColor,
  },
  errorText: {
    color: colors.errorColor,
    fontSize: typography.fontSize.small,
    marginTop: spacing.small,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
  },
  
  // Button styles
  buttonPrimary: {
    backgroundColor: colors.kaviaOrange,
    borderRadius: 8,
    paddingVertical: spacing.medium,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    paddingVertical: spacing.medium,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textColor,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.medium,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
