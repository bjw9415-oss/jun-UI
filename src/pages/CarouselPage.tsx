import { useState, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
} from "../components/data-display/Carousel";
import { Card, CardContent } from "../components/data-display/Card";
import PageHeader from "../components/layout/PageHeader";
import CodeViewer from "../components/layout/CodeViewer";

export default function CarouselPage() {
  const [showArrows, setShowArrows] = useState(true);
  const [showIndicators, setShowIndicators] = useState(true);

  const slides = [
    {
      id: 1,
      title: "우주로의 도약",
      desc: "새로운 프론트엔드 세계를 탐험하세요.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "빛나는 성능",
      desc: "가볍고 빠른 렌더링 최적화를 경험하세요.",
      img: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "견고한 아키텍처",
      desc: "합성 컴포넌트 패턴으로 유연성을 극대화했습니다.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const usageExampleCode = useMemo(() => {
    return `import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext, 
  CarouselIndicators 
} from '../components/Carousel';

export default function BannerSlider() {
  return (
    <Carousel itemCount={3} className="w-full max-w-2xl">
      <CarouselContent>
        {/* 슬라이드 1 */}
        <CarouselItem>
          <div className="h-64 bg-gray-800 rounded-2xl flex items-center justify-center">
            Slide 1
          </div>
        </CarouselItem>
        {/* 슬라이드 2, 3... */}
      </CarouselContent>
      
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  );
}`;
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Carousel"
        description="여러 개의 이미지나 콘텐츠를 좌우로 슬라이드하며 넘겨볼 수 있는 동적 슬라이더 컴포넌트입니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px]">
            {/*  캐러셀 실제 렌더링 영역 */}
            <Carousel
              itemCount={slides.length}
              className="w-full max-w-2xl shadow-2xl shadow-black/50 rounded-2xl"
            >
              <CarouselContent>
                {slides.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <Card className="relative h-75 sm:h-100 w-full overflow-hidden border-gray-800/50">
                      <CardContent className="p-0 h-full">
                        {/* 배경 이미지 */}
                        <img
                          src={slide.img}
                          alt={slide.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* 어두운 그라데이션 오버레이 */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                        {/* 텍스트 콘텐츠 */}
                        <div className="absolute bottom-10 left-8 right-8 text-white">
                          <span className="inline-block px-3 py-1 bg-[#00a2ff]/20 text-[#00a2ff] border border-[#00a2ff]/30 rounded-full text-xs font-bold mb-3 backdrop-blur-md">
                            Featured 0{slide.id}
                          </span>
                          <h2 className="text-3xl font-extrabold mb-2">
                            {slide.title}
                          </h2>
                          <p className="text-gray-300 text-sm sm:text-base">
                            {slide.desc}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* 조종판에서 끄고 켤 수 있는 컨트롤러들 */}
              {showArrows && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
              {showIndicators && <CarouselIndicators />}
            </Carousel>
          </div>
        </div>

        {/* 조종판 영역 */}
        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Carousel Composer</h3>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-[#0a0d12] cursor-pointer hover:border-gray-600 transition-colors">
                <input
                  type="checkbox"
                  checked={showArrows}
                  onChange={(e) => setShowArrows(e.target.checked)}
                  className="w-4 h-4 accent-[#00a2ff]"
                />
                <span className="text-sm text-gray-300 font-medium">
                  Show Arrows (좌우 화살표)
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-[#0a0d12] cursor-pointer hover:border-gray-600 transition-colors">
                <input
                  type="checkbox"
                  checked={showIndicators}
                  onChange={(e) => setShowIndicators(e.target.checked)}
                  className="w-4 h-4 accent-[#00a2ff]"
                />
                <span className="text-sm text-gray-300 font-medium">
                  Show Indicators (하단 점)
                </span>
              </label>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              * CSS의{" "}
              <code className="text-[#00a2ff]">transform: translateX()</code>{" "}
              속성을 활용하여 브라우저의 GPU 가속을 받아 애니메이션이 매우
              부드럽게 작동합니다.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 px-1">
              <button className="text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors bg-[#161b22] text-[#00a2ff] border-t border-x border-gray-800">
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
