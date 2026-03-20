import * as React from "react";
import { cn } from "../shared/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Context 설정: 현재 몇 번째 슬라이드인지, 총 몇 개인지를 공유
interface CarouselContextProps {
  currentIndex: number;
  itemCount: number;
  goToNext: () => void;
  goToPrev: () => void;
  goToIndex: (index: number) => void;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

// 최상위 부모: 상태 관리 및 로직
export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  itemCount: number; // 점(Indicator)을 그리고 한계점을 알기 위해 총 개수를 받습니다.
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ itemCount, className, children, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const goToNext = React.useCallback(() => {
      setCurrentIndex((prev) => (prev + 1 >= itemCount ? 0 : prev + 1));
    }, [itemCount]);

    const goToPrev = React.useCallback(() => {
      setCurrentIndex((prev) => (prev - 1 < 0 ? itemCount - 1 : prev - 1));
    }, [itemCount]);

    const goToIndex = React.useCallback((index: number) => {
      setCurrentIndex(index);
    }, []);

    return (
      <CarouselContext.Provider
        value={{ currentIndex, itemCount, goToNext, goToPrev, goToIndex }}
      >
        <div ref={ref} className={cn("relative w-full", className)} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const useCarousel = () => {
  const context = React.useContext(CarouselContext);
  if (!context)
    throw new Error("useCarousel must be used within a <Carousel />");
  return context;
};

// 슬라이드들이 담기는 영역
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { currentIndex } = useCarousel();

  return (
    <div className="overflow-hidden rounded-2xl">
      <div
        ref={ref}
        className={cn(
          "flex transition-transform duration-500 ease-in-out",
          className,
        )}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // 🌟 핵심 애니메이션 마법!
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

//  개별 슬라이드 (무조건 화면 너비의 100%를 차지하도록 설정)
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

// 이전/다음 버튼
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { goToPrev } = useCarousel();
  return (
    <button
      ref={ref}
      onClick={goToPrev}
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#161b22]/80 border border-gray-700 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-[#00a2ff] hover:border-[#00a2ff]",
        className,
      )}
      {...props}
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { goToNext } = useCarousel();
  return (
    <button
      ref={ref}
      onClick={goToNext}
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#161b22]/80 border border-gray-700 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-[#00a2ff] hover:border-[#00a2ff]",
        className,
      )}
      {...props}
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

// 하단 인디케이터
const CarouselIndicators = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { currentIndex, itemCount, goToIndex } = useCarousel();

  return (
    <div
      ref={ref}
      className={cn(
        "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2",
        className,
      )}
      {...props}
    >
      {Array.from({ length: itemCount }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => goToIndex(idx)}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            currentIndex === idx
              ? "w-6 bg-[#00a2ff]"
              : "w-2 bg-white/30 hover:bg-white/50",
          )}
        />
      ))}
    </div>
  );
});
CarouselIndicators.displayName = "CarouselIndicators";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
};
