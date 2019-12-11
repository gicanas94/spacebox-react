import Color from 'color';

import { color, font } from '.';

const heartColor = color.palette.ferrari;
const textColor = color.palette.anchor;
const themeMainColor = color.palette.mulberry;
const themeDisabledColor = color.palette.pearlRiver;
const themeMainGreyColor = color.palette.harborGray;
const themeSecondaryGreyColor = color.palette.lava;

export default {
  components: {
    alert: {
      fontWeight: font.weight.medium,
      laptopWidth: '80%',
      maxWidth: '1280px',
      mobileWidth: '100%',
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
    app: {
      laptopWidth: '80%',
      maxWidth: '1280px',
      mobileWidth: '100%',
    },
    box: {
      arrowIcon: {
        color: themeMainGreyColor,
      },
      bgColor: color.palette.white,
      borderWidth: '1px',
    },
    button: {
      borderWidth: '2px',
      color: {
        default: themeMainColor,
        disabled: themeDisabledColor,
      },
      filter: 'none',
      fontSize: font.size.m,
      fontWeight: font.weight.bold,
    },
    checkbox: {
      borderWidth: '2px',
      color: {
        checked: themeMainColor,
        disabled: themeDisabledColor,
        error: color.palette.chili,
        unchecked: themeSecondaryGreyColor,
      },
      fontSize: font.size.s,
    },
    colorPicker: {
      color: themeSecondaryGreyColor,
      fontSize: font.size.s,
      fontWeight: font.weight.bold,
    },
    comment: {
      borderWidth: '2px',
      createdAtDate: {
        color: themeSecondaryGreyColor,
        fontSize: font.size.xxs,
      },
      username: {
        fontWeight: font.weight.medium,
      },
    },
    confirmationModal: {
      bgColor1: color.palette.white,
      bgColor2: Color(themeMainColor).darken(0.7).alpha(0.7).string(),
    },
    header: {
      bgColor: color.palette.asphalt,
      color: color.palette.cloud,
      laptopWidth: '80%',
      maxWidth: '1280px',
      mobileWidth: '100%',
    },
    hr: {
      color: {
        default: color.palette.abalone,
      },
      height: '2px',
    },
    input: {
      bgColor: color.palette.cloud,
      borderBottomWidth: '2px',
      color: {
        default: themeSecondaryGreyColor,
        disabled: themeDisabledColor,
        error: color.palette.chili,
        success: color.palette.green,
      },
      errorMessage: {
        fontSize: font.size.xxs,
        fontWeight: font.weight.bold,
      },
      label: {
        fontSize: font.size.s,
        fontWeight: font.weight.bold,
      },
    },
    loadingScreen: {
      bgColor: Color(themeMainColor).darken(0.7).alpha(0.7).string(),
      heartColor: color.palette.white,
      text: {
        color: color.palette.white,
        fontSize: '50px',
        fontWeight: font.weight.bold,
      },
    },
    post: {
      commentIcon: {
        color: themeMainGreyColor,
      },
      createdAtDate: {
        dateFromNow: {
          color: themeMainColor,
          fontSize: font.size.s,
          fontWeight: font.weight.bold,
        },
        longDate: {
          color: themeSecondaryGreyColor,
          fontSize: font.size.xxs,
        },
      },
      trashIcon: {
        color: themeMainGreyColor,
      },
      likeHeartIcon: {
        likeColor: heartColor,
        noLikeColor: themeMainGreyColor,
      },
      seeOrHideComments: {
        color: themeMainColor,
        fontWeight: font.weight.medium,
      },
      stats: {
        color: themeSecondaryGreyColor,
        fontSize: font.size.s,
      },
    },
    richTextEditor: {
      button: {
        active: {
          color: color.palette.white,
          backgroundColor: themeMainColor,
          border: `1.5px solid ${themeMainColor}`,
        },
        default: {
          color: themeSecondaryGreyColor,
          backgroundColor: 'transparent',
          border: `1.5px solid ${themeSecondaryGreyColor}`,
        },
        hover: {
          color: themeMainColor,
          backgroundColor: 'transparent',
          border: `1.5px solid ${themeMainColor}`,
        },
      },
    },
    searchBar: {
      bgColor: color.palette.cloud,
      border: `2px solid ${themeMainColor}`,
      color: textColor,
      searchIcon: {
        color: themeMainColor,
      },
    },
    select: {
      bgColor: color.palette.cloud,
      borderBottomWidth: '2px',
      color: {
        default: themeSecondaryGreyColor,
        disabled: themeDisabledColor,
        error: color.palette.chili,
        success: color.palette.green,
      },
      errorMessage: {
        fontSize: font.size.xxs,
        fontWeight: font.weight.bold,
      },
      label: {
        fontSize: font.size.s,
        fontWeight: font.weight.bold,
      },
      li: {
        hoverColor: Color(themeMainColor).lighten(0.7).hex(),
      },
      ul: {
        bgColor: color.palette.cloud,
        boxShadow: `0 1px 7px -1px ${themeSecondaryGreyColor}`,
        scrollBar: {
          thumb: {
            bgColor: themeSecondaryGreyColor,
          },
          track: {
            bgColor: color.palette.cloud,
            border: `1px solid ${themeSecondaryGreyColor}`,
          },
        },
      },
    },
    sidebar: {
      activeLink: {
        fontWeight: font.weight.bold,
      },
      heading: {
        fontWeight: font.weight.bold,
      },
      link: {
        fontSize: font.size.s,
        fontWeight: font.weight.regular,
      },
    },
    signInWithButton: {
      filter: 'none',
      fontSize: font.size.m,
      fontWeight: font.weight.medium,
    },
    spacebox: {
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
        fontSize: font.size.s,
        fontWeight: font.weight.medium,
      },
      informative: {
        bgColor: color.palette.asphalt,
        border: '3px solid transparent',
        color: color.palette.white,
      },
      title: {
        fontSize: font.size.xxxl,
        fontWeight: font.weight.bold,
      },
      totalLikesHeartIcon: {
        color: heartColor,
      },
    },
    spaceboxInfoSection: {
      spaceboxCategory: {
        fontSize: font.size.s,
        titleFontWeight: font.weight.bold,
      },
      spaceboxDescription: {
        fontSize: font.size.s,
      },
      spaceboxTitle: {
        fontWeight: font.weight.bold,
        largeFontSize: font.size.l,
        smallFontSize: font.size.m,
      },
      userImage: {
        bgColor: Color(themeMainColor).lighten(0.6).hex(),
      },
    },
    tooltip: {
      fontSize: font.size.xs,
      fontWeight: font.weight.regular,
    },
  },
  forms: {
    comment: {
      textarea: {
        borderBottomWidth: '2px',
        color: {
          default: themeSecondaryGreyColor,
          disabled: themeDisabledColor,
          focus: themeMainColor,
        },
      },
    },
    signIn: {
      forgotPasswordLink: {
        fontSize: font.size.s,
      },
    },
    signUp: {
      signInLink: {
        fontSize: font.size.s,
      },
      termsOfUseNotice: {
        color: themeSecondaryGreyColor,
        fontSize: font.size.s,
      },
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
      filter: 'none',
      fontFamily: font.family.AlegreyaSans,
      fontSize: font.size.sm,
    },
    h: {
      color: themeMainColor,
    },
    h1: {
      fontSize: font.size.l,
    },
    h2: {
      fontSize: font.size.lm,
    },
    h3: {
      fontSize: font.size.m,
    },
    h4: {
      fontSize: font.size.sm,
    },
    h5: {
      fontSize: font.size.sm,
    },
    h6: {
      fontSize: font.size.sm,
    },
    input: {
      color: textColor,
    },
    textarea: {
      color: textColor,
    },
  },
  pages: {
    editSpacebox: {
      deleteSpacebox: {
        color: color.palette.salmon,
        fontSize: font.size.xs,
        fontWeight: font.weight.bold,
      },
    },
    notFound: {
      content: {
        fontSize: font.size.l,
        fontWeight: font.weight.bold,
      },
    },
    space: {
      postsHistory: {
        link: {
          fontSize: font.size.s,
        },
        month: {
          fontSize: font.size.l,
          fontWeight: font.weight.thin,
        },
        year: {
          fontSize: font.size.l,
          fontWeight: font.weight.light,
        },
      },
    },
    verifyEmail: {
      email: {
        fontWeight: font.weight.bold,
      },
    },
  },
};
