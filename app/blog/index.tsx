import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { useGetPostsQuery } from "@/providers/redux/services/endpoints/blog.endpoints";
import { setSelectedPostId } from "@/providers/redux/slices/postSlice";
import { MaterialIcons } from "@expo/vector-icons"; // Importing icons
import useAuth from "@/helpers/useAuth";

const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { session } = useAuth(); // Use the hook to get session
  const { data: postsData, error, isLoading } = useGetPostsQuery(undefined);

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error loading posts</Text>;

  const handlePostPress = (postId: number) => {
    dispatch(setSelectedPostId(postId));
    router.push(`/blog/${postId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {!session ? (
          <>
            <Text style={styles.loginMessage}>You are not logged in</Text>
            <TouchableOpacity>
              <Link href="/login" style={styles.linkText}>
                Login
              </Link>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.loginMessage}>You are logged in</Text>
        )}
      </View>
      <FlatList
        data={postsData?.posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postContainer}
            onPress={() => handlePostPress(item.id)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.tags}>Tags: {item.tags.join(", ")}</Text>
            <View style={styles.reactions}>
              <View style={styles.reaction}>
                <MaterialIcons name="thumb-up" size={22} color="#007bff" />
                <Text style={styles.reactionText}>{item.reactions.likes}</Text>
              </View>
              <View style={styles.reaction}>
                <MaterialIcons name="thumb-down" size={22} color="#dc3545" />
                <Text style={styles.reactionText}>
                  {item.reactions.dislikes}
                </Text>
              </View>
              <View style={styles.reaction}>
                <MaterialIcons name="visibility" size={22} color="#6c757d" />
                <Text style={styles.reactionText}>{item.views}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#ffffff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 8,
    marginBottom: 10,
  },
  loginMessage: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  linkText: {
    color: "#007bff",
    textAlign: "center",
    fontWeight: "bold",
  },
  listContainer: {
    padding: 16,
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  body: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  tags: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#007bff",
    marginBottom: 10,
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
    fontSize: 14,
    color: "#888",
    marginLeft: 5, // Space between icon and text
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

export default Blog;
