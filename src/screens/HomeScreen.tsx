import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  incrementPage,
  setSearchText,
} from '../redux/usersSlice';
import { RootState } from '../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const { list, page, searchText, loading } = useSelector(
    (state: RootState) => state.users
  );

  const [imageFallback, setImageFallback] = useState<{[key:number]: string}>({});

  useEffect(() => {
    dispatch(fetchUsers({ page: 1 }));
  }, []);

  const filteredUsers = list.filter(user =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const loadMore = () => {
    if (!loading) {
      dispatch(incrementPage());
      dispatch(fetchUsers({ page: page + 1 }));
    }
  };

  const renderUser = ({ item }: any) => {
    const safeFirstName = item.firstName || "Employee";
    const safeLastName = item.lastName || "User";
    const fullName = encodeURIComponent(`${safeFirstName} ${safeLastName}`);
  
    // Use state fallback if already set, otherwise main URL
    const imageUrl = imageFallback[item.id] 
      ? imageFallback[item.id] 
      : `https://ui-avatars.com/api/?name=${fullName}&background=random&color=fff`;
  
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Details', { user: item })}
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          onError={() => {
            const fallbackUrl = `https://ui-avatars.com/api/?name=${fullName}&background=0D8ABC&color=fff`;
            setImageFallback(prev => ({ ...prev, [item.id]: fallbackUrl }));
          }}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{safeFirstName} {safeLastName}</Text>
          <Text>{item.email}</Text>
          <Text>{item.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Employee Directory</Text>

      <TextInput
        placeholder="Search employee"
        style={styles.search}
        onChangeText={text => dispatch(setSearchText(text))}
        value={searchText}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUser}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews
        ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10,textAlign:'center' },
  search: {
    borderWidth: 1,
    borderColor: '#007',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  info: { flex: 1 },
});
