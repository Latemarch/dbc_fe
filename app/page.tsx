import ChatRoom from "@/components/ChatRoom";
import SideBar from "@/components/SideBar";

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-between">
      <SideBar />
      <div className="flex w-full h-full justify-center items-center">
        <ChatRoom />
      </div>
    </div>
  );
}
