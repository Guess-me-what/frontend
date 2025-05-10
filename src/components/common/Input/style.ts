import GuessMeColor from '@/styles/foundation/color'
import styled from 'styled-components'

export const InputWrap = styled.div`
  width: 100%;
  height: 20%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  span {
    font-family: 'Pretendard-Regular';
    font-size: 16px;

    color: #ffffff;
  }
`

export const InputContainer = styled.input`
  width: 100%;
  height: 53%;

  border: 0.4px solid #d9d9d9;
  background: ${GuessMeColor.Gray700};

  font-family: 'Pretendard-Regular';
  font-size: 16px;
  color: #9b9b9b;

  border-radius: 12px;

  padding-left: 12px;

  &::placeholder {
    color: #9b9b9b;
  }

  &:focus {
    outline: 1px solid ${GuessMeColor.Gray700};
  }
`
