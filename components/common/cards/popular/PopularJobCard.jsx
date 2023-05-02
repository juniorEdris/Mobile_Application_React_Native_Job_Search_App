import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL, prodPlaceholder } from "../../../../utils";


const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{ uri: checkImageURL(item?.image) ? item?.image : prodPlaceholder }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item?.title}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)}>{item?.category}</Text>
        <Text style={styles.companyName}>${item?.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
