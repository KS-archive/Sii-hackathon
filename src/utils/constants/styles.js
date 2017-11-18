import { css } from 'styled-components';

// Color palette

export const colorPalette = {
  primary1Color: '#2196F3',
  primary2Color: '#1976D2',
  primary3Color: '#BBDEFB',
  accent1Color: '#FFC107',
  accent2Color: '#BDBDBD',
  accent3Color: '#757575',
  textColor: '#212121',
  pickerHeaderColor: '#2196F3',
};

// Media queries

export const media = {
  xs: (...args) => css`
    @media (max-width: 540px) {
      ${css(...args)}
    }
  `,
  sm: (...args) => css`
    @media (max-width: 720px) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (max-width: 960px) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (max-width: 1200px) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media (max-width: 1600px) {
      ${css(...args)}
    }
  `,
  xxl: (...args) => css`
    @media (min-width: 1601px) {
      ${css(...args)}
    }
  `,
};

export const inputStyle = {
  floatingLabelFocusStyle: { fontWeight: 500 },
  floatingLabelShrinkStyle: { fontWeight: 900 },
  style: { fontWeight: 500 },
};
