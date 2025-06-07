import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, CheckCircle, Package, Utensils } from 'lucide-react-native';
import { useState } from 'react';

interface Order {
  id: string;
  items: string[];
  total: number;
  status: 'placed' | 'preparing' | 'ready' | 'completed';
  orderTime: string;
  estimatedTime?: string;
  pickupTime?: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD001',
    items: ['Veg Biryani x1', 'Cold Coffee x2'],
    total: 240,
    status: 'preparing',
    orderTime: '2:30 PM',
    estimatedTime: '2:50 PM',
  },
  {
    id: 'ORD002',
    items: ['Paneer Tikka x1', 'Chocolate Shake x1'],
    total: 240,
    status: 'ready',
    orderTime: '1:15 PM',
    pickupTime: '1:35 PM',
  },
  {
    id: 'ORD003',
    items: ['Chicken Burger x2'],
    total: 360,
    status: 'completed',
    orderTime: '12:30 PM',
    pickupTime: '12:50 PM',
  },
];

const STATUS_CONFIG = {
  placed: { 
    icon: Clock, 
    color: '#FF9500', 
    text: 'Order Placed',
    description: 'Your order has been received'
  },
  preparing: { 
    icon: Utensils, 
    color: '#007AFF', 
    text: 'Preparing',
    description: 'Your order is being prepared'
  },
  ready: { 
    icon: Package, 
    color: '#34C759', 
    text: 'Ready for Pickup',
    description: 'Your order is ready!'
  },
  completed: { 
    icon: CheckCircle, 
    color: '#8E8E93', 
    text: 'Completed',
    description: 'Order picked up'
  },
};

export default function OrdersScreen() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'history'>('active');

  const activeOrders = MOCK_ORDERS.filter(order => 
    order.status === 'placed' || order.status === 'preparing' || order.status === 'ready'
  );
  
  const completedOrders = MOCK_ORDERS.filter(order => order.status === 'completed');

  const renderOrder = (order: Order) => {
    const statusConfig = STATUS_CONFIG[order.status];
    const StatusIcon = statusConfig.icon;

    return (
      <View key={order.id} style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>#{order.id}</Text>
            <Text style={styles.orderTime}>{order.orderTime}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusConfig.color }]}>
            <StatusIcon size={16} color="#FFFFFF" />
            <Text style={styles.statusText}>{statusConfig.text}</Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          {order.items.map((item, index) => (
            <Text key={index} style={styles.orderItem}>• {item}</Text>
          ))}
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.orderTotal}>Total: ₹{order.total}</Text>
          {order.status === 'preparing' && order.estimatedTime && (
            <View style={styles.timeInfo}>
              <Clock size={14} color="#FF9500" />
              <Text style={styles.estimatedTime}>Ready by {order.estimatedTime}</Text>
            </View>
          )}
          {order.status === 'ready' && (
            <View style={styles.timeInfo}>
              <Package size={14} color="#34C759" />
              <Text style={styles.readyText}>Ready for pickup!</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Orders</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'active' && styles.activeTab]}
          onPress={() => setSelectedTab('active')}>
          <Text style={[styles.tabText, selectedTab === 'active' && styles.activeTabText]}>
            Active Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'history' && styles.activeTab]}
          onPress={() => setSelectedTab('history')}>
          <Text style={[styles.tabText, selectedTab === 'history' && styles.activeTabText]}>
            Order History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.ordersContainer} showsVerticalScrollIndicator={false}>
        {selectedTab === 'active' ? (
          activeOrders.length > 0 ? (
            activeOrders.map(renderOrder)
          ) : (
            <View style={styles.emptyContainer}>
              <Clock size={60} color="#E5E5E7" />
              <Text style={styles.emptyTitle}>No Active Orders</Text>
              <Text style={styles.emptySubtitle}>Place an order from the menu to see it here</Text>
            </View>
          )
        ) : (
          completedOrders.length > 0 ? (
            completedOrders.map(renderOrder)
          ) : (
            <View style={styles.emptyContainer}>
              <CheckCircle size={60} color="#E5E5E7" />
              <Text style={styles.emptyTitle}>No Order History</Text>
              <Text style={styles.emptySubtitle}>Your completed orders will appear here</Text>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1C1C1E',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#6B8E5A',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  ordersContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  orderTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B8E5A',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  estimatedTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FF9500',
  },
  readyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#34C759',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1C1C1E',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});