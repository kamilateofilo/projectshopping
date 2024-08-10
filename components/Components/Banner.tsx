// src/components/Carousel.tsx
import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const banners = [
  'https://via.placeholder.com/800x300?text=Promo%C3%A7%C3%B5es+da+Semana+1',
  'https://via.placeholder.com/800x300?text=Promo%C3%A7%C3%B5es+da+Semana+2',
];

const Carousel: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  let scrollPosition = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      scrollPosition += width;
      if (scrollPosition >= width * banners.length) {
        scrollPosition = 0;
      }

      scrollViewRef.current?.scrollTo({ x: scrollPosition, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} 
        style={styles.scrollView}
      >
        {banners.map((banner, index) => (
          <Image
            key={index}
            source={{ uri: banner }}
            style={styles.bannerImage}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 150,
    marginVertical: 50,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  bannerImage: {
    width: width, 
    height: 150,
    resizeMode: 'cover',
    borderRadius: 20
  },
});

export default Carousel;
