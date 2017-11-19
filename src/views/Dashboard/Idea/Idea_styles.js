import styled from 'styled-components';
import { colorPalette, media } from '../../../utils/constants/styles';

export const IdeaWrapper = styled.div`
  position: relative;
  top: -30px;
  left: -30px;
  display: flex;
  align-items: center;
  width: 300px;
  height: 225px;
  margin: 30px 0 0 30px;
  border-bottom: 8px solid ${colorPalette.primary1Color};
  padding: 15px;
  border-radius: 4px;
  font-size: 17px;
  line-height: 1.4;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
  ${media.xxl`
    padding: 30px 45px;
  `}
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  svg {
    width: 100px !important;
    height: 100px !important;
  }

  path {
    fill: ${colorPalette.primary1Color};
  }
`;
