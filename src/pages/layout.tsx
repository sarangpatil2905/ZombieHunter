import { Outlet } from "react-router-dom";

export default function LandingLayout() {
  return (
    <div className="font-sans antialiased">
      <Outlet />

    </div>
  );
}