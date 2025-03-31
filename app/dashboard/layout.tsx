import SidebarItem from "../components/SidebarItem";
import { ChatProvider } from "../services/context/ChatContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SidebarItem />
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </ChatProvider>
  );
}