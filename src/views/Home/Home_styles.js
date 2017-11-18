import styled from 'styled-components';
import { colorPalette } from '../../utils/constants/styles';

export const AppName = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: ${colorPalette.primary2Color};
`;

export const Container = styled.div`
  overflow: hidden;
  position: fixed;
  top: 80px;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colorPalette.primary1Color};
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

export const Header = styled.h1`
  margin-bottom: 15px;
  font-size: 30px;
  font-weight: 500;
`;

export const Subheader = styled.h3`
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 300;
`;

export const Input = styled.input`
  padding: 10px;
`;

export const Button = styled.div`
  height: 43px;
`;
