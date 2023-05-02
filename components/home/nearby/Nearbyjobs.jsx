import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hooks/useFetch";

const NearbyJobs = () => {
  const router = useRouter();
  const [data, error, isloading, refetch] = useFetch("products","", {
    query: "React Developer",
    //   page: "1",
    num_pages: "1",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Items</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isloading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong!</Text>
        ) : (
          data?.map((product) => (
            <NearbyJobCard
              product={product}
              key={`loved_prod-${product?.id}`}
              handleNavigate={() =>
                router.push(`/product-details/${product?.id}`)
              }
            />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
