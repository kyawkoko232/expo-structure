import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/providers/redux/store";
import { useGetPostQuery } from "@/providers/redux/services/endpoints/blog.endpoints";
import { clearSelectedPost } from "@/providers/redux/slices/postSlice";

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

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading post</Text>;

  return (
    <SafeAreaView>
      <View>
        {post && (
          <>
            <Text style={styles.title}>{post.title}</Text>
            <Text>{post.body}</Text>
            <Text style={styles.tags}>Tags: {post.tags?.join(", ")}</Text>
            <Text>Likes: {post.reactions?.likes}</Text>
            <Text>Dislikes: {post.reactions?.dislikes}</Text>
            <Text>Views: {post.views}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tags: {
    fontStyle: "italic",
    marginVertical: 10,
  },
});

export default SinglePostPage;
