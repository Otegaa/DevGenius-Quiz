import LogoLanguages from "./LogoLanguages";
import Timer from "./Timer";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <LogoLanguages />
      <Timer />
    </header>
  );
};
export default Header;
