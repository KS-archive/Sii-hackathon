import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { IdeaWrapper } from '../Idea/Idea_styles';
import { colorPalette } from '../../../utils/constants/styles';

export const ExtendedIdeaWrapper = IdeaWrapper.extend`
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s;

  svg {
    height: 45px !important;
    width: 45px !important;
  }

  path {
    fill: ${colorPalette.primary1Color};
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

export const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${colorPalette.primary1Color};
  text-align: center;
`;

export const Input = styled(TextField)`
  width: 100% !important;
`;

export const StyledDialog = styled(Dialog)`
  width: 100% !important;
`;
