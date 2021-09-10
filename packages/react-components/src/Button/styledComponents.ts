import styled from 'styled-components'
import {ButtonProps} from './Button'

export const ButtonWrap = styled.button<ButtonProps>`
  position: relative;
  align-items: center;
  display: flex;
  font-family: Lato;
  font-size: ${({size}) => (size === 'small' ? '12px' : '16px')};
  font-style: normal;
  font-weight: bold;
  height: ${({size}) => (size === 'small' ? '32px' : '56px')};
  justify-content: center;
  line-height: 19px;
  order: 1;
  padding: ${({size}) => (size === 'small' ? '0 12px' : '0 24px')};
  text-align: center;
  border-width: 3px;
  border-style: solid;
  border-color: transparent;
  border-radius: ${(props) => (props.shape === 'round' ? 56 : 0)}px;
  color: #494949;
  background: ${({type, theme}) => {
    if (type === 'plain') return 'none'
    if (type === 'primary') return theme.colors.phala
    return '#ececec'
  }};

  &:disabled {
    color: rgba(32, 32, 32, 0.3);
  }

  &:not(:disabled):hover {
    border-color: #494949;
  }

  &:active {
    background: #ececec;
    border-color: transparent;
  }
`

export const Loading = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-image: url('/loading.gif');
  background-repeat: no-repeat;
  background-size: auto 28px;
  background-position: center center;
  background-color: #d1ff52;
`