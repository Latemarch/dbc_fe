import MarkdownContainer from "@/components/MarkdownContainer";

export default function Home() {
  const markdownContent = `# AI 챗 응답 예시

이것은 **마크다운** 형식의 AI 응답입니다.

## 코드 블록 예시

JavaScript 코드:

\`\`\`javascript
function greetUser(name) {
  return \`Hello, \${name}! Welcome to the AI Chat.\`;
}

const message = greetUser("사용자");
console.log(message);
\`\`\`

Python 코드:

\`\`\`python
def calculate_sum(numbers):
    """숫자 리스트의 합을 계산합니다."""
    return sum(numbers)

result = calculate_sum([1, 2, 3, 4, 5])
print(f"합계: {result}")
\`\`\`

## 리스트 예시

장점:
- 빠른 응답 시간
- 정확한 정보 제공
- 다양한 형식 지원

순서가 있는 목록:
1. 첫 번째 단계
2. 두 번째 단계
3. 세 번째 단계

## 인용문

> "코드는 사람이 읽을 수 있어야 하며, 우연히 컴퓨터에서 실행될 수 있어야 한다."
> 
> — 마틴 파울러

## 인라인 코드와 강조

이 컴포넌트는 \`MarkdownContainer\`를 사용하여 렌더링됩니다. **React**와 **TypeScript**로 구현되었습니다.

## 테이블

| 기능 | 설명 | 상태 |
|------|------|------|
| 코드 하이라이팅 | \`rehype-highlight\` 사용 | ✅ 완료 |
| GFM 지원 | \`remark-gfm\` 사용 | ✅ 완료 |
| 커스텀 스타일링 | Tailwind CSS 적용 | ✅ 완료 |

## 더 많은 정보

자세한 내용은 [문서](https://example.com)를 참고하세요.

---

이 마크다운은 AI 챗 응답에 사용됩니다.`;

  return (
    <div className="min-h-screen p-8">
      <MarkdownContainer content={markdownContent} />
    </div>
  );
}
