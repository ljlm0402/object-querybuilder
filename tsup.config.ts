import { defineConfig } from 'tsup';

export default defineConfig({
  // 진입점
  entry: ['lib/index.ts'],
  
  // 출력 형식 (CJS, ESM 모두 지원)
  format: ['cjs', 'esm'],
  
  // TypeScript 타입 정의 생성
  dts: true,
  
  // 소스맵 생성 (디버깅용)
  sourcemap: true,
  
  // 코드 정리 (주석, 공백 제거)
  clean: true,
  
  // 의존성 번들링 하지 않음 (라이브러리이므로)
  external: [],
  
  // Tree-shaking
  treeshake: true,
  
  // 코드 분할 (청크 생성)
  splitting: false,
  
  // 프로덕션 빌드 시 minify
  minify: false,
  
  // Target 환경
  target: 'es2020',
  
  // 출력 디렉토리
  outDir: 'dist',
  
  // tsconfig.json 사용
  tsconfig: './tsconfig.json',
});
