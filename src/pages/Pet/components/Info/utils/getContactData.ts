import { TPet } from "../../../../../services/petfinderService/schemas/PetsSchema";

export const getContactData = (pet: TPet) => {
  return [
    {
      key: "Email",
      value: pet.contact.email,
    },
    {
      key: "Phone",
      value: pet.contact.phone,
    },
    {
      key: "Address 1",
      value: pet.contact.address.address1,
    },
    {
      key: "Address 2",
      value: pet.contact.address.address2,
    },
    {
      key: "City",
      value: pet.contact.address.city,
    },
    {
      key: "State",
      value: pet.contact.address.state,
    },
    {
      key: "Country",
      value: pet.contact.address.country,
    },
    {
      key: "Postcode",
      value: pet.contact.address.postcode,
    },
  ];
};
