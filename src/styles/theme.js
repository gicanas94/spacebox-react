import Color from 'color';

import { color, font } from '.';

const heartColor = color.palette.ferrari;
const textColor = color.palette.anchor;
const themeMainColor = color.palette.mulberry;

export default {
  components: {
    Alert: {
      maxWidth: '1280px',
      mobileWidth: '100%',
      fontWeight: font.weight.medium,
      laptopWidth: '80%',
      type: {
        danger: {
          bgColor: color.palette.salmon,
          border: `1px solid ${Color(color.palette.salmon).darken(0.2).hex()}`,
          color: color.palette.mahogany,
        },
        success: {
          bgColor: color.palette.green,
          border: `1px solid ${Color(color.palette.green).darken(0.2).hex()}`,
          color: color.palette.tea,
        },
        warning: {
          bgColor: color.palette.tuscany,
          border: `1px solid ${Color(color.palette.tuscany).darken(0.2).hex()}`,
          color: color.palette.cinnamon,
        },
      },
    },
    App: {
      maxWidth: '1280px',
      mobileWidth: '100%',
      laptopWidth: '80%',
    },
    Box: {
      arrowColor: color.palette.harborGray,
      borderWidth: '1px',
      defaultBgColor: color.palette.white,
    },
    Button: {
      borderWidth: '2px',
      color: {
        default: themeMainColor,
        disabled: color.palette.pearlRiver,
      },
      fontWeight: font.weight.bold,
    },
    Checkbox: {
      borderWidth: '2px',
      color: {
        checked: themeMainColor,
        disabled: color.palette.pearlRiver,
        error: color.palette.chili,
        unchecked: color.palette.lava,
      },
      fontSize: font.size.xs,
    },
    ColorInput: {
      fontSize: font.size.xs,
    },
    Comment: {
      borderWidth: '2px',
      content: {
        fontSize: font.size.xs,
      },
      date: {
        color: color.palette.mink,
        fontSize: font.size.xs,
      },
      seeMoreComments: {
        color: themeMainColor,
        fontSize: font.size.xs,
        fontWeight: font.weight.medium,
      },
      username: {
        fontSize: font.size.xs,
        fontWeight: font.weight.medium,
      },
    },
    Header: {
      maxWidth: '1280px',
      mobileWidth: '100%',
      bgColor: color.palette.asphalt,
      color: color.palette.cloud,
      laptopWidth: '80%',
    },
    Hr: {
      borderWidth: '2px',
      color: {
        default: color.palette.abalone,
      },
    },
    Input: {
      borderWidth: '2px',
      color: {
        default: color.palette.lava,
        disabled: color.palette.pearlRiver,
        error: color.palette.chili,
        success: color.palette.green,
      },
      errorMessage: {
        fontSize: font.size.xxs,
        fontWeight: font.weight.bold,
      },
      label: {
        fontSize: font.size.xs,
        fontWeight: font.weight.bold,
      },
    },
    LoadingSpinner: {
      bgColor: 'rgba(255, 255, 255, 0.9)',
      spinnerColor: themeMainColor,
    },
    Post: {
      commentIcon: {
        disabledColor: color.palette.harborGray,
        enabledColor: color.palette.harborGray,
      },
      createdAtDate: {
        color: themeMainColor,
        fontSize: font.size.xs,
        fontWeight: font.weight.bold,
      },
      likeHeartIcon: {
        likeColor: heartColor,
        noLikeColor: color.palette.harborGray,
      },
    },
    SearchBar: {
      bgColor: color.palette.cloud,
      border: `2px solid ${themeMainColor}`,
      color: color.palette.anchor,
      fontSize: font.size.xs,
      searchIconColor: themeMainColor,
    },
    Select: {
      borderWidth: '2px',
      color: {
        default: color.palette.lava,
        disabled: color.palette.pearlRiver,
        error: color.palette.chili,
        success: color.palette.green,
      },
      errorMessage: {
        fontSize: font.size.xxs,
        fontWeight: font.weight.bold,
      },
      label: {
        fontSize: font.size.xs,
        fontWeight: font.weight.bold,
      },
      li: {
        hoverColor: Color(themeMainColor).lighten(0.7).hex(),
      },
      ul: {
        bgColor: color.palette.white,
        boxShadow: `0 0px 5px 1px ${color.palette.lava}`,
        scrollBar: {
          thumb: {
            bgColor: color.palette.lava,
          },
          track: {
            bgColor: color.palette.white,
            border: `1px solid ${color.palette.lava}`,
          },
        },
      },
    },
    Sidebar: {
      title: {
        fontWeight: font.weight.bold,
      },
      link: {
        fontSize: font.size.xs,
        fontWeight: font.weight.regular,
      },
      activeLink: {
        fontWeight: font.weight.bold,
      },
    },
    SignInWithButton: {
      fontWeight: font.weight.medium,
    },
    Spacebox: {
      authUserIsTheOwner: {
        backgroundBorder: `linear-gradient(${color.gradient.pastelRainbow})`,
        border: '1px solid rgba(0, 0, 0, 0.5)',
      },
      borderWidth: '2px',
      bubble: {
        borderRadius: '3px',
        fontSize: font.size.xxs,
        fontWeight: font.weight.medium,
      },
      description: {
        fontSize: font.size.xs,
        fontWeight: font.weight.medium,
      },
      informative: {
        bgColor: color.palette.asphalt,
        border: `3px solid ${color.palette.gold}`,
        color: color.palette.gold,
      },
      title: {
        fontSize: font.size.lm,
        fontWeight: font.weight.bold,
      },
      totalLikesHeartIconColor: heartColor,
    },
    Tooltip: {
      fontSize: '18px',
      fontWeight: font.weight.regular,
    },
  },
  forms: {
    Comment: {
      textarea: {
        color: {
          default: color.palette.lava,
          disabled: color.palette.pearlRiver,
          focus: themeMainColor,
        },
        borderWidth: '2px',
      },
    },
    Post: {
      bgColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
  global: {
    borderRadius: '4px',
    textSelectionColor: Color(themeMainColor).lighten(0.5).hex(),
  },
  htmlTags: {
    a: {
      color: themeMainColor,
      fontWeight: font.weight.medium,
    },
    body: {
      background: `linear-gradient(
        ${color.palette.cloud},
        ${Color(color.palette.frenchRose).lighten(0.55).hex()}
      )`,
      color: textColor,
      fontFamily: font.family.AlegreyaSans,
      fontSize: font.size.s,
    },
    h: {
      color: themeMainColor,
    },
    input: {
      color: textColor,
    },
    textarea: {
      color: textColor,
    },
  },
  pages: {
    CreateSpacebox: {
      infoText: {
        fontSize: font.size.xs,
      },
    },
    NotFound: {
      content: {
        fontWeight: font.weight.bold,
      },
    },
    SignIn: {
      forgotPasswordLink: {
        fontSize: font.size.xs,
      },
    },
    SignUp: {
      signInLink: {
        fontSize: font.size.xs,
      },
    },
    Space: {
      postsHistory: {
        link: {
          fontSize: font.size.xs,
        },
        month: {
          fontSize: font.size.m,
          fontWeight: font.weight.thin,
        },
        year: {
          fontSize: font.size.sm,
          fontWeight: font.weight.regular,
        },
      },
      SpaceboxInfoSection: {
        spaceboxCategory: {
          fontSize: font.size.xs,
          titleFontWeight: font.weight.bold,
        },
        spaceboxDescription: {
          fontSize: font.size.xs,
        },
        spaceboxTitle: {
          fontWeight: font.weight.bold,
          smallFontSize: font.size.s,
          largeFontSize: font.size.m,
        },
        userImage: {
          bgColor: Color(themeMainColor).lighten(0.6).hex(),
        },
      },
    },
    VerifyEmail: {
      email: {
        fontWeight: font.weight.bold,
      },
    },
  },
};
