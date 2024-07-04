import s from "./Header.module.css";
import logo from "../../assets/svgs/logo.svg";
import Options from "./components/Options/Options";
import MobileOptions from "./components/MobileOptions/MobileOptions";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={s.header}>
      <nav>
        <Link to={"/search"}>
          <div className={s.name}>
            <img src={logo} />
            <span>Pets For Adoption</span>
          </div>
        </Link>
        <Options />
        <MobileOptions />
      </nav>
    </header>
  );
};

export default Header;
