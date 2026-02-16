export async function getAddressAutocomplete(input: string) {
  const googleWindow = window as any;
  if (!googleWindow.google?.maps?.places?.AutocompleteSuggestion) {
    throw new Error("Google Maps Places API not loaded");
  }

  if (!input || input.length < 3) return [];

  const request = {
    input,
    includedRegionCodes: ["IN"], // India
  };

  const { suggestions } =
    await googleWindow.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
      request
    );

  return suggestions.map((item: any) => ({
    label: item.placePrediction.text.text,
    placeId: item.placePrediction.placeId,
  }));
}
