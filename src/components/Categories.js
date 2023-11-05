import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import { ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";

import sanityClient, { urlFor } from "../../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'category']
      `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {/* CAtegory Card */}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          url={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}

      
    </ScrollView>
  );
};

export default Categories;
