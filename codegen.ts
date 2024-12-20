import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://main-practice.codebootcamp.co.kr/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/Commons/graphql/": {
      // 해당 폴더 경로 설정
      preset: "client",
    },
  },
};
export default config;
