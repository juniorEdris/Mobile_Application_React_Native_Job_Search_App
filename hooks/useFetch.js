import { useState, useEffect } from "react";
// import { RAPID_API_KEY } from "@env";
import axios from "axios";

const useFetch = (endpoint = "", id = "", query = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const options = {
    method: "GET",
    // url: `https://jsonplaceholder.typicode.com/${endpoint}`,
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      //   query: "Python developer in Texas, USA",
      //   page: "1",
      //   num_pages: "1",
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": "1b0ed4dfe7msh7feb7c34a24fea4p14342bjsnd66b45dd3695",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      // const res = await axios.request(options);
      const res = await axios.get(`https://fakestoreapi.com/${endpoint}`);

      // console.log({ res: res.data });
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return [data, error, isLoading, refetch];
};

export default useFetch;
