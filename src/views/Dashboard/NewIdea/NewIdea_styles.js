import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { SuperIdeaWrapper } from '../Idea/Idea_styles';
import { colorPalette } from '../../../utils/constants/styles';

export const IdeaWrapper = SuperIdeaWrapper.extend`
  justify-content: center;
  svg {
    height: 30px !important;
    width: 30px !important;
  }
`;

export const Text = styled.p`
  font-size: 18px;
  color: ${colorPalette.primary1Color};
  text-align: center;
`;

export const Input = styled(TextField)`
  width: 300px !important;
`;
