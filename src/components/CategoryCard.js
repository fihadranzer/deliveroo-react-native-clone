import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
const CategoryCard = ({ url, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image source={{ uri: url }} className="h-20 w-20" />
      <Text className="absolute bottom-1 font-bold text-white left-1">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
