/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string
  readonly VITE_HOST: string
  readonly VITE_BASE_API: string
  readonly VITE_CDN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'element-plus'
