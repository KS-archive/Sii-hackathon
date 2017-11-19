import styled from 'styled-components';
import { media } from './constants/styles';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  ${media.xl`
    width: 1300px;
  `}
  ${media.lg`
    width: 90%;
  `}
  ${media.md`
    width: 95%;
    margin: auto;
  `}
  ${media.sm`
    width: 520px;
  `}
  ${media.xs`
    width: 96%;
  `}
`;
