import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import axios from "axios";

const ProductDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [productDetails, setProductDetails] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("About");

  const tabs = ["About", "Qualifications", "Responsibilities"];

  const fetchData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${params.id}`
      );
      setProductDetails(res?.data);
      setIsLoading(false);
      // .then((data) => {
      //   console.log({ x: data?.data });
      //   console.log("fetchData success");
      // })
      // .catch((err) => {
      // });
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={productDetails?.rating?.rate ?? ["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout info={productDetails?.description ?? "No data provided"} />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={productDetails?.categories ?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    fetchData();
    console.log("fetchData");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => {
                router.back();
              }}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "Details",
          headerTitleAlign: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : !productDetails ? (
              <Text>No data available</Text>
            ) : (
              <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <Company
                  companyLogo={productDetails?.image}
                  jobTitle={productDetails?.title ?? "demo"}
                  companyName={productDetails?.category ?? "demo cat"}
                  location={productDetails?.price ?? "demo price"}
                />

                {/* <JobTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  /> */}

                {/* {displayTabContent()} */}
              </View>
            )}
          </ScrollView>
        </View>
      </Stack.Screen>
    </SafeAreaView>
  );
};

export default ProductDetails;
