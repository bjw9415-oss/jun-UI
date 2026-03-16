# 🎨 Jun-UI

> **나만의 다크 테마 React + TS 컴포넌트 디자인 시스템**
> 외부 무거운 UI 라이브러리(MUI, Bootstrap 등)에 의존하지 않고, 처음부터 직접 설계하고 구축하는 커스텀 UI 컴포넌트 모음집입니다. (shadcn/ui 철학 지향)

## ✨ Features

- **Dark Theme First**: 세련된 다크 모드(`bg-[#0d1117]`)를 기본 배경으로 설계된 UI
- **Tailwind CSS v4**: 최신 Tailwind 엔진을 활용한 직관적이고 빠른 스타일링
- **Type-Safe**: TypeScript 기반의 엄격한 `interface` 설계로 완벽한 자동완성 지원
- **Flexible & Scalable**: `clsx`와 `tailwind-merge`를 결합한 `cn` 유틸리티로 자유로운 클래스 병합 지원
- **Modern Icons**: `lucide-react`를 활용한 깔끔하고 일관된 벡터 아이콘 적용

## 🛠 Tech Stack

- **Core**: React, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Utils**: clsx, tailwind-merge

## 📦 Components

현재까지 구현된 컴포넌트 목록입니다.

- [x] **Button**: 다양한 Variant(primary, outline, danger)와 Size를 지원하는 만능 버튼
- [x] **Icon Button**: Lucide 아이콘과 완벽하게 조화되는 실무형 버튼
- [ ] _Input (예정)_
- [ ] _Modal (예정)_

## 🚀 Getting Started

로컬 환경에서 프로젝트를 실행하는 방법입니다.

```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행
npm run dev
```
