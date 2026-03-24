# 🎨 Jun-UI

![Refactoring](https://img.shields.io/badge/Status-Refactoring_in_progress-FF8C00?style=for-the-badge&logo=codeigniter&logoColor=white)

> **나만의 다크 테마 React + TS 컴포넌트 디자인 시스템**
> 외부 무거운 UI 라이브러리(MUI, Bootstrap 등)에 의존하지 않고, 처음부터 직접 설계하고 구축하는 커스텀 UI 컴포넌트 모음집입니다. (shadcn/ui 철학 지향)

> **Notice**: 현재 컴포넌트 개발(Phase 1)을 성공적으로 마치고, 코드의 재사용성을 높이고 아키텍처를 단단하게 다지는 **대대적인 리팩토링 및 최적화(Phase 2)** 작업을 진행 중입니다! 🛠️

## 🛠 Refactoring Progress (Phase 2)

현재 진행 중인 리팩토링 및 최적화 작업 내역입니다.

- [x] **도메인별 폴더 구조화**: 비대해진 `components` 폴더를 6개의 도메인(`buttons`, `data-entry`, `feedback`, `navigation`, `data-display`, `layout`)으로 분류하여 아키텍처 및 DX 개선
- [x] **공통 로직 커스텀 훅 추출 (DRY 원칙)**:
  - `useScrollLock`: Modal, Drawer 등 오버레이 컴포넌트 렌더링 시 배경 스크롤 방지 로직 통합
  - `useEscapeKey`: a11y(웹 접근성)를 위한 ESC 키 닫기 이벤트 리스너 통합
  - `useClickOutside`: Select, Popover 등의 외부 클릭 감지 로직 통합 (초기 렌더링 `null` 방어 및 모바일 터치 이벤트 대응)
  - `useFocusTrap`: 오버레이 컴포넌트 내부로 키보드 탭(Tab) 이동을 가두는 포커스 트랩 로직 추가
- [x] **다형성(Polymorphism) 패턴 도입**:
  - `@radix-ui/react-slot`을 활용한 `asChild` 속성 구현 (`Button`, `Badge`, `Avatar` 적용)
  - 시각적 디자인과 HTML DOM 구조(역할)를 완벽하게 분리하여 렌더링 유연성 극대화
- [x] **타입스크립트(TS) 타입 정교화 및 중앙집권화**:
  - `src/types/ui.ts` 신설을 통한 공통 타입(`AsChildProp`, `Direction`, `StandardSize` 등) 단일 진실 공급원(SSOT) 구축
  - CVA `VariantProps` 역추론에 의존하던 오버레이 컴포넌트들을 순수 TypeScript 인터페이스로 전환하여 결합도 최소화
- [x] **웹 접근성(a11y) 전면 고도화 (WAI-ARIA 규격 준수)**:
  - `Drawer`, `Modal`, `Popover`: `useId`를 활용한 `aria-labelledby`, `aria-describedby` 동적 매핑 및 Focus Return(ESC 닫기 시 원래 트리거로 포커스 복귀) 로직 적용
  - `Tooltip`: `cloneElement` 흑마법을 활용하여 트리거 요소에 `aria-describedby` 자동 주입
  - `Toast`, `Alert`: `role="alert"`, `aria-live="assertive"`, `aria-atomic="true"` 속성을 부여하여 스크린 리더 즉각 반응 지원 및 불필요한 장식용 아이콘 스크린 리더 무시(`aria-hidden`) 처리
- [x] **모듈 내보내기 최적화 (Barrel Export)**: `index.ts` 및 절대 경로(`@/`)를 활용하여 깔끔하고 직관적인 Import 환경 구축

## Features

- **Dark Theme First**: 세련된 다크 모드(`bg-[#0d1117]`)를 기본 배경으로 설계된 UI
- **Tailwind CSS v4 & Animation**: 최신 Tailwind 엔진과 `tailwindcss-animate` 플러그인을 활용한 폭포수(Staggered) 등장 애니메이션 및 직관적인 스타일링
- **Global Theme Customization**: CSS 변수와 연동되어 실시간으로 메인 컬러(`primary`)를 변경할 수 있는 `ThemePicker` 및 다크/라이트 모드 전환 `ThemeToggle` 컴포넌트 제공
- **Type-Safe**: TypeScript 기반의 엄격한 `interface` 설계로 완벽한 자동완성 지원
- **Flexible & Scalable**: `clsx`와 `tailwind-merge`를 결합한 `cn` 유틸리티로 자유로운 클래스 병합 지원
- **Modern Icons**: `lucide-react`를 활용한 깔끔하고 일관된 벡터 아이콘 적용
- **Interactive Playground (DX)**: 각 컴포넌트의 상태를 직접 조작하고, 설정값에 따라 실시간으로 진화하는 **실무 적용 예시 코드 및 템플릿(Settings Dashboard 등)**을 제공하여 최고 수준의 개발자 경험(DX) 제공

## Tech Stack

- **Core**: React, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Utils**: clsx, tailwind-merge

## Components

현재까지 구현된 컴포넌트 목록입니다. 홈페이지에서 도메인별(Buttons, Data Entry 등)로 분류된 인터랙티브 플레이그라운드를 확인할 수 있습니다.

### Buttons (버튼류)

- [x] **Button**: 다양한 Variant(primary, outline, danger, ghost)와 Size를 지원하는 만능 버튼 (다형성 지원)
- [x] **Icon Button**: Lucide 아이콘과 완벽하게 조화되는 실무형 둥근 버튼
- [x] **Image Button**: 커스텀 이미지 배경과 1:1 비율이 유지되는 반응형 버튼

### Data Entry (입력 폼)

- [x] **Input**: Left/Right 아이콘 슬롯과 에러 상태(Validation) UI를 완벽하게 지원하는 텍스트 입력창
- [x] **Textarea**: 브라우저의 기본 동작(Resize)과 React 상태(`rows`) 간의 충돌을 제어한 다중 텍스트 입력 영역
- [x] **Select**: 브라우저 기본 스타일을 탈피하고, 외부 클릭 감지(Click Outside) 로직을 탑재한 100% 커스텀 드롭다운
- [x] **Toggle**: 부드러운 슬라이딩 애니메이션(`translate-x`)과 웹 접근성(a11y)을 고려한 iOS 스타일 스위치
- [x] **Checkbox**: 다중 선택이나 약관 동의에 사용되며 커스텀 SVG 체크 애니메이션이 적용된 체크박스
- [x] **Radio**: Context API와 Compound Component 패턴을 활용하여 상태를 우아하게 공유하는 단일 선택 라디오 버튼

### Feedback & Overlay (피드백 및 오버레이)

- [x] **Modal**: `createPortal`을 활용하여 DOM 최상단에 렌더링되며, Scroll Lock과 WAI-ARIA 접근성을 완벽 지원하는 팝업 창
- [x] **Toast**: Context API 기반으로 앱 전역에서 훅(`useToast`)으로 호출 가능하며, 다방향 위치 제어와 스크린 리더 반응(`aria-live`)이 적용된 알림창
- [x] **Drawer**: 화면의 4방향(상/하/좌/우)에서 부드럽게 밀려 들어오는 사이드 패널 (접근성 완벽 지원)
- [x] **Tooltip**: 절대 좌표 계산과 순수 CSS 화살표 트릭을 활용해 방향에 따라 동적으로 나타나는 말풍선 오버레이 (자동 ARIA 주입)
- [x] **Skeleton**: 데이터를 불러오는 동안 부드러운 깜빡임(Pulse) 애니메이션으로 대기 체감 시간을 줄여주는 로딩 뼈대 UI
- [x] **Alert & Badge**: 시스템의 상태나 메시지를 6가지 테마와 커스텀 아이콘으로 직관적으로 전달하는 경고창과 뱃지
- [x] **Popover**: 툴팁과 유사하지만 폼이나 버튼 등 더 복잡한 상호작용을 포함할 수 있으며, Focus Return 로직이 적용된 팝오버

### Navigation (탐색 및 메뉴)

- [x] **Tabs**: Context API를 활용해 상태를 공유하며, 동일한 공간에서 여러 섹션의 콘텐츠를 전환하는 합성 컴포넌트 탭 메뉴
- [x] **Pagination**: 동적 말줄임표(...) 알고리즘을 적용하여 대량의 데이터를 여러 페이지로 우아하게 나누어 탐색할 수 있는 네비게이션
- [x] **Breadcrumb**: 합성 컴포넌트 패턴으로 계층적 위치를 직관적으로 보여주며, 다양한 구분자와 생략(Ellipsis) 기능을 지원하는 경로 탐색 UI

### Data Display (데이터 표시)

- [x] **Avatar**: 사용자 프로필 이미지를 표시하며, 로드 실패 시 이니셜(Fallback)이나 기본 아이콘을 띄워주는 안정적인 UI (다형성 지원)
- [x] **Card**: 합성 컴포넌트(Compound Components) 패턴을 활용하여 Header, Content, Footer 영역을 레고처럼 조립하는 범용 컨테이너
- [x] **Accordion**: 순수 CSS Grid(`grid-rows-[1fr]`)를 활용하여 JS 개입 없이 부드럽게 펼쳐지는 다중/단일 제어 접이식 패널
- [x] **Carousel**: 외부 라이브러리 없이 Tailwind의 `transform`을 활용해 GPU 가속 기반의 부드러운 스와이프를 지원하는 고성능 커스텀 슬라이더

## 🚀 Getting Started

로컬 환경에서 프로젝트를 실행하는 방법입니다.

```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행
npm run dev
```

🚀 Next Steps (Roadmap)
Phase 3: DX 최적화 및 문서화 (Documentation & Testing)

- [x] Import 최적화: 절대 경로(@/) 설정 및 Barrel Export(index.ts) 패턴 적용 완료

- [x] Templates 제작: 디자인 시스템을 활용한 실제 페이지 레이아웃(Settings Dashboard) 예시 구현 완료

- [ ] 디자인 토큰(Design Token) 전면 도입: 모든 컴포넌트의 하드코딩된 색상을 light-dark() 기반의 시맨틱 변수(Semantic Variables)로 치환하여 완벽한 다크/라이트 모드 생태계 구축

- [ ] Storybook 도입: 컴포넌트별 인터랙티브 문서 및 카탈로그 구축

- [ ] Unit Testing: Jest + React Testing Library를 활용한 컴포넌트 안정성 검증

- [ ] NPM 패키지 배포: npm install jun-ui 환경 구축 (CI/CD 파이프라인 연동)
