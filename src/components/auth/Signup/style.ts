import GuessMeColor from '@/styles/foundation/color'
import styled from 'styled-components'

export const SignupWrap = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: flex-end;
  align-items: flex-start;
`

export const SignupContainer = styled.div`
  width: 100%;
  height: 90%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`

export const SignupTitle = styled.h1`
  font-family: 'Pretendard-Bold';
  font-size: 22px;

  color: ${GuessMeColor.White};
  text-align: center;
`

export const SignupForm = styled.div`
  width: 100%;
  height: 90%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 10px;
`
