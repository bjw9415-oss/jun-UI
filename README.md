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

### 💡 Feedback & Overlay

- [ ] _Modal (예정)_

## 🚀 Getting Started

로컬 환경에서 프로젝트를 실행하는 방법입니다.

```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행
npm run dev
```
