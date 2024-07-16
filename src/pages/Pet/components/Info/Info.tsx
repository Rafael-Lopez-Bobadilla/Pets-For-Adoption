import { TPet } from "../../../../services/petfinderService/schemas/PetsSchema";
import { getContactData } from "./utils/getContactData";
import { getAboutData } from "./utils/getAboutData";
import { getMultiData } from "./utils/getMultiData";
import s from "./Info.module.css";
const Info = ({ data }: { data: TPet }) => {
  const contactData = getContactData(data);
  const aboutData = getAboutData(data);
  const multiData = getMultiData(data);
  const info = [
    { key: "Contact", fields: contactData },
    { key: "About", fields: aboutData },
  ];
  return (
    <div className={s.info}>
      {info.map((set) => (
        <div key={set.key} className={s.section}>
          <h3>{set.key}</h3>
          {set.fields.map(
            (field) =>
              field.value && (
                <p key={field.key}>
                  <span>{`${field.key}: `}</span>
                  {field.value}
                </p>
              )
          )}
        </div>
      ))}
      {multiData.map((field) => {
        const isValue = field.values.find((value) => value !== null);
        if (isValue)
          return (
            <p key={field.key}>
              <span>{`${field.key}: `}</span>
              {field.values.map(
                (value) => value && <li key={value}>{value}</li>
              )}
            </p>
          );
      })}
    </div>
  );
};

export default Info;
