import { css } from 'styled-components';

// Color palette

export const colorPalette = {
  primary1Color: '#3F51B5',
  primary2Color: '#303F9F',
  primary3Color: '#C5CAE9',
  accent1Color: '#4CAF50',
  accent2Color: '#BDBDBD',
  accent3Color: '#757575',
  textColor: '#212121',
  pickerHeaderColor: '#3F51B5',
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

// Main dimensions

export const navHeight = 0;
