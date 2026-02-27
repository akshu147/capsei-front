export async function getAddressAutocomplete(input: string) {
  const googleWindow = window as any

  if (!googleWindow.google?.maps?.places) {
    return []
  }

  if (!input || input.length < 3) return []

  const request = {
    input,
    includedRegionCodes: ["IN"],
  }

  const { suggestions } =
    await googleWindow.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
      request
    )

  return (
    suggestions?.map((item: any) => ({
      label: item.placePrediction?.text?.text,
      placeId: item.placePrediction?.placeId,
    })) || []
  )
}
