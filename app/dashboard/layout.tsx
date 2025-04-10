"use client"
import SidebarItem from "../components/SidebarItem";
import { Provider } from 'react-redux'
import { store } from "../lib/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider  store={store}> 
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SidebarItem />
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </Provider>
  );
}