import styled from 'styled-components';
import { media } from './constants/styles';

export const Container = styled.div`
  width: 1600px;
  margin: 0 auto;
  ${media.xl`
    width: 1140px;
  `}
  ${media.lg`
    width: 900px;
  `}
  ${media.md`
    width: 680px;
  `}
  ${media.sm`
    width: 520px;
  `}
  ${media.xs`
    width: 96%;
  `}
`;
