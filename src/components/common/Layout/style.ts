import GuessMeColor from '@/styles/foundation/color'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${GuessMeColor.White};

  display: flex;
  align-items: center;
  justify-content: center;
`

export const View = styled.div`
  padding: 30px;

  width: 100%;
  height: 100%;

  background: linear-gradient(
    to bottom,
    ${GuessMeColor.Gray600} 0%,
    ${GuessMeColor.Gray800} 100%
  );
`
