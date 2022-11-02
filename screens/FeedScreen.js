import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FlatList } from "react-native";

import { db } from "../utils/firebase";
import PostCard from "../components/PostCard";
import { Container } from "../styles/feed.styles";

const Posts = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../assets/image/user-7.jpg"),
    postTime: "4 mins ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/image/post-img-2.jpg"),
    liked: true,
    likes: "14",
    comments: "5",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../assets/image/user-7.jpg"),
    postTime: "2 hours ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/image/post-img-2.jpg"),
    liked: false,
    likes: "8",
    comments: "0",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../assets/image/user-7.jpg"),
    postTime: "1 hours ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/image/post-img-2.jpg"),
    liked: true,
    likes: "1",
    comments: "0",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../assets/image/user-7.jpg"),
    postTime: "1 day ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/image/post-img-2.jpg"),
    liked: true,
    likes: "22",
    comments: "4",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../assets/image/user-7.jpg"),
    postTime: "2 days ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/image/post-img-2.jpg"),
    liked: false,
    likes: "0",
    comments: "0",
  },
];

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  // const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPosts = async () => {
    try {
      const list = [];
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), orderBy("postImg", "desc"))
      );
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        list.push({
          id: doc.id,
          userName: data.userName,
          userImg: data.userImg,
          postTime: data.postTime,
          post: data.post,
          postImg: data.postImg,
          liked: data.liked,
          likes: data.likes,
          comments: data.comments,
        });
      });
      setPosts(list);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchPosts();
    setTimeout(() => 5000);
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   if (isFocused) {
  //     setLoading(true);
  //     fetchPosts();
  //     setTimeout(() => 5000);
  //     setLoading(false);
  //   }
  // }, [isFocused]);

  const onRefresh = () => {
    setIsFetching(true);
    fetchPosts();
    setIsFetching(false);
  };
  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={posts}
          onRefresh={onRefresh}
          refreshing={isFetching}
          renderItem={({ item }) => <PostCard item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default FeedScreen;
