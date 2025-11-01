import ChatRoom from "@/components/ChatRoom";
import LeftSide from "@/components/LeftSide";

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-between">
      <LeftSide />
      <div className="flex w-full h-full justify-center items-center">
        <ChatRoom />
      </div>
    </div>
  );
}
