import styled from 'styled-components';
import { colorPalette, media } from '../../../utils/constants/styles';

export const IdeaWrapper = styled.div`
  position: relative;
  overflow-y: hidden;
  top: -30px;
  left: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 225px;
  margin: 30px 0 0 30px;
  border-bottom: 8px solid ${colorPalette.primary1Color};
  padding: 15px;
  border-radius: 4px;
  font-size: 22px;
  text-align: center;
  line-height: 1.4;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
  ${media.xxl`
    padding: 30px 45px;
  `};
  ${media.sm`
    width: 75%;
    margin: auto;
    top: 0px;
    left: 0px;
    margin-bottom: 25px;
    `};
  ${media.xs`
    width: 85%;
    margin: auto;
    top: 0px;
    left: 0px;
    margin-bottom: 15px;
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
