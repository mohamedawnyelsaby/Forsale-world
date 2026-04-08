import React from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';

// Forsale Main UI Concept (High-Fidelity)
export default function ForsaleApp() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      {/* Header Section */}
      <View style={{ padding: 20, backgroundColor: '#FFF', elevation: 2 }}>
        <Text style={{ fontSize: 12, color: '#888' }}>Deliver to</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Current Location 📍</Text>
        
        <TextInput 
          placeholder="Search for stores or items (e.g. Panda)" 
          style={{ backgroundColor: '#F1F1F1', padding: 12, borderRadius: 10, marginTop: 15 }}
        />
      </View>

      <ScrollView pading={10}>
        {/* Banner Section */}
        <View style={{ margin: 15, height: 150, backgroundColor: '#FF5A00', borderRadius: 15, justifyContent: 'center', padding: 20 }}>
          <Text style={{ color: '#FFF', fontSize: 24, fontWeight: 'bold' }}>Forsale Special Offers</Text>
          <Text style={{ color: '#FFF' }}>Up to 50% Cashback</Text>
        </View>

        {/* Categories Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
          <CategoryItem title="Restaurants" icon="🍔" />
          <CategoryItem title="Supermarkets" icon="🛒" />
          <CategoryItem title="Pharmacy" icon="💊" />
        </View>

        {/* Popular Stores (Matching Hungerstation Design) */}
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Popular Near You</Text>
          <StoreCard name="Panda Supermarket" rating="4.9" time="25 min" delivery="Free" />
          <StoreCard name="Healthy Meals" rating="4.7" time="35 min" delivery="SAR 5" />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ height: 60, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <Text style={{ color: '#FF5A00', fontWeight: 'bold' }}>Home</Text>
        <Text>Orders</Text>
        <Text>Wallet</Text>
        <Text>Profile</Text>
      </View>
    </View>
  );
}

const CategoryItem = ({ title, icon }) => (
  <View style={{ alignItems: 'center' }}>
    <View style={{ width: 60, height: 60, backgroundColor: '#EEE', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>{icon}</Text>
    </View>
    <Text style={{ fontSize: 12, marginTop: 5 }}>{title}</Text>
  </View>
);

const StoreCard = ({ name, rating, time, delivery }) => (
  <TouchableOpacity style={{ backgroundColor: '#FFF', borderRadius: 15, marginBottom: 15, overflow: 'hidden', elevation: 1 }}>
    <View style={{ height: 120, backgroundColor: '#DDD' }} />
    <View style={{ padding: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
        <Text>⭐ {rating}</Text>
      </View>
      <Text style={{ color: '#888', fontSize: 12 }}>{time} • Delivery: {delivery}</Text>
    </View>
  </TouchableOpacity>
);
