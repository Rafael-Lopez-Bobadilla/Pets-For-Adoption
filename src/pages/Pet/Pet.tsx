import s from "./Pet.module.css";
import { useParams } from "react-router-dom";
import { usePetfinderToken } from "../../context/TokenProvider/TokenProvider";
import { Pet as IPet } from "../Search/components/SearchBody/PetList/utils/IPets";
import Photos from "./components/Photos/Photos";
import FavButton from "../../components/FavButton/FavButton";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
const Pet = () => {
  const { token } = usePetfinderToken();
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const res = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data.animal as IPet;
    },
    enabled: token ? true : false,
  });
  const getString = () => {
    let str = data?.tags.reduce((tag, current) => `${current}, ${tag}`);
    if (data?.attributes.house_trained) str = `${str}, House trained`;
    return str;
  };
  return (
    <div className={s.wrapper}>
      {isPending && (
        <div className={s.loading}>
          <CircularProgress size={30} />
        </div>
      )}
      {data && (
        <>
          <Photos pet={data} />
          <div className={s.info}>
            <div className={s.name}>
              <h2>{data.name}</h2>
              <FavButton id={data.id} background="#e6dede" />
            </div>
            <h3>Contact</h3>
            <p>
              <span>Email:</span> {data.contact.email}
            </p>
            {data.contact.phone && (
              <p>
                <span>Phone:</span> {data.contact.phone}
              </p>
            )}
            {data.contact.address.address1 && (
              <p>
                <span>Address 1:</span> {data.contact.address.address1}
              </p>
            )}
            {data.contact.address.address2 && (
              <p>
                <span>Address 2:</span> {data.contact.address.address2}
              </p>
            )}
            <p>
              <span>Postcode:</span> {data.contact.address.postcode}
            </p>
            <p>
              <span>City:</span> {data.contact.address.city}
            </p>
            <p>
              <span>State:</span> {data.contact.address.state}
            </p>
            <p>
              <span>Country:</span> {data.contact.address.country}
            </p>
            <h3>About</h3>
            <p>
              <span>Breed:</span> {data.breeds.primary}
            </p>
            <p>
              <span>Gender:</span> {data.gender}
            </p>
            <p>
              <span>Age:</span> {data.age}
            </p>
            {data.tags.length > 0 && (
              <p>
                <span>Characteristics:</span>
                {` ${getString()}`}
              </p>
            )}
            {data.coat && (
              <p>
                <span>Coat length:</span> {data.coat}
              </p>
            )}
            <p>
              <span>Color:</span> {data.colors.primary}
            </p>
            <p>
              <span>Species:</span> {data.species}
            </p>
            <p>
              <span>Size:</span> {data.size}
            </p>
            <p>
              <span>Health:</span>
              {data.attributes.shots_current && (
                <li>Vaccinations up to date</li>
              )}
              {data.attributes.spayed_neutered && <li>spayed / neutered</li>}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Pet;
