import s from "./Header.module.css";
import logo from "../../assets/svgs/logo.svg";
import menu from "../../assets/svgs/menu.svg";
import close from "../../assets/svgs/close.svg";
import { useState } from "react";
import HeaderOptions from "./components/HeaderOptions/HeaderOptions";
import HeaderDropMenu from "./components/HeaderDropMenu/HeaderDropMenu";
import { Link } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <Link to={"/search"}>
          <div className={s.name}>
            <img src={logo} />
            <span>Pets For Adoption</span>
          </div>
        </Link>
        {!isOpen ? (
          <button className={s.button}>
            <img src={menu} onClick={() => setIsOpen(!isOpen)} />
          </button>
        ) : (
          <button className={s.button}>
            <img src={close} onClick={() => setIsOpen(!isOpen)} />
          </button>
        )}
        <HeaderOptions />
        {isOpen && <HeaderDropMenu setIsOpen={setIsOpen} />}
      </div>
    </header>
  );
};

export default Header;
