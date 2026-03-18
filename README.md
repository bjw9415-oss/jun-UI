# 🎨 Jun-UI

> **나만의 다크 테마 React + TS 컴포넌트 디자인 시스템**
> 외부 무거운 UI 라이브러리(MUI, Bootstrap 등)에 의존하지 않고, 처음부터 직접 설계하고 구축하는 커스텀 UI 컴포넌트 모음집입니다. (shadcn/ui 철학 지향)

## ✨ Features

- **Dark Theme First**: 세련된 다크 모드(`bg-[#0d1117]`)를 기본 배경으로 설계된 UI
- **Tailwind CSS v4**: 최신 Tailwind 엔진을 활용한 직관적이고 빠른 스타일링
- **Type-Safe**: TypeScript 기반의 엄격한 `interface` 설계로 완벽한 자동완성 지원
- **Flexible & Scalable**: `clsx`와 `tailwind-merge`를 결합한 `cn` 유틸리티로 자유로운 클래스 병합 지원
- **Modern Icons**: `lucide-react`를 활용한 깔끔하고 일관된 벡터 아이콘 적용
- **Interactive Playground (DX)**: 각 컴포넌트의 상태를 직접 조작하고, 설정값에 따라 실시간으로 진화하는 **실무 적용 예시 코드**를 제공하여 최고 수준의 개발자 경험(DX) 제공

## 🛠 Tech Stack

- **Core**: React, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Utils**: clsx, tailwind-merge

## 📦 Components

현재까지 구현된 컴포넌트 목록입니다. 홈페이지에서 도메인별(Buttons, Data Entry 등)로 분류된 인터랙티브 플레이그라운드를 확인할 수 있습니다.

### 🎯 Buttons (버튼류)

- [x] **Button**: 다양한 Variant(primary, outline, danger, ghost)와 Size를 지원하는 만능 버튼
- [x] **Icon Button**: Lucide 아이콘과 완벽하게 조화되는 실무형 둥근 버튼
- [x] **Image Button**: 커스텀 이미지 배경과 1:1 비율이 유지되는 반응형 버튼

### 📝 Data Entry (입력 폼)

- [x] **Input**: Left/Right 아이콘 슬롯과 에러 상태(Validation) UI를 완벽하게 지원하는 텍스트 입력창
- [x] **Textarea**: 브라우저의 기본 동작(Resize)과 React 상태(`rows`) 간의 충돌을 제어한 다중 텍스트 입력 영역
- [x] **Select**: 브라우저 기본 스타일을 탈피하고, 외부 클릭 감지(Click Outside) 로직을 탑재한 100% 커스텀 드롭다운
- [x] **Toggle**: 부드러운 슬라이딩 애니메이션(`translate-x`)과 웹 접근성(a11y)을 고려한 iOS 스타일 스위치
- [x] **Checkbox**: 다중 선택이나 약관 동의에 사용되며 커스텀 SVG 체크 애니메이션이 적용된 체크박스
- [x] **Radio**: Context API와 Compound Component 패턴을 활용하여 상태를 우아하게 공유하는 단일 선택 라디오 버튼

### 💡 Feedback & Overlay (피드백 및 오버레이)

- [x] **Modal**: `createPortal`을 활용하여 DOM 최상단에 렌더링되며, Scroll Lock과 ESC 닫기 등 접근성을 완벽 지원하는 팝업 창
- [x] **Toast**: Context API 기반으로 앱 전역에서 훅(`useToast`)으로 호출 가능하며, 다방향 위치 제어와 자동 소멸 로직이 적용된 알림창
- [x] **Drawer**: 화면의 4방향(상/하/좌/우)에서 부드럽게 밀려 들어오는 사이드 패널 (Modal 아키텍처 확장)
- [x] **Tooltip**: 절대 좌표 계산과 순수 CSS 화살표 트릭을 활용해 방향에 따라 동적으로 나타나는 말풍선 오버레이
- [ ] _Popover (예정)_: 툴팁과 유사하지만 폼이나 버튼 등 더 복잡한 상호작용을 포함할 수 있는 팝오버
- [ ] _Skeleton (예정)_: 데이터를 불러오는 동안 보여주는 세련된 로딩 뼈대 UI
- [ ] _Alert & Badge (예정)_: 화면 내에서 중요한 메시지를 띄우는 정적 경고창과 작은 상태 표시 뱃지

### 🧭 Navigation (탐색 및 메뉴) - _Upcoming_

- [ ] _Tabs (예정)_: 여러 화면을 하나의 컨테이너 안에서 전환할 수 있는 탭 메뉴
- [ ] _Pagination (예정)_: 대량의 목록을 여러 페이지로 나누어 탐색하는 페이지네이션
- [ ] _Breadcrumb (예정)_: 현재 페이지의 계층적 위치를 보여주는 경로 탐색 UI

### 📊 Data Display (데이터 표시) - _Upcoming_

- [ ] _Card (예정)_: 이미지, 제목, 본문, 액션 버튼을 일관되게 담아내는 컨테이너
- [ ] _Accordion (예정)_: 클릭하면 숨겨진 세부 내용이 부드럽게 펼쳐지는 접이식 패널
- [ ] _Avatar (예정)_: 사용자 프로필 이미지나 이니셜을 예쁘게 표시하는 컴포넌트
- [ ] _Carousel (예정)_: 여러 개의 이미지나 콘텐츠를 좌우로 슬라이드하며 넘겨볼 수 있는 동적 슬라이더

## 🚀 Getting Started

로컬 환경에서 프로젝트를 실행하는 방법입니다.

```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행
npm run dev
```
