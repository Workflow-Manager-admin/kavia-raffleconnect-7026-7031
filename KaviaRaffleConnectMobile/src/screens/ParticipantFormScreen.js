import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { globalStyles, colors, spacing } from '../styles';

// PUBLIC_INTERFACE
/**
 * ParticipantFormScreen - Screen for collecting participant information
 * Includes form fields for Name, Email, and Job Title with validation
 * 
 * @param {object} props - Component props including navigation
 * @param {object} props.navigation - React Navigation object for screen transitions
 * @returns {JSX.Element} React component
 */
const ParticipantFormScreen = ({ navigation }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
  });
  
  // Input validation errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    jobTitle: '',
  });

  // Job title options
  const jobTitleOptions = [
    { label: 'Select a job title', value: '' },
    { label: 'Executive Level', value: 'Executive Level' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Technical Role', value: 'Technical Role' },
    { label: 'Self-Employed', value: 'Self-Employed' },
    { label: 'Student', value: 'Student' },
    { label: 'Other', value: 'Other' },
  ];

  // Update form data when inputs change
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate all form fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate job title
    if (!formData.jobTitle) {
      newErrors.jobTitle = 'Please select a job title';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Form submission handler
  const handleSubmit = () => {
    if (validateForm()) {
      // Navigate to PrizeShowcase screen and pass user data
      navigation.navigate('PrizeShowcase', { userData: formData });
    } else {
      // Show error message
      Alert.alert(
        "Form Error",
        "Please correct the errors in the form.",
        [{ text: "OK" }]
      );
    }
  };

  // Render Job Title picker with platform-specific implementation
  const renderJobTitlePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={[globalStyles.pickerContainer, errors.jobTitle ? globalStyles.inputError : null]}>
          <Picker
            selectedValue={formData.jobTitle}
            onValueChange={(value) => handleInputChange('jobTitle', value)}
            style={styles.picker}
          >
            {jobTitleOptions.map((option) => (
              <Picker.Item 
                key={option.value} 
                label={option.label} 
                value={option.value}
                color={option.value === '' ? colors.textSecondary : colors.textColor}
              />
            ))}
          </Picker>
        </View>
      );
    } else {
      // Android picker
      return (
        <View style={[globalStyles.pickerContainer, errors.jobTitle ? globalStyles.inputError : null]}>
          <Picker
            selectedValue={formData.jobTitle}
            onValueChange={(value) => handleInputChange('jobTitle', value)}
            style={styles.picker}
            dropdownIconColor={colors.textColor}
          >
            {jobTitleOptions.map((option) => (
              <Picker.Item 
                key={option.value} 
                label={option.label} 
                value={option.value}
                style={{color: colors.textColor}}
              />
            ))}
          </Picker>
        </View>
      );
    }
  };

  return (
    <ScrollView 
      style={globalStyles.screenContainer}
      contentContainerStyle={globalStyles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={globalStyles.title}>Participant Information</Text>
        <Text style={globalStyles.bodyText}>
          Please provide your details to enter the Kavia AI raffle
        </Text>
      </View>

      <View style={globalStyles.card}>
        {/* Name Field */}
        <View style={globalStyles.formGroup}>
          <Text style={globalStyles.label}>Name</Text>
          <TextInput
            style={[
              globalStyles.input,
              errors.name ? globalStyles.inputError : null
            ]}
            placeholder="Enter your name"
            placeholderTextColor={colors.textSecondary}
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
          {errors.name ? (
            <Text style={globalStyles.errorText}>{errors.name}</Text>
          ) : null}
        </View>

        {/* Email Field */}
        <View style={globalStyles.formGroup}>
          <Text style={globalStyles.label}>Email</Text>
          <TextInput
            style={[
              globalStyles.input,
              errors.email ? globalStyles.inputError : null
            ]}
            placeholder="Enter your email address"
            placeholderTextColor={colors.textSecondary}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? (
            <Text style={globalStyles.errorText}>{errors.email}</Text>
          ) : null}
        </View>

        {/* Job Title Field */}
        <View style={globalStyles.formGroup}>
          <Text style={globalStyles.label}>Job Title</Text>
          {renderJobTitlePicker()}
          {errors.jobTitle ? (
            <Text style={globalStyles.errorText}>{errors.jobTitle}</Text>
          ) : null}
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={globalStyles.buttonPrimary}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={globalStyles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.large,
  },
  picker: {
    color: colors.textColor,
    height: 50,
  },
});

export default ParticipantFormScreen;
