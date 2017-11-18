import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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

export const Logo = styled.img`
  height: 120px;
  margin-bottom: 30px;
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: 50px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
  color: ${colorPalette.primary1Color};
`;

export const Header = styled.h1`
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: 500;
`;

export const Subheader = styled.h3`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 300;
`;

export const Input = styled(TextField)`
  width: 300px !important;
`;

export const Button = styled(RaisedButton)`
  margin-top: 30px;
`;
