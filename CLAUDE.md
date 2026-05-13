# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**고구마마켓** — 중고 물품을 사고팔 수 있는 웹 서비스.

## 기술 스택

- **Next.js** (App Router)
- **Supabase** (데이터베이스, 인증)
- **Tailwind CSS** (스타일링)
- **TypeScript**

## 개발 명령어

```bash
npm run dev       # 개발 서버 실행
npm run build     # 프로덕션 빌드
npm run lint      # ESLint 실행
npm run type-check  # TypeScript 타입 체크
```

## 아키텍처

App Router 기반 Next.js 프로젝트로, `src/app/` 디렉토리에서 라우팅을 관리한다.

- `src/app/` — 페이지 및 레이아웃 (App Router)
- `src/app/api/` — API Route Handlers
- `src/components/` — 공유 UI 컴포넌트
- `src/lib/` — Supabase 클라이언트, 유틸리티 함수
- `src/types/` — TypeScript 타입 정의

## Supabase MCP

Supabase MCP가 연결되어 있으므로 DB 스키마 변경, 데이터 조회, 마이그레이션 등은 MCP 도구를 통해 직접 수행한다. SQL 파일을 따로 만들지 않아도 된다.

## 주요 기능

- 상품 목록 (메인 페이지)
- 상품 등록 / 상세 / 수정 / 삭제
- 소셜 로그인 (카카오, 구글) — Supabase Auth 사용
- 결제 — 토스페이먼츠

## UI 규칙

- **언어**: 한국어 UI
- **가격 표시**: `₩10,000` 형태 (원화, 천 단위 콤마)
- **반응형**: 모바일 우선 설계 필수
- **디자인**: 깔끔하고 모던한 스타일
- **색상 테마**: 주황색 계열 (고구마 컨셉) — Tailwind `orange-*` 계열 사용
