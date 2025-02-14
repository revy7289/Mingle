# 밍글 Mingle

| **category**  |                                                                                                                                                                                                      **stack**                                                                                                                                                                                                       |
| :-----------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  Environment  |                                                                                                          ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white) ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                                                                                                          |
|    Common     |                                                  ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) ![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white)                                                   |
|   Language    |                                                                                                                                                ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                                                                 |
|     Style     |                                                                                                                                                       ![Tailwind](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white)                                                                                                                                                       |
| Data Fetching |                                                                                                 ![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=GraphQL&logoColor=white) ![ApolloClient](https://img.shields.io/badge/ApolloClient-311C87?style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white)                                                                                                 |
|  Services   |                                                                                                                                                ![express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white) ![playwright](https://img.shields.io/badge/playwright-311C87?style=for-the-badge&logo=playwright&logoColor=white) ![notionAPI](https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white)                                                                                                                                              |
|  Deployment   |                                                                                                                                                ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white) (예정)                                                                                                                                                |
| Collaboration | ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white)  |

### 소개

**Mingle**은 `Material UI`, `Ant Design`, `chakra`, `shadcn/ui` 와 같은 대중적이고 인기 있는 UI 라이브러리와 컴포넌트를 한 눈에 테스트하고 비교할 수 있는 플랫폼 입니다.

React-Flow를 기반으로 UI 요소를 시각화하여 설치와 개발환경 셋팅 없이 웹에서 라이브 컴포넌트 테스트와 실시간 수정 기능으로 효율적이고 빠른 개발환경을 제공합니다.

UI 설계와 기능 검증을 단순화해, 빠르고 창의적인 프로토타이핑을 지원합니다. 신규 프론트엔드 개발자부터 백엔드 기반의 풀스택 개발자까지 누구나 쉽게 활용 가능합니다.

> Mingle은 `섞다, 어울리다` 라는 뜻을 가지고 있어요! Mingle에서 다양한 UI 컴포넌트들을 테스트하고 내 사이트, 프로젝트에 어울리는 프로토타입을 쉽고 빠르게 완성할 수 있어요!

&nbsp;

### 핵심기능

1. `Playground` 원하는 UI 컴포넌트의 기능과 디자인을 라이브러리 별로 한 눈에 확인하고 드래그 앤 드랍으로 내 사이트에 적용시켜 볼 수 있어요!

2. `Community` 다른 개발자들과 소통하고 질문, 답변 할 수 있어요!

3. `My Mingle` 작업한 내용을 저장하고 다른 사람들과 공유할 수 있어요!

4. `Gallery` UI 컴포넌트를 활용하여 작업한 예시들을 살펴 볼 수 있어요!

&nbsp;

### 개발일정

-   기획 & 디자인 :: 2024.11.25 ~ 2024.12.15
    기획 점검 :: 2024.12.10

-   본격 개발 :: 2024.12.16 ~ 2025.01.12
    피드백 및 회고 :: 2025.01.13 ~ 2025.01.14

-   MVP 및 데모 공개 :: 2025.01.15
    디벨롭 및 랩업 :: 2025.01.16 ~ 2025.01.20

-   프로젝트 종료 :: 2025.01.21

&nbsp;

### 기술스택

-   핵심기술

    > REACT 18
    > typescript
    > React-Flow

-   상태관리

    > Zustand

-   데이터 통신

    > GraphQL ?
    > MSW ?

-   테스트

    > Jest ?
    > storybook ?

-   기타

    > vite
    > ESlint
    > tailwindcss

-   의존성 라이브러리
    > Material UI (MUI)
    > Ant Design (ANTD)
    > Chakra
    > shadcn/ui

&nbsp;

### 기술 선택 이유

#### REACT 18

> SPA 구성을 통해 부드럽고 자연스러운 화면 전환, 다양한 UI 전환 등에 최적화 되어 있습니다. 또한 실시간으로 컴포넌트를 state로 유동적으로 관리하기 위해 선택하였습니다.

```
 왜 프레임워크는 사용하지 않는가?

 NEXT와 같은 프레임워크는 SSR, server action, caching, 최적화 등 다양한 기능들이 제공되지만,
 여러 ui라이브러리들에 크게 의존하는 프로젝트 이므로 관리해야 할 컴포넌트의 양이 상당히 많습니다.

 따라서 server component로 모든 컴포넌트들을 pre-render하는 것 보다
 유저의 선택에 따라 dynamic import를 통해 client-side에서 필요한 컴포넌트만
 그 때 그 때 렌더할 수 있도록 최적화와 효율화하는 방향이 더욱 적합하다고 판단하였습니다.

```

&nbsp;

#### typescript

> 다양한 라이브러리들의 제각기 다른 사용법, props, type 등을 일관성 있게 통일하고 type-safe하게 사용하기 위해 필요성이 발생하였기에 선택하였습니다.

&nbsp;

#### React-Flow

> 각기 다른 라이브러리별 ui의 형태와 스타일을 통일하고 react-flow가 지원하는 container(node)를 통해 쉽고 빠르게 ui들을 시각화, 단순화 할 수 있으며,
> 사용자의 마우스 드래그, 클릭, 줌인 등을 통해 인터렉션 또한 구현할 수 있어 본 프로젝트의 CORE가 되는 stack으로 선정하였습니다.

&nbsp;

#### Zustand

> 본 프로젝트는 전역 상태관리에 크게 의존하지는 않으며 복잡도가 낮은 편이라고 판단하였기 때문에 쉽고 가볍게 사용할 수 있으며 불필요한 렌더를 최소화하여 최적화에 이점이 있기에 선정하였습니다.

&nbsp;

#### vite

> 본 프로젝트의 CORE-stack인 React-Flow에 최적화 되어 있으며, 수 많은 컴포넌트를 다루는 프로젝트의 특성상 webpack보다 빠르고 효율적인 번들러가 필요하다고 판단하여 선정하였습니다.

&nbsp;

## 구현 기능 시연

#### Playground

react-flow 활용한 ui library build, test, compare station
어쩌구 저쩌구

#### Community

개발자끼리 소통해오~ 후론트핸드 앞손이 개발자
어쩌구 저쩌구

#### My Mingle

내가 만든 cooUIe 너를 위해 구었지
어쩌구 저쩌구

#### Gallery

... 코드는 훔치는 것도 실력이다..!
어쩌구 저쩌구

## 멤버

| 팀장        | 대장        | 사장        |
| ----------- | ----------- | ----------- |
| 이하성      | 정아영      | 김세연      |
| 사진        | 사진        | 사진        |
| 어쩌구 담당 | 저쩌구 담당 | 그쩌구 담당 |
