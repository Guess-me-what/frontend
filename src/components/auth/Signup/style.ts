import GuessMeColor from '@/styles/foundation/color'
import styled from 'styled-components'

export const SignupWrap = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: flex-end;
  align-items: flex-start;
  gap: 30px;
`

export const SignupContainer = styled.div`
  width: 100%;
  height: 80%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  align-self: flex-end;
`

export const SignupTitle = styled.h1`
  height: fit-content;
  font-family: 'Pretendard-Bold';
  font-size: 22px;

  color: ${GuessMeColor.White};
  text-align: center;
`

export const SignupForm = styled.div`
  width: 100%;
  height: 70%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 10px;
`
