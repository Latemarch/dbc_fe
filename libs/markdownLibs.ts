/**
 * 마크다운 요소 앞에 줄바꿈이 없으면 추가하는 정규화 함수
 */
export function normalizeMarkdown(text: string): string {
  if (!text) return text;

  let normalized = text;

  // 코드 블록을 임시로 마스킹하여 내부 내용을 보호
  const codeBlockRegex = /```[\s\S]*?```/g;
  const codeBlocks: string[] = [];
  let codeBlockIndex = 0;

  normalized = normalized.replace(codeBlockRegex, (match) => {
    const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
    codeBlocks[codeBlockIndex] = match;
    codeBlockIndex++;
    return placeholder;
  });

  // 인라인 코드를 임시로 마스킹
  const inlineCodeRegex = /`[^`]+`/g;
  const inlineCodes: string[] = [];
  let inlineCodeIndex = 0;

  normalized = normalized.replace(inlineCodeRegex, (match) => {
    const placeholder = `__INLINE_CODE_${inlineCodeIndex}__`;
    inlineCodes[inlineCodeIndex] = match;
    inlineCodeIndex++;
    return placeholder;
  });

  // 강조 문법을 임시로 마스킹 (**text**, *text*)
  // **text** (굵은 텍스트)
  const boldRegex = /\*\*[^*]+\*\*/g;
  const boldTexts: string[] = [];
  let boldIndex = 0;

  normalized = normalized.replace(boldRegex, (match) => {
    const placeholder = `__BOLD_${boldIndex}__`;
    boldTexts[boldIndex] = match;
    boldIndex++;
    return placeholder;
  });

  // *text* (기울임) - 단, **로 감싸지지 않은 경우만
  const italicRegex = /(?<!\*)\*[^*\n]+\*(?!\*)/g;
  const italicTexts: string[] = [];
  let italicIndex = 0;

  normalized = normalized.replace(italicRegex, (match) => {
    const placeholder = `__ITALIC_${italicIndex}__`;
    italicTexts[italicIndex] = match;
    italicIndex++;
    return placeholder;
  });

  // 제목 앞에 줄바꿈 추가 (#, ##, ###, ####, #####, ######)
  // 앞에 줄바꿈이 없는 경우에만 추가
  normalized = normalized.replace(/([^\n])(#{1,6}\s)/g, "$1\n$2");

  // 리스트 항목 앞에 줄바꿈 추가
  // - 리스트: 앞에 줄바꿈이 없고, 뒤에 공백이 있는 경우만
  normalized = normalized.replace(/([^\n])(-\s)/g, "$1\n$2");
  // + 리스트: 동일한 조건
  normalized = normalized.replace(/([^\n])(\+\s)/g, "$1\n$2");
  // * 리스트: 강조 문법이 마스킹되었으므로 안전하게 처리
  // * 뒤에 공백이 있는 경우만 리스트로 인식
  normalized = normalized.replace(/([^\n])(\*\s)/g, "$1\n$2");

  // 숫자 리스트 앞에 줄바꿈 추가 (1., 2., 등)
  normalized = normalized.replace(/([^\n])(\d+\.\s)/g, "$1\n$2");

  // 인용구 앞에 줄바꿈 추가 (>)
  normalized = normalized.replace(/([^\n])(>\s)/g, "$1\n$2");

  // 코드 블록 앞에 줄바꿈 추가 (```)
  normalized = normalized.replace(/([^\n])(```)/g, "$1\n$2");

  // 수평선 앞에 줄바꿈 추가 (---, ***)
  normalized = normalized.replace(/([^\n])(---|\*\*\*)/g, "$1\n$2");

  // 테이블 시작 앞에 줄바꿈 추가 (| 헤더 |)
  normalized = normalized.replace(/([^\n])(\|[^\n]*\|)/g, "$1\n$2");

  // 마스킹된 코드 블록 복원
  codeBlocks.forEach((codeBlock, index) => {
    normalized = normalized.replace(`__CODE_BLOCK_${index}__`, codeBlock);
  });

  // 마스킹된 인라인 코드 복원
  inlineCodes.forEach((inlineCode, index) => {
    normalized = normalized.replace(`__INLINE_CODE_${index}__`, inlineCode);
  });

  // 마스킹된 강조 문법 복원
  boldTexts.forEach((boldText, index) => {
    normalized = normalized.replace(`__BOLD_${index}__`, boldText);
  });

  italicTexts.forEach((italicText, index) => {
    normalized = normalized.replace(`__ITALIC_${index}__`, italicText);
  });

  return normalized;
}
