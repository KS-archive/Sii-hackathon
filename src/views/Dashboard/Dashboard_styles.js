import styled from 'styled-components';
import { colorPalette } from '../../utils/constants/styles';

export const Container = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
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
