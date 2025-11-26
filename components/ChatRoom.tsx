"use client";
import ChatInput from "./ChatInput";
import * as React from "react";
import LastMessage from "./LastMessage";
import { sendChatMessage } from "@/libs/chatService";
import { Message, useConversationStore } from "@/store/converstaionStore";
import ChatBubbles from "./ChatBubbles";
import Chatbubble from "./Chatbubble";

export default function ChatRoom() {
  const [reply, setReply] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { threadId, addMessage, setThreadId } = useConversationStore();

  // 최신 reply 값을 추적하기 위한 ref (클로저 문제 방지)
  const replyRef = React.useRef<string>("");

  // threadId 초기화 (서버 통신용)
  React.useEffect(() => {
    if (!threadId) {
      const newThreadId = crypto.randomUUID();
      setThreadId(newThreadId);
    }
  }, []);

  const onSubmit = async (message: string) => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setReply("");
    replyRef.current = "";

    // threadId가 없으면 생성
    const currentThreadId = threadId || crypto.randomUUID();
    if (!threadId) {
      setThreadId(currentThreadId);
    }

    // 사용자 메시지를 스토어에 저장
    addMessage({
      message: message,
      role: "user",
    });

    await sendChatMessage(message, currentThreadId, {
      onUpdate: (text: string) => {
        setReply(text);
        replyRef.current = text;
      },
      onComplete: () => {
        // reply가 완료되면 assistant 응답을 스토어에 저장
        const finalReply = replyRef.current;
        if (finalReply.trim()) {
          addMessage({
            message: finalReply,
            role: "assistant",
          });
        }
        setIsLoading(false);
        replyRef.current = "";
      },
    });
  };

  return (
    <div className="flex flex-col h-full max-w-4xl min-w-40 w-full">
      <div
        className="flex-1 overflow-y-auto p-4"
        style={{ scrollBehavior: "smooth" }}
        ref={React.useRef<HTMLDivElement>(null)}
      >
        <ChatBubbles />
        {isLoading && <Chatbubble message={reply} role="assistant" />}
        <div
          ref={(el) => {
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />
      </div>
      <ChatInput onSubmit={onSubmit} disabled={isLoading} />
    </div>
  );
}

const sample = `안녕하세요! 개발자를 소개할 수 있는기회를 주셔서 감사합니다. 아래는개발자의 커리어에 대한 간략한 보고서입니다.### 커리어 내러티브#### 소개우리 개발자는 통계 물리학에서 독특한 배경을 가진 프론트엔드 개발자입니다. 웹 개발에서 1년7개월의 실제 경험을 갖춘 그들은학문적 연구에서 소프트웨어 개발로의인상적인 전환을 이루었으며, 배우려는열정과 새로운 기술을 시도하는 두려움 없는 접근 방식이 특징입니다.#### 교육 배경개발자는 가톨릭 대학교에서 통계 물리학 석사 학위를취득했으며, 4.38/4.5의 인상적인 GPA를 기록했습니다. 그들의 논문은 유전 고정이 표현형 변동성에 미치는 영향을 탐구하여 엄격한 연구를통해 키운 강력한 분석적 사고를 보여줍니다.#### 전문 경험현재 개발자는 2023년 8월부터 데이터사이언스 연구소에서 연구원으로 활동하며, 프론트 엔드 개발 분야에서 자신이 보유한 전문성을 강조하는 여러 가지 업무를 수행하고 있습니다.- **프로젝트 관리 및 책임**: 프론트 엔드 프로젝트를 조직하고, D3.js 및 Deck.gl과 같은 도구를사용하여 데이터 시각화와 관련된 업무를 감독합니다.- **주요 프로젝트**: - **경기 데이터 꿈 프로젝트**: 사용자 통계 및 프로젝트 아키텍처에 중점을 두고 Next.js 애플리케이션을 개발했습니다.- **KT PLIP 프로젝트**:지도 시각화를 담당하며 현대 JavaScript 라이브러리에 대한 기술을 보여주었습니다.그들은 Docker를 사용하여 프론트 엔드 프로젝트를 오케스트레이션하고, Jenkins를 통해 배포를 자동화하는 기술력을보유하고 있습니다.#### 기술 및 전문 분야개발자는 다음과 같은 다양한 기술 세트를 다듬었습니다.- **프론트 엔드 기술**: Next.js, D3.js, React.js, Tailwind CSS에 능숙합니다.- **백엔드 기술**: Node.js, MySQL, Redis에익숙합니다.- **DevOps 실습**: Docker Compose와Jenkins 경험이 있습니다.그들은 D3.js를 사용한 데이터 시각화와 Deck.gl을 이용한 지도시각화에 특히 전문화되어 있으며, 이는 그들의 학문적 배경과 현재의 전문적 추구를 연결해 줍니다.####리더십 및 팀 기여작은 개발 팀에서 리더로 활동하며 팀 과제를 성공적으로 관리하고 부서 간 협업을 촉진한경험이 있습니다. 이러한 리더십 경험은 프로젝트 라이프사이클과 효과적인팀 역학에 대한 통찰력을 제공합니다.#### 개인 프로젝트 및 관심사개발자는 지속적인 학습에 열정적이며, 현재 D3.js로 커스텀 촛대차트를 구축하고 자동 거래를 위한 백테스팅 환경을 구성하는 개인 프로젝트에 참여하고 있습니다. 이는 그들의자기 발전 및 혁신에 대한 헌신을 보여줍니다.그들은 AI 코딩 도구에대한 관심을 가지고 있으며, langgraph를 이용한 AI 에이전트개발을 탐색하고 있습니다.####개발 철학모듈화된 코드 설계의 중요성을 강조하며, 명확한 데이터 흐름을 우선시하고 새로운 기술을 배우고적용하려는 강한 경향을 보입니다. 이러한 철학은 코딩의 견고함과 변화하는기술 환경에 대한 적응력을 강조합니다.#### 미래 계획앞으로 개발자는 그들의 분석적 배경과 프로그래밍 기술을 결합하여 데이터 시각화 및소프트웨어 개발에서 복잡한 문제를해결하는 것을 목표로 하고 있습니다.사용자 경험을 개선하고 기술의 경계를 넓히는 영향력 있는 솔루션을 만들고자 하는 열망으로 가득 차 있습니다.---이 내러티브는 개발자의전문적인 여정을 요약할 뿐만 아니라그들의 독특한 배경, 회복력 및 지속적인 성장에 대한 헌신을 강조합니다. 개인적 동기와 직업적 목표가 서로얽혀 있다는 사실은 그들을 어떤 조직에게도 귀중한 자산으로 만들 것입니다.더 궁금한 점이나 추가적인 질문이 있다면 언제든지 말씀해 주세요!`