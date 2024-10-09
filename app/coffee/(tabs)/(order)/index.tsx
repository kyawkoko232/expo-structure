import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CoffeeOrderCard = () => {
  const { currentTheme } = useTheme();
  const color = currentTheme.colors;
  const router = useRouter();

  // Mock order data
  const order = {
    transactionId: "TX123456789",
    date: "2024-10-04",
    time: "11:30 AM",
    items: [
      { name: "Latte", size: "Medium", price: "$4.50" },
      { name: "Cappuccino", size: "Large", price: "$9.50" },
    ],
    paymentSummary: {
      price: "$7.00",
      rewardPoints: "20",
      total: "$7.00",
      paymentMethod: "Credit Card (**** 1234)",
      schedulePickup: "2024-10-04 at 12:00 PM",
    },
  };

  const navigateToCart = () => {
    router.push("/settings/theme");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: color.background }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { backgroundColor: color.textOpposite },
        ]}
        showsVerticalScrollIndicator={false}  
        showsHorizontalScrollIndicator={false} 
      >
        {/* Thank You Message */}
        <Text style={[styles.thankYouText, { color: color.text }]}>
          Thank you!
        </Text>

        {/* Transaction Details */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: color.text }]}>
            Transaction Details
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.text, { color: color.text }]}>
              Transaction ID
            </Text>
            <Text style={{ color: color.text }}>{order.transactionId}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.text, { color: color.text }]}>Date</Text>
            <Text style={{ color: color.text }}>{order.date}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.text, { color: color.text }]}>Time</Text>
            <Text style={{ color: color.text }}>{order.time}</Text>
          </View>
        </View>

        {/* Ordered Items */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: color.text }]}>
            Items Ordered
          </Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={[styles.text, { color: color.text }]}>
                {item.name} ({item.size ? item.size : ""})
              </Text>
              <Text style={[styles.text, { color: color.text }]}>
                {item.price}
              </Text>
            </View>
          ))}
        </View>

        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: color.text }]}>
            Payment Summary
          </Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.text, { color: color.text }]}>Price</Text>
            <Text style={[styles.text, { color: color.text }]}>
              {order.paymentSummary.price}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.text, { color: color.text }]}>
              Reward Points Earned
            </Text>
            <Text style={[styles.text, { color: color.text }]}>
              {order.paymentSummary.rewardPoints}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.text, { color: color.text }]}>Total</Text>
            <Text style={[styles.text, { color: color.text }]}>
              {order.paymentSummary.total}
            </Text>
          </View>
          <View style={styles.section}>
            {/* Payment Method */}
            <Text style={[styles.text, { color: color.text }]}>
              Payment Method
            </Text>
            <Text
              style={[
                styles.text,
                { color: color.text, fontSize: 14, flexWrap: "wrap", marginBottom: 10 }
              ]}
              numberOfLines={2}
            >
              {order.paymentSummary.paymentMethod}
            </Text>

            {/* Schedule Pick-Up */}
            <Text style={[styles.text, { color: color.text }]}>
              Schedule Pick-Up
            </Text>
            <Text
              style={[
                styles.text,
                { color: color.text, fontSize: 14, flexWrap: "wrap" }
              ]}
            >
              {order.paymentSummary.schedulePickup}
            </Text>
          </View>

        </View>

        {/* Track Order Button */}
        <Pressable
          style={[styles.trackOrderButton, { backgroundColor: color.primary }]}
          onPress={navigateToCart}
        >
          <Ionicons name="locate-outline" size={20} color="white" />
          <Text style={styles.trackOrderText}>Track Order</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    paddingBottom: 30,
    borderColor: "black",
    borderWidth: 0.2,
    borderRadius: 10,
    padding: 30,
  },
  thankYouText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  trackOrderButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  trackOrderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default CoffeeOrderCard;
