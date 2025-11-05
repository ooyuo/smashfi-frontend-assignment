# SmashFi Coin List

CoinGecko API를 활용한 실시간 암호화폐 시세 조회 애플리케이션

## 🚀 실행 방법

```bash
# 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 테스트
npm test
```

**환경 변수**: `.env.development`, `.env.production` 파일 포함됨 (별도 설정 불필요)

## 🛠 기술 스택

- **React 18** + **TypeScript** + **Vite**
- **TanStack Query** - 서버 상태 관리
- **Zustand** - 클라이언트 상태 관리
- **TanStack Virtual** - 가상 스크롤
- **Tailwind CSS** + **shadcn/ui**
- **Vitest** + **Testing Library** - 테스트
- **ESLint** + **Prettier** + **Husky**

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
