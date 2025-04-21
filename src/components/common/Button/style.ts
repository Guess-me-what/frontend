import GuessMeColor from '@/styles/foundation/color'
import styled, { CSSObject } from 'styled-components'

export const ButtonWrap = styled.div<{
  backgroundcolortype: 'Main' | 'Secondary'
  border?: boolean
  width?: number
  customStyle?: CSSObject
}>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: fit-content;

  padding: 15px;

  border-radius: 7px;

  background-color: ${({ backgroundcolortype }) =>
    backgroundcolortype === 'Main'
      ? GuessMeColor.Yellow200
      : GuessMeColor.Gray700};

  color: ${({ backgroundcolortype }) =>
    backgroundcolortype === 'Main'
      ? GuessMeColor.Gray800
      : GuessMeColor.Gray300};

  font-family: ${({ backgroundcolortype }) =>
    backgroundcolortype === 'Main'
      ? 'Pretendard-SemiBold'
      : 'Pretendard-Medium'};

  border: ${({ border }) => border && `1.5px solid ${GuessMeColor.Gray500}`};

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  cursor: pointer;

  ${({ customStyle }) => customStyle}
`
