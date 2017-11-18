import styled from 'styled-components';
import { colorPalette } from '../../../utils/constants/styles';

export const IdeaWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 225px;
  margin-bottom: 30px;
  border-bottom: 8px solid ${colorPalette.primary1Color};
  padding: 15px;
  border-radius: 4px;
  font-size: 17px;
  line-height: 1.4;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
`;
