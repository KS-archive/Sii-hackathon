import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Container } from '../../utils/styledComponents';
import { colorPalette, media } from '../../utils/constants/styles';

export const Wrapper = Container.extend`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  padding: 30px 0;
  ${media.xxl`
    padding: 30px 45px;
  `}
`;

export const Ideas = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: calc(100% - 330px);
  max-height: 100%;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
`;

export const Header = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: ${colorPalette.primary1Color};
`;

export const Time = styled.div`
  margin: 30px 0;
  font-size: 72px;
  font-weight: 500;
  color: ${colorPalette.primary1Color};
`;

export const Button = styled(RaisedButton)`
  font-weight: 500;
`;

export const End = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  margin-top: auto;
  background-color: ${colorPalette.primary1Color};
  font-size: 30px;
  font-weight: 300;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
`;

export const StyledDialog = styled(Dialog)`
  box-sizing: border-box;
`;

export const Input = styled(TextField)`
  width: 100% !important;
`;
