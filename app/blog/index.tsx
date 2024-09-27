import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { useGetPostsQuery } from "@/providers/redux/services/endpoints/blog.endpoints";
import { setSelectedPostId } from "@/providers/redux/slices/postSlice";

const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: postsData, error, isLoading } = useGetPostsQuery(undefined);
  
  if (isLoading)
    return <Text >Loading...</Text>;
  if (error)
    return (
      <Text>
        Error loading posts
      </Text>
    );

  const handlePostPress = (postId: number) => {
    dispatch(setSelectedPostId(postId));
    router.push(`/blog/${postId}`);
  };

  return (
    <SafeAreaView
     
    >
      <FlatList
        data={postsData?.posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePostPress(item.id)}
          >
            <Text>
              {item.title}
            </Text>
            <Text >{item.body}</Text>
            <Text>
              Tags: {item.tags.join(", ")}
            </Text>
            <View style={styles.reactions}>
              <Text >
                Likes: {item.reactions.likes}
              </Text>
              <Text >
                Dislikes: {item.reactions.dislikes}
              </Text>
              <Text >
                Views: {item.views}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  post: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    elevation: 2, // Reduced shadow for a softer effect
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, // Reduced opacity for less shading
    shadowRadius: 1,
    borderWidth: 1, // Added border width
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tags: {
    fontStyle: "italic",
    marginBottom: 5,
  },
  reactions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Blog;
