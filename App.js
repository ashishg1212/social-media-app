import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {scaleFontSize} from './assets/styles/scaling';

import Title from './components/Title/Title';
import UserStory from './components/UserStory/UserStory';
import globalStyle from './assets/styles/globalStyle';
import UserPost from './components/UserPost/UserPost';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // Dummy user stories
  const userStories = [
    {
      firstName: 'Adam',
      id: 1,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Alex',
      id: 2,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Bob',
      id: 3,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Clara',
      id: 4,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Diana',
      id: 5,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Eva',
      id: 6,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Henry',
      id: 7,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Sophia',
      id: 8,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Nora',
      id: 9,
      profileImage: require('./assets/images/default_profile.png'),
    },
  ];
  const userPosts = [
    {
      firstName: 'Allison',
      lastName: 'Becker',
      location: 'Boston, MA',
      likes: 1201,
      comments: 24,
      bookmarks: 55,
      id: 1,
      image: require('./assets/images/default_post.png'),
      profileImage: require('./assets/images/default_profile.png'),
    },

    {
      firstName: 'Jennifer',
      lastName: 'Wilkson',
      location: 'Worcester, MA',
      likes: 1301,
      comments: 25,
      bookmarks: 70,
      id: 2,
      image: require('./assets/images/default_post.png'),
      profileImage: require('./assets/images/default_profile.png'),
    },

    {
      firstName: 'Adam',
      lastName: 'Spera',
      location: 'Worcester, MA',
      likes: 100,
      comments: 8,
      bookmarks: 3,
      id: 3,
      image: require('./assets/images/default_post.png'),
      profileImage: require('./assets/images/default_profile.png'),
    },

    {
      firstName: 'Henry',
      lastName: 'Chaos',
      location: 'New York, NY',
      likes: 200,
      comments: 16,
      bookmarks: 6,
      id: 4,
      image: require('./assets/images/default_post.png'),
      profileImage: require('./assets/images/default_profile.png'),
    },

    {
      firstName: 'Nicolas',
      lastName: 'Namoradze',
      location: 'Berlin, Germany',
      likes: 2000,
      comments: 32,
      bookmarks: 12,
      id: 5,
      image: require('./assets/images/default_post.png'),
      profileImage: require('./assets/images/default_profile.png'),
    },
  ];

  const userStoriesPageSize = 4;
  const [userStoriesCurrentPage, setUserStoriesCurrentPage] = useState(1);
  const [userStoriesRenderedData, setUserStoriesRenderedData] = useState([]);
  const [isLoadingUserStories, setIsLoadingUserStories] = useState(false);

  const userPostsPageSize = 2;
  const [userPostsCurrentPage, setUserPostsCurrentPage] = useState(1);
  const [userPostsRenderedData, setUserPostsRenderedData] = useState([]);
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState(false);

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

    setIsLoadingUserPosts(true);
    const getInitialDataPosts = pagination(userPosts, 1, userPostsPageSize);
    setUserPostsRenderedData(getInitialDataPosts);
    setIsLoadingUserPosts(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load more when reaching end
  const handleLoadMore = () => {
    if (isLoadingUserStories) return;

    setIsLoadingUserStories(true);
    const nextPage = userStoriesCurrentPage + 1;
    const contentToAppend = pagination(
      userStories,
      nextPage,
      userStoriesPageSize,
    );

    if (contentToAppend.length > 0) {
      setUserStoriesCurrentPage(nextPage);
      setUserStoriesRenderedData(prev => [...prev, ...contentToAppend]);
    }

    setIsLoadingUserStories(false);
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={globalStyle.header}>
                <Title title={'Let’s Explore'} />
                <TouchableOpacity style={globalStyle.messageIcon}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size={scaleFontSize(20)}
                    color={'#898DAE'}
                  />
                  <View style={globalStyle.messageNumberContainer}>
                    <Text style={globalStyle.messageNumber}>2</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={globalStyle.userStoryContainer}>
                <FlatList
                  onEndReachedThreshold={0.5}
                  onEndReached={() => {
                    if (isLoadingUserStories) {
                      return;
                    }
                    setIsLoadingUserStories(true);
                    const contentToAppend = pagination(
                      userStories,
                      userStoriesCurrentPage + 1,
                      userStoriesPageSize,
                    );
                    if (contentToAppend.length > 0) {
                      setUserStoriesCurrentPage(userStoriesCurrentPage + 1);
                      setUserStoriesRenderedData(prev => [
                        ...prev,
                        ...contentToAppend,
                      ]);
                    }
                    setIsLoadingUserStories(false);
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={userStoriesRenderedData}
                  renderItem={({item}) => (
                    <UserStory
                      key={'userStory' + item.id}
                      firstName={item.firstName}
                      profileImage={item.profileImage}
                    />
                  )}
                />
              </View>
            </>
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (isLoadingUserPosts) {
              return;
            }
            setIsLoadingUserPosts(true);
            console.log(
              'fetching more data for you ',
              userPostsCurrentPage + 1,
            );
            const contentToAppend = pagination(
              userPosts,
              userPostsCurrentPage + 1,
              userPostsPageSize,
            );
            if (contentToAppend.length > 0) {
              setUserPostsCurrentPage(userPostsCurrentPage + 1);
              setUserPostsRenderedData(prev => [...prev, ...contentToAppend]);
            }
            setIsLoadingUserPosts(false);
          }}
          data={userPostsRenderedData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={globalStyle.userPostContainer}>
              <UserPost
                firstName={item.firstName}
                lastName={item.lastName}
                image={item.image}
                likes={item.likes}
                comments={item.comments}
                bookmarks={item.bookmarks}
                profileImage={item.profileImage}
                location={item.location}
              />
            </View>
          )}
        />
      </View>
      
    </SafeAreaView>
  );
}
export default App;
