import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import { ArrowRightIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../../sanity";

const FeatureRow = ({ id, title, description }) => {
  const [restaurnt, setRestaurant] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == 'featured' && _id == $id]{
      ...,
      restaurants[]->{
        ..., dishes[]->, 
        type->  {
          name
      }
    },
  }[0]
  `,
        { id }
      )
      .then((data) => {
        setRestaurant(data?.restaurants);
      });
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-gray-500 px-4 text-xs">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4">
        {/* RestaurantCards */}

        {restaurnt.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}

        {/* <RestaurantCard
          id={123}
          imgUrl="https://ik.imagekit.io/txh5evivcha5/Personal%20use/pexels-cottonbro-studio-5900773_KbdcXWy7c.jpg?updatedAt=1697540049424"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="123, Main Street"
          short_description="This is a short test description"
          dishes={[]}
          long={20}
          lat={0}
        /> */}
      </ScrollView>
    </View>
  );
};

export default FeatureRow;
