import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../utils";

const NearByJobCard = ({ product, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(product?.image)
              ? product?.image
              : prodPlaceholder,
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={{flexDirection:'column'}}>
        <View>
          <Text style={styles.companyName} numberOfLines={2}>
            {product?.title}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.jobName} numberOfLines={1}>
            {product?.category}
          </Text>

          <Text style={styles.jobType}>$ {product?.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearByJobCard;
