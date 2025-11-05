# SmashFi Coin List

CoinGecko API를 활용한 실시간 암호화폐 시세 조회 애플리케이션

## 🚀 실행 방법

```bash
# 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 테스트
pnpm test
```

**환경 변수**: `.env.development`, `.env.production` 파일 포함됨 (별도 설정 불필요)

> ⚠️ 실무에서는 API 키를 `.gitignore`에 추가하여 관리

## 🛠 기술 스택 및 선택 이유

### Core

- **React 18** - 컴포넌트 기반 UI 구성 및 효율적인 상태 관리
- **TypeScript** - 타입 안정성으로 런타임 에러 방지 및 IDE 자동완성 지원
- **Vite** - Webpack 대비 10배 빠른 개발 서버 및 빌드 속도

### 상태 관리

- **TanStack Query** - API 캐싱, 자동 리패칭, 무한 스크롤(useInfiniteQuery) 등 서버 상태 관리에 최적화
- **Zustand** - Redux 대비 보일러플레이트 적고 간단한 API로 즐겨찾기/탭 같은 클라이언트 상태 관리

### UI/UX

- **TanStack Virtual** - 수천 개의 코인 데이터도 버벅임 없이 렌더링 (가상화로 DOM 노드 최소화)
- **Tailwind CSS** - 유틸리티 클래스로 빠른 스타일링, 번들 사이즈 최적화 (미사용 CSS 제거)
- **shadcn/ui** - Radix UI 기반으로 접근성(ARIA) 기본 지원, 커스터마이징 용이

### 테스트 & 품질

- **Vitest** - Vite와 동일한 설정 공유, Jest 대비 빠른 실행 속도
- **Testing Library** - 구현 세부사항이 아닌 사용자 동작 중심 테스트
- **ESLint** + **Prettier** - 팀 코드 일관성 유지 및 잠재적 버그 사전 방지
- **Husky** - 커밋 전 자동 lint/format으로 품질 저하 방지

## 📁 프로젝트 구조

FSD (Feature-Sliced Design) 아키텍처 적용

```
src/
├── app/          # 앱 초기화, 프로바이더
├── pages/        # 페이지 컴포넌트
├── features/     # 기능 단위 (검색, 정렬, 즐겨찾기)
├── entities/     # 도메인 엔티티 (coin)
└── shared/       # 공통 UI, 유틸리티
```

## ✨ 주요 기능

### 필수 구현 사항

- ✅ CoinGecko API 연동
- ✅ 라우팅 (`/` → `/coin-list`)
- ✅ All / My favorite 탭
- ✅ 검색 (심볼/이름, 디바운스)
- ✅ 코인 정보 표시 (이미지, 가격, 변동률, 거래량, 시가총액)
- ✅ 즐겨찾기 (토스트 알림, localStorage 저장)
- ✅ 정렬 (Price, 24h Change, Volume, Market Cap)

### 추가 구현

- 🚀 **무한 스크롤** - TanStack Query useInfiniteQuery
- 🎨 **가상 스크롤** - TanStack Virtual (대용량 데이터 최적화)
- 💾 **상태 관리** - Zustand (favorites, tabs, search, sort)
- 📱 **반응형 디자인** - Tailwind CSS
- ⚡ **성능 최적화** - React.memo, 디바운스
- 🎭 **UI 시스템** - shadcn/ui
- 🧪 **테스트** - Vitest, Testing Library
- 🔧 **코드 품질** - ESLint, Prettier, Husky

## 💭 개선 가능한 부분

- E2E 테스트 (Playwright)
- 다크모드 토글 UI

## 🤖 AI 활용

**Claude Code (Claude Sonnet 4.5)** 사용

### 활용 내역

- 코드 리뷰 및 리팩토링 제안
- README 작성 지원
- Tanstack Query Option 작성 지원
- 테스트 코드 작성
