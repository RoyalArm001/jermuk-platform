import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";

export function Shell() {
  const { pathname } = useLocation();

  let title = "Jermuk Travel";
  if (pathname.startsWith("/list/")) title = "Ցանկ";
  if (pathname.startsWith("/place/")) title = "Տեղեկություն";
  if (pathname.startsWith("/about")) title = "Մեր մասին";
  if (pathname.startsWith("/contact")) title = "Կապ";

  return (
    <>
      <TopBar title={title} />
      <main className="container">
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}
