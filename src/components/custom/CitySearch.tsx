/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { debounce } from "lodash";
import { useGetCitiesQuery, usePrefetch } from "@/redux/services/city";

const CitySearch = ({
  setCurrentCoordinates,
}: {
  setCurrentCoordinates: ({ lat, lon }: { lat: number; lon: number }) => void;
}) => {
  // search term state
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; id: string; latitude: number; longitude: number }[]
  >([]);

  // get cities query
  const { data } = useGetCitiesQuery({
    namePrefix: searchTerm,
  });

  // prefetch for get cities query
  const prefetchCities = usePrefetch(`getCities`);

  // callback to fetch cities suggestions
  const fetchSuggestions = useCallback(
    async (searchTerm: string) => {
      try {
        prefetchCities(
          { namePrefix: searchTerm },
          { force: false, ifOlderThan: 200 }
        );

        // setSuggestions(data); // Assuming the API returns an array of suggestions
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    },
    [prefetchCities]
  );

  // debounce fetch suggestion
  const debouncedFetchSuggestions = debounce(fetchSuggestions, 1000);
  const handleOnSearch = (string: string) => {
    setSearchTerm(string);
    debouncedFetchSuggestions(string);
  };

  // on cities select
  const handleOnSelect = (item: any) => {
    //set the current coordinates
    setCurrentCoordinates({
      lat: item.latitude,
      lon: item.longitude,
    });
  };

  // handle on city hovered in suggestions
  const handleOnHover = (item: any) => {
    console.log("Hovered:", item);
  };

  // handle on city focus
  const handleOnFocus = () => {
    console.log("The search input is focused");
  };

  // on clear search input
  const handleOnClear = () => {
    console.log("The search input is cleared");
    setSuggestions([]);
  };

  // set suggestions state every time data changes
  useEffect(() => {
    // normalize the data from api
    const normalizedData =
      data &&
      data.data &&
      data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
        };
      });
    if (normalizedData) {
      setSuggestions(normalizedData);
    }
  }, [data]);
  return (
    <div className="w-full m-auto">
      <ReactSearchAutocomplete
        items={suggestions}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        onHover={handleOnHover}
        onFocus={handleOnFocus}
        onClear={handleOnClear}
        placeholder="Type to search"
      />
    </div>
  );
};

export default CitySearch;
