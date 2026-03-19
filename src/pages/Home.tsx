import { Link } from "react-router-dom";
import {
  MousePointerClick,
  Zap,
  Image as ImageIcon,
  Type,
  AlignLeft,
  AppWindow,
  ListFilter,
  ToggleRight,
  CheckSquare,
  CircleDot,
  Bell,
  PanelRight,
  MessageCircle,
  type LucideIcon,
  LayoutTemplate,
  Loader,
} from "lucide-react";

interface ComponentItem {
  name: string;
  path: string;
  icon: LucideIcon;
  desc: string;
  disabled?: boolean;
}

interface ComponentCategory {
  title: string;
  description: string;
  items: ComponentItem[];
}
const componentCategories: ComponentCategory[] = [
  {
    title: " Buttons (버튼류)",
    description: "사용자의 클릭 액션을 유도하는 컴포넌트들입니다.",
    items: [
      {
        name: "Button",
        path: "/buttons",
        icon: MousePointerClick,
        desc: "가장 기본적인 형태의 버튼",
      },
      {
        name: "Icon Button",
        path: "/icon-buttons",
        icon: Zap,
        desc: "아이콘이 포함된 강조형 버튼",
      },
      {
        name: "Image Button",
        path: "/image-button",
        icon: ImageIcon,
        desc: "이미지 배경과 비율이 유지되는 버튼",
      },
    ],
  },
  {
    title: " Data Entry (입력 폼)",
    description: "사용자로부터 텍스트나 데이터를 입력받는 컴포넌트들입니다.",
    items: [
      {
        name: "Input",
        path: "/inputs",
        icon: Type,
        desc: "짧은 텍스트나 비밀번호, 이메일 입력창",
      },
      {
        name: "Textarea",
        path: "/textarea",
        icon: AlignLeft,
        desc: "여러 줄의 긴 텍스트를 입력받는 영역",
      },
      {
        name: "Select",
        path: "/select",
        icon: ListFilter,
        desc: "목록에서 하나의 값을 고르는 드롭다운",
      },
      {
        name: "Toggle",
        path: "/toggle",
        icon: ToggleRight,
        desc: "설정을 켜고 끄는 스위치",
      },
      {
        name: "Checkbox",
        path: "/checkbox",
        icon: CheckSquare,
        desc: "다중 선택이나 약관 동의를 위한 체크박스",
      },
      {
        name: "Radio",
        path: "/radio",
        icon: CircleDot,
        desc: "여러 옵션 중 단 하나의 값만 선택해야 할 때 사용하는 컴포넌트",
      },
    ],
  },
  {
    title: " Feedback & Overlay",
    description:
      "사용자에게 상태를 알려주거나 화면 위에 띄우는 컴포넌트들입니다.",
    items: [
      {
        name: "Modal",
        path: "/modal",
        icon: AppWindow,
        desc: "화면 중앙에 뜨는 팝업 창",
      },
      {
        name: "Toast",
        path: "/toast",
        icon: Bell,
        desc: "화면 모서리에 나타났다 사라지는 알림 메세지",
      },
      {
        name: "Drawer",
        path: "/drawer",
        icon: PanelRight,
        desc: "화면 가장자리에서 부드럽게 밀려 들어오는 사이드 패널",
      },
      {
        name: "Tooltip",
        path: "/tooltip",
        icon: MessageCircle,
        desc: "버튼이나 아이콘 위에 마우스를 올리면 나타나는 작은 말풍선",
      },
      {
        name: "Popover",
        path: "/popover",
        icon: LayoutTemplate,
        desc: "클릭 시 폼이나 메뉴 등 복잡한 컨텐츠를 띄우는 오버레이 카드",
      },
      {
        name: "Skeleton",
        path: "/skeleton",
        icon: Loader,
        desc: "데이터를 불러오는 동안 보여주는 세련된 로딩 뼈대 UI",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-24 px-6">
      {/* 1. 헤더 영역 */}
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00a2ff] to-[#1EC800] mb-6 tracking-tight">
          Jun-UI
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          나만의 다크 테마 React 컴포넌트 라이브러리.
          <br />
          아름답고 재사용 가능한 UI 부품들을 모아두는 공간입니다.
        </p>
      </div>

      {/* 2. 카테고리별 컴포넌트 리스트 영역 */}
      <div className="w-full max-w-5xl flex flex-col gap-12">
        {componentCategories.map((category, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            {/* 카테고리 제목 */}
            <div className="border-b border-gray-800 pb-2">
              <h2 className="text-2xl font-bold text-white mb-1">
                {category.title}
              </h2>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>

            {/* 카드 그리드 (반응형: 모바일 1칸, 태블릿 2칸, PC 3칸) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item, itemIdx) => {
                const Icon = item.icon;

                // 아직 준비 중인 컴포넌트는 클릭 안 되게 처리
                if (item.disabled) {
                  return (
                    <div
                      key={itemIdx}
                      className="bg-[#161b22]/50 border border-gray-800/50 rounded-xl p-5 flex flex-col gap-3 opacity-50 cursor-not-allowed"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#0d1117] flex items-center justify-center border border-gray-800">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                }

                // 정상 컴포넌트 링크 카드
                return (
                  <Link
                    key={itemIdx}
                    to={item.path}
                    className="group bg-[#161b22] border border-gray-800 rounded-xl p-5 flex flex-col gap-3 hover:border-[#00a2ff] hover:bg-[#1c222b] hover:shadow-[0_0_20px_rgba(0,162,255,0.1)] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0d1117] group-hover:bg-[#00a2ff]/10 flex items-center justify-center border border-gray-800 group-hover:border-[#00a2ff]/30 transition-colors">
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#00a2ff] transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1 group-hover:text-[#00a2ff] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
