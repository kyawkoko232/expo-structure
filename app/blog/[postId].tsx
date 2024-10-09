import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/providers/redux/store";
import { useGetPostQuery } from "@/providers/redux/services/endpoints/blog.endpoints";
import { clearSelectedPost } from "@/providers/redux/slices/postSlice";
import { MaterialIcons } from "@expo/vector-icons"; // Importing Material Icons
import { MotiView } from "moti";

const SinglePostPage: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPostId = useSelector(
    (state: RootState) => state.post.selectedPostId
  );

  // Skip fetching if no selected post ID is available
  const {
    data: post,
    error,
    isLoading,
  } = useGetPostQuery(selectedPostId, {
    skip: selectedPostId === null,
  });

  useEffect(() => {
    // Clear selected post on component unmount
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>Error loading post</Text>
      ) : post ? (
        <MotiView
          from={{ opacity: 0 }} // Start off the screen to the right
          animate={{ opacity: 1 }} // Move to the center
          transition={{
            type: "timing",
            duration: 200,
          }}
        >
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
          <Text style={styles.tags}>Tags: {post.tags?.join(", ")}</Text>
          <View style={styles.reactions}>
            <View style={styles.reaction}>
              <MaterialIcons name="thumb-up" size={20} color="#007bff" />
              <Text style={styles.reactionText}>{post.reactions?.likes}</Text>
            </View>
            <View style={styles.reaction}>
              <MaterialIcons name="thumb-down" size={20} color="#dc3545" />
              <Text style={styles.reactionText}>
                {post.reactions?.dislikes}
              </Text>
            </View>
            <View style={styles.reaction}>
              <MaterialIcons name="visibility" size={20} color="#6c757d" />
              <Text style={styles.reactionText}>{post.views}</Text>
            </View>
          </View>
        </MotiView>
      ) : (
        <Text style={styles.errorText}>Post not found</Text> // Handle case where post is null or undefined
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  body: {
    fontSize: 18,
    color: "#555",
    lineHeight: 24,
    marginBottom: 10,
  },
  tags: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#007bff",
    marginVertical: 10,
  },
  reactions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  reaction: {
    flexDirection: "row",
    alignItems: "center",
  },
  reactionText: {
    fontSize: 16,
    color: "#888",
    marginLeft: 5,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#007bff",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
});

export default SinglePostPage;
