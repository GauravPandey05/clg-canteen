import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  preparationTime: number;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Veg Biryani',
    description: 'Aromatic basmati rice with mixed vegetables and spices',
    price: 120,
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg',
    category: 'Main Course',
    available: true,
    preparationTime: 20,
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese with bell peppers and onions',
    price: 150,
    image: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg',
    category: 'Starters',
    available: true,
    preparationTime: 15,
  },
  {
    id: '3',
    name: 'Cold Coffee',
    description: 'Refreshing iced coffee with whipped cream',
    price: 60,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    category: 'Beverages',
    available: true,
    preparationTime: 5,
  },
  {
    id: '4',
    name: 'Chicken Burger',
    description: 'Juicy chicken patty with fresh vegetables and cheese',
    price: 180,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    category: 'Fast Food',
    available: true,
    preparationTime: 12,
  },
  {
    id: '5',
    name: 'Masala Dosa',
    description: 'Crispy crepe filled with spiced potato mixture',
    price: 80,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
    category: 'South Indian',
    available: false,
    preparationTime: 10,
  },
  {
    id: '6',
    name: 'Chocolate Shake',
    description: 'Rich and creamy chocolate milkshake',
    price: 90,
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg',
    category: 'Beverages',
    available: true,
    preparationTime: 3,
  },
];

const CATEGORIES = ['All', 'Main Course', 'Starters', 'Beverages', 'Fast Food', 'South Indian'];

export default function MenuScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: MenuItem) => {
    if (!item.available) {
      Alert.alert('Item Unavailable', 'This item is currently out of stock.');
      return;
    }
    addToCart(item);
    Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>College Canteen</Text>
        <Text style={styles.headerSubtitle}>What would you like to eat today?</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search menu items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6B8E5A" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContent}
        style={styles.categoriesContainer}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}>
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Menu Items */}
      <ScrollView 
        style={styles.menuContainer}
        showsVerticalScrollIndicator={false}>
        {filteredItems.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.menuItemImage} />
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemHeader}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>₹{item.price}</Text>
              </View>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <View style={styles.menuItemFooter}>
                <Text style={styles.preparationTime}>{item.preparationTime} min</Text>
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    !item.available && styles.addButtonDisabled
                  ]}
                  onPress={() => handleAddToCart(item)}
                  disabled={!item.available}>
                  <Plus size={16} color={item.available ? '#FFFFFF' : '#8E8E93'} />
                  <Text style={[
                    styles.addButtonText,
                    !item.available && styles.addButtonTextDisabled
                  ]}>
                    {item.available ? 'ADD' : 'OUT OF STOCK'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1C1C1E',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    maxHeight: 40, // Control the height
    marginBottom: 12, // Reduced from 20
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8, // Reduced from 12
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 16, // Reduced from 20
    paddingVertical: 6, // Reduced from 10
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4, // Add horizontal margin
  },
  categoryButtonActive: {
    backgroundColor: '#6B8E5A',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13, // Reduced from 14
    color: '#8E8E93',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItemImage: {
    width: '100%',
    height: 180,
  },
  menuItemContent: {
    padding: 16,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuItemName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1C1C1E',
    flex: 1,
  },
  menuItemPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#6B8E5A',
  },
  menuItemDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 16,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preparationTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FF9500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B8E5A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  addButtonDisabled: {
    backgroundColor: '#F2F2F7',
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  addButtonTextDisabled: {
    color: '#8E8E93',
  },
});