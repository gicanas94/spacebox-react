import Color from 'color';

import { color } from '.';

export const themeMainColor = color.palette.mulberry;

export default {
  components: {
    alert: {
      type: {
        danger: {
          bdrColor: Color(color.palette.salmon).darken(0.2).hex(),
          bgColor: color.palette.salmon,
        },
        success: {
          bdrColor: Color(color.palette.green).darken(0.2).hex(),
          bgColor: color.palette.green,
        },
        warning: {
          bdrColor: Color(color.palette.tuscany).darken(0.2).hex(),
          bgColor: color.palette.tuscany,
        },
      },
    },
    box: {
      bgColor: {
        default: color.palette.cloud,
      },
    },
    button: {
      color: {
        default: themeMainColor,
        disabled: color.palette.pearlRiver,
      },
    },
    checkbox: {
      color: {
        checked: themeMainColor,
        disabled: color.palette.pearlRiver,
        unchecked: color.palette.lava,
      },
    },
    header: {
      bgColor: color.palette.asphalt,
      color: color.palette.cloud,
    },
    hr: {
      color: {
        default: color.palette.abalone,
      },
    },
    input: {
      color: {
        default: color.palette.lava,
        disabled: color.palette.pearlRiver,
        error: color.palette.chili,
        success: color.palette.green,
      },
    },
    select: {
      color: {
        default: color.palette.lava,
        disabled: color.palette.pearlRiver,
        error: color.palette.chili,
        success: color.palette.green,
      },
    },
  },
  htmlTags: {
    a: {
      color: themeMainColor,
    },
    h: {
      color: themeMainColor,
    },
    body: {
      bgColor: color.palette.abalone,
      color: color.palette.anchor,
    },
  },
};
