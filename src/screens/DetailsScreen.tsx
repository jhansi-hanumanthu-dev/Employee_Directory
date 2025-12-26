import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailsScreen({ route }: any) {
  const { user } = route.params;

  // Use ui-avatars.com to guarantee visible avatar
  const safeFirstName = user.firstName || "Employee";
  const safeLastName = user.lastName || "User";
  const fullName = encodeURIComponent(`${safeFirstName} ${safeLastName}`);
  const imageUrl = `https://ui-avatars.com/api/?name=${fullName}&background=0D8ABC&color=fff`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar */}
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <Text style={styles.name}>{safeFirstName} {safeLastName}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Personal Info</Text>
        <Text style={styles.text}>Username: {user.username}</Text>
        <Text style={styles.text}>Age: {user.age}</Text>
        <Text style={styles.text}>Gender: {user.gender}</Text>
        <Text style={styles.text}>Maiden Name: {user.maidenName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Contact Info</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        <Text style={styles.text}>Phone: {user.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Address</Text>
        <Text style={styles.text}>{user.address.city}, {user.address.state}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Company Info</Text>
        <Text style={styles.text}>{user.company.name}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0D8ABC',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
});
