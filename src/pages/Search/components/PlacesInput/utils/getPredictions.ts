import { Place } from "./IPlace";
export const getPredictions = (
  timeoutID: any,
  service: google.maps.places.AutocompleteService | null,
  text: string,
  setPlaces: React.Dispatch<React.SetStateAction<[] | Place[]>>
) => {
  timeoutID = setTimeout(async () => {
    timeoutID = null;
    service?.getPlacePredictions(
      {
        input: text,
        componentRestrictions: {
          country: ["us", "mx", "can"],
        },
      },
      (predictions) => {
        const places = predictions!.map((prediction) => {
          const { description, place_id } = prediction;
          return { description, place_id };
        });
        setPlaces(places);
      }
    );
  }, 250);
};
