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
