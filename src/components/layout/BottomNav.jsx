import { NavLink } from "react-router-dom";

export function BottomNav() {
  const itemClass = ({ isActive }) => "navitem" + (isActive ? " active" : "");
  return (
    <div className="bottomnav">
      <div className="bottomnav-inner">
        <NavLink to="/" className={itemClass}>
          <div>🏠</div><div>Գլխավոր</div>
        </NavLink>
        <NavLink to="/list/places" className={itemClass}>
          <div>🔎</div><div>Որոնում</div>
        </NavLink>
        <NavLink to="/contact" className={itemClass}>
          <div>🗺️</div><div>Կապ</div>
        </NavLink>
        <NavLink to="/about" className={itemClass}>
          <div>👤</div><div>Մեր մասին</div>
        </NavLink>
      </div>
    </div>
  );
}
