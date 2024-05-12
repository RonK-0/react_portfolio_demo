import { useQuery } from "@tanstack/react-query";
import { queryData } from '../helpers/queryData';

// Queries hook
const useQueryData = (endpoint, method, key = "", fd = {}, id = null) => {
    return useQuery({
      queryKey: [key, id],
      queryFn: () => queryData(endpoint, method, fd),
  
      // retry: false,
      // refetchOnWindowFocus: true,
      // cacheTime: 200,
    });
  };
  
  export default useQueryData;
