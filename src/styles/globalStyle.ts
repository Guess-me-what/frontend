'use client'

import { createGlobalStyle } from 'styled-components'
import GuessMeColor from './foundation/color'

export const GlobalStyles = createGlobalStyle`
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

    * {
        margin: 0;
        padding: 0;
        border: none;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        color: ${GuessMeColor.Black};
    }
`
