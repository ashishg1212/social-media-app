import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

import Title from './components/Title/Title';
import UserStory from './components/UserStory/UserStory';
import globalStyle from './assets/styles/globalStyle';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // Dummy user stories
  const userStories = [
    { firstName: 'Adam', id: 1, profileImage: require('./assets/images/default_profile.png') },
    { firstName: 'Alex', id: 2, profileImage: require('./assets/images/default_profile.png') },
    { firstName: 'Bob', id: 3, profileImage: require('./assets/images/default_profile.png') },
    { firstName: 'Clara', id: 4, profileImage: require('./assets/images/default_profile.png') },
    { firstName: 'Diana', id: 5, profileImage: require('./assets/images/default_profile.png') },
    { firstName: 'Eva', id: 6, profileImage: require('./assets/images/default_profile.png') },
    { firstName: 'Henry', id: 7, profileImage: require('./assets/images/default_profile.png') },
    { firstName: 'Sophia', id: 8, profileImage: require('./assets/images/default_profile.png') },
    { firstName: 'Nora', id: 9, profileImage: require('./assets/images/default_profile.png') },
  ];

  const userStoriesPageSize = 4;
  const [userStoriesCurrentPage, setUserStoriesCurrentPage] = useState(1);
  const [userStoriesRenderedData, setUserStoriesRenderedData] = useState([]);
  const [isLoadingUserStories, setIsLoadingUserStories] = useState(false);

  // Pagination helper
  const pagination = (database, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= database.length) {
      return [];
    }
    return database.slice(startIndex, endIndex);
  };

  // Initial load
  useEffect(() => {
    setIsLoadingUserStories(true);
    const getInitialData = pagination(userStories, 1, userStoriesPageSize);
    setUserStoriesRenderedData(getInitialData);
    setIsLoadingUserStories(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load more when reaching end
  const handleLoadMore = () => {
    if (isLoadingUserStories) return;

    setIsLoadingUserStories(true);
    const nextPage = userStoriesCurrentPage + 1;
    const contentToAppend = pagination(userStories, nextPage, userStoriesPageSize);

    if (contentToAppend.length > 0) {
      setUserStoriesCurrentPage(nextPage);
      setUserStoriesRenderedData(prev => [...prev, ...contentToAppend]);
    }

    setIsLoadingUserStories(false);
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={globalStyle.header}>
        <Title title={'Let’s Explore'} />
        <TouchableOpacity style={globalStyle.messageIcon}>
          <FontAwesomeIcon icon={faEnvelope} size={20} color={'#898DAE'} />
          <View style={globalStyle.messageNumberContainer}>
            <Text style={globalStyle.messageNumber}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* User Stories Section */}
      <View style={globalStyle.userStoryContainer}>
        <FlatList
          data={userStoriesRenderedData}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <UserStory
              firstName={item.firstName}
              profileImage={item.profileImage}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
export default App;