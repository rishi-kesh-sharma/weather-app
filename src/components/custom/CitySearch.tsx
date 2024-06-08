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
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; id: string; latitude: number; longitude: number }[]
  >([]);
  const { data } = useGetCitiesQuery({
    namePrefix: searchTerm,
  });

  const prefetchCities = usePrefetch(`getCities`);
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
  const debouncedFetchSuggestions = debounce(fetchSuggestions, 1000);
  const handleOnSearch = (string: string) => {
    setSearchTerm(string);
    debouncedFetchSuggestions(string);
  };

  const handleOnSelect = (item: any) => {
    console.log("Selected:", item);
    setCurrentCoordinates({
      lat: item.latitude,
      lon: item.longitude,
    });
  };

  const handleOnHover = (item: any) => {
    console.log("Hovered:", item);
  };

  const handleOnFocus = () => {
    console.log("The search input is focused");
  };

  const handleOnClear = () => {
    console.log("The search input is cleared");
    setSuggestions([]);
  };

  useEffect(() => {
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
  console.log(data, "data");
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
