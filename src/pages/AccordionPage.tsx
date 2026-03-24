import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/data-display";
import { PageHeader, CodeViewer } from "@/components/layout";

export default function AccordionPage() {
  const [type, setType] = useState<"single" | "multiple">("single");

  const usageExampleCode = useMemo(() => {
    return `import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '../components/Accordion';

export default function FAQ() {
  return (
    <Accordion type="${type}" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>접근성이 보장되나요?</AccordionTrigger>
        <AccordionContent>
          네. WAI-ARIA 디자인 패턴을 준수하여 설계되었습니다.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>스타일 커스텀이 가능한가요?</AccordionTrigger>
        <AccordionContent>
          물론입니다. Tailwind CSS 클래스를 넘겨주어 자유롭게 덮어씌울 수 있습니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;
  }, [type]);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Accordion"
        description="세로로 쌓인 패널들로 구성되어, 클릭 시 패널을 부드럽게 펼쳐 숨겨진 내용을 보여주는 컴포넌트입니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 미리보기 영역 */}
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-start p-8 sm:p-12 min-h-100 bg-[#0a0d12] bg-[radial-gradient(var(--border-default)_1px,transparent_1px)] bg-size-[16px_16px]">
            {/*  아코디언 실제 렌더링 */}
            <div className="w-full max-w-lg bg-[#161b22] border border-gray-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-white font-semibold mb-4 text-lg">
                자주 묻는 질문 (FAQ)
              </h3>

              {/* key에 type을 넣어서 모드가 바뀔 때마다 아코디언을 완전히 초기화합니다 */}
              <Accordion
                key={type}
                type={type}
                defaultValue="item-1"
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    접근성이 완벽히 보장되나요?
                  </AccordionTrigger>
                  <AccordionContent>
                    네. 화면 판독기(Screen Reader)와 키보드 내비게이션 등
                    WAI-ARIA 디자인 패턴의 권장 사항을 모두 준수하여
                    설계되었습니다. 누구나 차별 없이 사용할 수 있습니다.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    애니메이션 원리가 무엇인가요?
                  </AccordionTrigger>
                  <AccordionContent>
                    내부 콘텐츠의 높이를 동적으로 계산하기 위해, 최신{" "}
                    <strong>CSS Grid</strong> 속성인{" "}
                    <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">
                      grid-template-rows
                    </code>
                    를 활용했습니다. JS의 개입 없이 CSS 엔진만으로 부드럽게
                    동작합니다!
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger>
                    다른 프레임워크에서도 쓸 수 있나요?
                  </AccordionTrigger>
                  <AccordionContent>
                    현재 이 라이브러리는 React 생태계에 완전히 최적화되어
                    있습니다. 다만 Tailwind CSS 기반으로 스타일링 되었기 때문에
                    Vue나 Svelte로 마이그레이션 하는 것도 매우 쉽습니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* 조종판 영역 */}
        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">
              Accordion Settings
            </h3>

            <div className="space-y-3">
              <label className="text-sm text-gray-300">Type (동작 모드)</label>
              <div className="grid grid-cols-2 gap-2 bg-[#0a0d12] p-2 rounded-xl border border-gray-800">
                <button
                  onClick={() => setType("single")}
                  className={`text-sm font-medium py-2.5 rounded-lg transition-all ${type === "single" ? "bg-[#161b22] text-primary border border-primary/30 shadow-sm" : "text-gray-500 hover:text-gray-300 border border-transparent"}`}
                >
                  Single (하나만 열기)
                </button>
                <button
                  onClick={() => setType("multiple")}
                  className={`text-sm font-medium py-2.5 rounded-lg transition-all ${type === "multiple" ? "bg-[#161b22] text-primary border border-primary/30 shadow-sm" : "text-gray-500 hover:text-gray-300 border border-transparent"}`}
                >
                  Multiple (여러 개 열기)
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {type === "single"
                  ? "한 번에 하나의 패널만 열어둘 수 있습니다. 다른 패널을 열면 기존 패널이 닫힙니다."
                  : "원하는 만큼 여러 개의 패널을 동시에 열어둘 수 있습니다."}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 px-1">
              <button className="text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors bg-[#161b22] text-primary border-t border-x border-gray-800">
                실무 적용 예시 💡
              </button>
            </div>
            <CodeViewer code={usageExampleCode} />
          </div>
        </div>
      </div>
    </div>
  );
}
