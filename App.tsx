import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const App = () => {
  const coffeeRecommendations = [
    'Cappuccino',
    'Macchiato',
    'Latte',
    'Americano',
  ];

  const products = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Strong coffee',
      price: '$3.50',
      image: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Cup-Of-Creamy-Coffee-1024x536.png',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Flat White',
      description: 'Smooth and creamy',
      price: '$4.00',
      image: 'https://www.amorecoffee.co.uk/wp-content/uploads/2019/01/Enjoy.jpg',
      rating: 5.0,
    },
    {
      id: 3,
      name: 'Mocha',
      description: 'Chocolate delight',
      price: '$4.50',
      image: 'https://static.thehoneycombers.com/wp-content/uploads/sites/4/2023/08/Sinamon-best-coffee-in-Bali-Indonesia.jpeg',
      rating: 3.5,
    },
    {
      id: 4,
      name: 'Affogato',
      description: 'Ice cream coffee',
      price: '$5.00',
      image: 'https://www.tasteofhome.com/wp-content/uploads/2023/02/TOH-coffee-vs-espresso-GettyImages-1413384122-JVedit.jpg?fit=300,300&webp=1',
      rating: 4.2,
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter recommendations based on search query
  const filteredRecommendations = coffeeRecommendations.filter(coffee =>
    coffee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <View style={styles.container}>
      {/* Header with location and profile image */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Location</Text>
          <Text style={styles.subLocationText}>Sukabumi, Indonesia</Text>
        </View>
        <Image
          source={require('./src/Assets/ival.jpg')} // Ensure this path is correct
          style={styles.profileImage}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Coffee"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>

      {/* Bottom Image with Promo */}
      <View style={styles.bottomImageContainer}>
        <Image
          source={require('./src/Assets/Coffe.jpg')} // Ensure this path is correct
          style={styles.bottomImage}
        />
        {/* Promo Text */}
        <View style={styles.promoTextContainer}>
          <Text style={styles.promoTitle}>Promo</Text>
          <Text style={styles.promoSubtitle}>Buy One Get</Text>
          <Text style={styles.promoSubtitle}>One Free</Text>
        </View>
      </View>

      {/* Horizontal ScrollView for coffee recommendations */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendationsContainer}
      >
        {filteredRecommendations.map((coffee, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.recommendationItem, hoveredIndex === index && styles.hovered]}
            onPressIn={() => setHoveredIndex(index)}
            onPressOut={() => setHoveredIndex(null)}
            onPress={() => console.log(`You selected ${coffee}`)}
          >
            <Text style={styles.recommendationText}>{coffee}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Scrollable Container for Product Cards */}
      <ScrollView style={styles.cardsScrollView}>
        <View style={styles.cardsContainer}>
          {products.map((product) => (
            <View key={product.id} style={styles.verticalCard}>
              <View style={styles.imageContainer}>
                <Text style={styles.ratingText}>★ {product.rating}</Text>
                <Image source={{ uri: product.image }} style={styles.verticalCardImage} />
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.verticalCardTitle}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <View style={styles.priceButtonContainer}>
                  <Text style={styles.verticalCardPrice}>{product.price}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    padding: 16,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  locationContainer: {
    flex: 1,
    marginRight: 10,
    marginBottom: 5,
  },
  locationText: {
    fontSize: 12,
    color: '#B7B7B7',
  },
  subLocationText: {
    fontSize: 16,
    color: '#DDDDDD',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#A0522D',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: '#000',
  },
  bottomImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  bottomImage: {
    width: '100%',
    height: 140,
    borderRadius: 16,
  },
  promoTextContainer: {
    position: 'absolute',
    top: 10,
    left: '10%',
    padding: 10,
  },
  promoTitle: {
    backgroundColor: '#ED5151',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  promoSubtitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: -2,
  },
  recommendationsContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
    marginBottom: 20,
  },
  recommendationItem: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  hovered: {
    backgroundColor: '#A0522D',
  },
  cardsScrollView: {
    marginVertical: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  verticalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  verticalCardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 14,
    color: '#Ffd700',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  cardDetails: {
    marginTop: 10,
  },
  verticalCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  priceButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  verticalCardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ED5151',
  },
  addButton: {
    backgroundColor: '#A0522D',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});

export default App;