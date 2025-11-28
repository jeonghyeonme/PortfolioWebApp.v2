# Tailwind CSS 스타일 미적용 문제 해결

이 문서는 React + Vite + Tailwind CSS 환경에서 스타일이 정상적으로 적용되지 않았던 문제의 해결 과정을 기록합니다.

## 1. 문제 증상

- `index.css`에 직접 작성한 커스텀 CSS 클래스(`.section-divider` 등)는 정상적으로 동작했으나, Tailwind CSS의 유틸리티 클래스(예: `grid`, `flex`, `bg-gray-800`, `text-white` 등)가 전혀 적용되지 않았음.
- 이로 인해 스크린샷 비교 시, 의도한 디자인과 달리 글꼴, 색상, 레이아웃이 모두 깨져 보이는 현상이 발생함.
- 브라우저 개발자 도구에서 확인 시, 해당 유틸리티 클래스에 대한 CSS 속성이 전혀 없는 것으로 나타남.

## 2. 진단 과정

1.  **`index.html` 확인:** 먼저 폰트(`Google Fonts`)나 아이콘(`Font Awesome`)을 불러오는 외부 스타일시트 `<link>` 태그가 누락되었는지 확인했으나, 정상적으로 포함되어 있었음.
2.  **`tailwind.config.js` 확인:** Tailwind가 스타일을 생성하기 위해 스캔해야 할 파일 경로를 지정하는 `content` 배열의 설정이 올바른지 확인했으나, `["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]`로 정상적으로 설정되어 있었음.
3.  **`main.tsx` 확인:** 애플리케이션의 진입점에서 `index.css` 파일을 불러오고 있는지(`import './index.css'`) 확인했으나, 해당 코드도 정상적으로 포함되어 있었음.
4.  **`postcss.config.js` 존재 여부 확인:** 위 단계들이 모두 정상이었기 때문에, Vite가 CSS를 처리하는 PostCSS 설정 자체의 누락을 의심함. 프로젝트 루트 디렉토리를 확인한 결과, `postcss.config.js` 파일이 존재하지 않는 것을 확인함.

## 3. 원인

**`postcss.config.js` 파일의 부재**

Vite는 CSS를 처리할 때 PostCSS를 사용합니다. `postcss.config.js` 파일이 없으면, Vite는 `index.css`에 포함된 `@tailwind` 지시문을 Tailwind CSS 및 Autoprefixer 플러그인으로 처리해야 한다는 사실을 알지 못합니다.

결과적으로 Tailwind의 유틸리티 클래스들이 실제 CSS 코드로 변환되지 않았고, `index.css`에 수동으로 추가한 커스텀 클래스만 스타일에 적용되었던 것입니다.

## 4. 해결 방법

프로젝트 루트에 아래 내용으로 `postcss.config.js` 파일을 생성하여 PostCSS가 Tailwind CSS를 사용하도록 명시적으로 설정해주었습니다.

```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

이후 Vite 개발 서버를 재시작하자 모든 Tailwind CSS 유틸리티 클래스가 정상적으로 적용되어 문제가 해결되었습니다.

---

# 실시간 편집 기능 개발 관련 트러블슈팅

### 1. API 호출 시 `404 Not Found` 오류 발생

- **증상:**
  - 특정 컴포넌트(예: `Header.tsx`)에서 Supabase 데이터를 불러올 때, 브라우저 콘솔에 `404 Not Found` 네트워크 오류가 표시됨.
  - 이로 인해 데이터가 화면에 표시되지 않음.

- **원인:**
  - 데이터베이스 스키마를 리팩토링하는 과정에서 테이블 이름이 변경되었으나 (예: `contents` -> `texts`), 프론트엔드 컴포넌트의 코드에는 이전 테이블 이름이 그대로 남아있었음.
  - 존재하지 않는 테이블에 API 요청을 보내면서 발생한 문제.

- **해결:**
  - API를 호출하는 모든 컴포넌트(`Header.tsx` 등)와 커스텀 훅(`useTextData.ts` 등)의 코드를 확인하여, `supabase.from('...')` 부분의 테이블 이름을 현재 DB 스키마와 일치하도록 수정.

---

### 2. 특정 섹션 진입 시 `406 Not Acceptable` 오류 발생

- **증상:**
  - `License.tsx`처럼 데이터가 아직 없는 섹션의 데이터를 불러올 때 `406 Not Acceptable` 네트워크 오류가 발생.

- **원인:**
  - Supabase 클라이언트의 `.single()` 메소드는 쿼리 결과가 정확히 **하나**일 것을 기대함.
  - 하지만 데이터가 없는 경우 결과가 **0개**이므로, "요청을 수용할 수 없음"이라는 의미의 `406` 오류를 반환했음.
  - 처음에는 데이터 중복을 의심했으나, 실제 원인은 '데이터 없음' 케이스를 처리하지 못한 것이었음.

- **해결:**
  - 데이터 조회 로직을 담당하는 커스텀 훅(`useSectionData`, `useTextData`)에서 `.single()` 메소드를 제거.
  - 일반 `.select()`를 사용하여 데이터가 없을 경우 오류 대신 **빈 배열(`[]`)**을 반환받도록 로직을 수정함.
  - 이를 통해 데이터가 없는 섹션도 네트워크 오류 없이 정상적으로 처리할 수 있게 됨.

---

### 3. 무한 로딩 및 콘텐츠 깜빡임(Flickering) 현상

- **증상:**
  - 페이지 로드 후 스켈레톤 로딩 UI가 사라지지 않거나, 콘텐츠가 나타났다가 사라지기를 반복하며 깜빡이는 현상 발생.

- **원인:**
  - 컴포넌트가 렌더링될 때마다 `useSectionData`와 같은 커스텀 훅에 전달되는 `defaultData` 객체 또는 배열이 **매번 새로 생성**되었음.
  - 커스텀 훅의 `useEffect`는 이 `defaultData`를 의존성 배열에 포함하고 있었음.
  - React는 렌더링마다 새로운 참조값을 가진 `defaultData`를 '변경'으로 감지하여, `useEffect`를 무한정 재실행시켰고, 이로 인해 로딩 상태가 계속 `true`로 리셋되면서 무한 루프 발생.

- **해결:**
  - 모든 컴포넌트에서 `defaultData`로 사용되는 객체와 배열을 컴포넌트 함수 **바깥으로** 옮겨서 선언함.
  - 이를 통해 `defaultData`가 앱 생명주기 동안 단 한 번만 생성되도록 하여, 불필요한 `useEffect` 재실행을 막고 무한 루프를 해결함.