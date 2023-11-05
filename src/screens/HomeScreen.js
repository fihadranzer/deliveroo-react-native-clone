import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import sanityClient from "../../sanity";
import Categories from "../components/Categories";
import FeatureRow from "../components/FeatureRow";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  // const dist = async () => {
  //   const url ="https://9hxd0swb.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27featured%27%5D%7B%0A++...%2C%0A++restaurants%5B%5D-%3E%7B%0A++++...%2C+dishes%5B%5D-%3E%0A++%7D%0A%7D"
  //   let result = await fetch(url);
  //   result = await result.json();

  //   setFeaturedCategories(result);
  // };
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'featured']{
        ...,
        restaurants[]->{
          ..., dishes[]->
        }
      }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center space-x-2 mx-4">
        <Image
          source={{
            uri: "https://ik.imagekit.io/txh5evivcha5/Personal%20use/Logo-Testing-1__NCGHuEQk.png?updatedAt=1697529816696",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-lg">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={30} color="#00CCBB" />
      </View>
      {/* search view here  */}

      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row space-x-2 bg-gray-200 p-3 items-center flex-1">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants & cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsHorizontalIcon color="#00CCBB" />
      </View>

      {/* Body  */}

      <ScrollView
        className="bg-gray-100 "
        contentContainerStyle={{ paddingBottom: 150 }}>
        {/* Component of category */}
        <Categories />
        {/* Featured Rows */}

        {featuredCategories?.map((category) => (
          <FeatureRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
