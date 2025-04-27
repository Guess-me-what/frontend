'use client'

import { createGlobalStyle } from 'styled-components'
import GuessMeColor from './foundation/color'

export const GlobalStyles = createGlobalStyle`
    /* Pretendard 폰트 적용 */
    @font-face {
        font-family: "Pretendard-Regular";
        src: url("@/assets/font/Pretendard-Regular.otf") format("opentype");
    }

    @font-face {
        font-family: "Pretendard-Medium";
        src: url("/Pretendard-Medium.otf") format("opentype");
    }

    @font-face {
        font-family: "Pretendard-SemiBold";
        src: url("/Pretendard-SemiBold.otf") format("opentype");
    }

    @font-face {
        font-family: "Pretendard-Bold";
        src: url("/Pretendard-Bold.otf") format("opentype");
    }    

    /* 기본 스타일 초기화 */
    * {
        margin: 0;
        padding: 0;
        border: none;
        box-sizing: border-box;
    }

    /* 링크 스타일 */
    a {
        text-decoration: none;
        color: ${GuessMeColor.Black};
    }

    /* 최상단 요소 설정 */
    html, body, #__next {
        height: 100%;
        background-color: ${GuessMeColor.Gray900}; /* 기본 배경색 설정 */
    }

    /* body 기본 폰트 세팅 (선택사항) */
    body {
        font-family: "Pretendard-Regular", sans-serif;
    }
`
