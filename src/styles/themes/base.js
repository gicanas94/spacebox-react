import Color from 'color';

import { color, font } from '..';

const someThemeColors = {
  main: color.palette.mulberry,
  mainText: color.palette.anchor,
  darkGray: color.palette.lava,
  mainIcons: color.palette.harborGray,
  controls: {
    bgColor: color.palette.cloud,
    color: color.palette.anchor,
    status: {
      default: color.palette.lava,
      disabled: color.palette.pearlRiver,
      error: color.palette.chili,
      success: color.palette.green,
    },
  },
};

export default {
  name: 'base',
  components: {
    alert: {
      fontWeight: font.weight.medium,
      laptopWidth: '70%',
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
      laptopWidth: '70%',
      maxWidth: '1280px',
      mobileWidth: '100%',
    },
    box: {
      arrowIcon: {
        color: someThemeColors.mainIcons,
      },
      bgColor: color.palette.white,
      borderColor: color.palette.abalone,
      borderWidth: '1px',
    },
    button: {
      borderWidth: '2px',
      status: {
        default: someThemeColors.main,
        disabled: someThemeColors.controls.status.disabled,
      },
      filter: 'none',
      fontSize: font.size.m,
      fontWeight: font.weight.bold,
      size: {
        headerOnLaptop: {
          fontSize: font.size.sm,
          height: '35px',
        },
        headerOnMobile: {
          fontSize: font.size.xxl,
          height: 'auto',
        },
      },
    },
    checkbox: {
      borderWidth: '2px',
      checkboxContent: {
        fontSize: '1.2em',
      },
      label: {
        fontSize: font.size.s,
      },
      status: {
        checked: someThemeColors.controls.status.success,
        disabled: someThemeColors.controls.status.disabled,
        error: someThemeColors.controls.status.error,
        unchecked: someThemeColors.controls.status.default,
      },
    },
    colorPicker: {
      color: someThemeColors.darkGray,
      fontSize: font.size.s,
      fontWeight: font.weight.bold,
    },
    comment: {
      borderWidth: '2px',
      createdAtDate: {
        color: someThemeColors.darkGray,
        fontSize: font.size.xxs,
      },
      username: {
        fontWeight: font.weight.medium,
      },
    },
    confirmationModal: {
      bgColor1: color.palette.white,
      bgColor2: Color(
        someThemeColors.main,
      ).darken(0.7).alpha(0.7).string(),
    },
    emojiPicker: {
      bgColor: color.palette.cloud,
      boxShadow: `0 1px 7px 3px ${someThemeColors.darkGray}`,
      emojiHoverColor: Color(
        someThemeColors.main,
      ).lighten(0.7).hex(),
      label: {
        color: someThemeColors.darkGray,
        fontSize: font.size.xs,
        fontWeight: font.weight.bold,
      },
      scrollBar: {
        thumb: {
          bgColor: someThemeColors.darkGray,
          borderRadius: '1px',
        },
        track: {
          bgColor: 'transparent',
        },
      },
      searchInput: {
        bgColor: 'transparent',
        borderBottom: `2px solid ${someThemeColors.darkGray}`,
        fontSize: font.size.s,
      },
    },
    header: {
      bgColor: color.palette.asphalt,
      color: color.palette.cloud,
      laptopWidth: '70%',
      maxWidth: '1280px',
      mobileWidth: '100%',
    },
    hr: {
      bgColor: color.palette.abalone,
      height: '2px',
    },
    input: {
      bgColor: someThemeColors.controls.bgColor,
      borderBottomWidth: '2px',
      color: someThemeColors.controls.color,
      errorMessage: {
        fontSize: font.size.xxs,
        fontWeight: font.weight.bold,
      },
      label: {
        fontSize: font.size.s,
        fontWeight: font.weight.bold,
      },
      status: {
        default: someThemeColors.controls.status.default,
        disabled: someThemeColors.controls.status.disabled,
        error: someThemeColors.controls.status.error,
        success: someThemeColors.controls.status.success,
      },
    },
    loadingScreen: {
      bgColor: Color(
        someThemeColors.main,
      ).darken(0.7).alpha(0.7).string(),
      heartColor: color.palette.white,
      text: {
        color: color.palette.white,
        fontSize: '50px',
        fontWeight: font.weight.bold,
      },
    },
    post: {
      commentPostIcon: {
        color: someThemeColors.mainIcons,
      },
      createdAtDate: {
        dateFromNow: {
          color: someThemeColors.main,
          fontSize: font.size.s,
          fontWeight: font.weight.bold,
        },
        longDate: {
          color: someThemeColors.darkGray,
          fontSize: font.size.xxs,
        },
      },
      deletePostIcon: {
        color: someThemeColors.mainIcons,
      },
      likePostIcon: {
        likeColor: color.palette.ferrari,
        noLikeColor: someThemeColors.mainIcons,
      },
      seeOrHideComments: {
        color: someThemeColors.main,
        fontWeight: font.weight.medium,
      },
      selected: {
        backgroundBorder: `linear-gradient(${color.gradient.pastelRainbow})`,
        border: '1px solid rgba(0, 0, 0, 0.5)',
      },
      stats: {
        color: someThemeColors.darkGray,
        fontSize: font.size.s,
      },
    },
    postsHistory: {
      link: {
        fontSize: font.size.s,
      },
      monthTitle: {
        fontSize: font.size.l,
        fontWeight: font.weight.thin,
      },
      yearTitle: {
        fontSize: font.size.l,
        fontWeight: font.weight.light,
      },
    },
    richTextEditor: {
      bgColor: someThemeColors.controls.bgColor,
      borderBottomWidth: '2px',
      color: someThemeColors.controls.color,
      errorMessage: {
        fontSize: font.size.xxs,
        fontWeight: font.weight.bold,
      },
      label: {
        fontSize: font.size.s,
        fontWeight: font.weight.bold,
      },
      status: {
        default: someThemeColors.controls.status.default,
        disabled: someThemeColors.controls.status.disabled,
        error: someThemeColors.controls.status.error,
        success: someThemeColors.controls.status.success,
      },
      richUtilButton: {
        fontSize: font.size.xs,
        status: {
          active: {
            bgColor: someThemeColors.main,
            border: '0',
            color: color.palette.white,
          },
          default: {
            bgColor: 'transparent',
            border: '0',
            color: someThemeColors.controls.status.default,
          },
          disabled: {
            bgColor: 'transparent',
            border: '0',
            color: someThemeColors.controls.status.disabled,
          },
          hover: {
            bgColor: 'transparent',
            border: '0',
            color: someThemeColors.main,
          },
        },
      },
    },
    searchBar: {
      bgColor: someThemeColors.controls.bgColor,
      // border: `2px solid ${someThemeColors.main}`,
      border: '0',
      color: someThemeColors.controls.color,
      searchIcon: {
        color: someThemeColors.main,
      },
    },
    select: {
      bgColor: someThemeColors.controls.bgColor,
      borderBottomWidth: '2px',
      color: someThemeColors.controls.color,
      errorMessage: {
        fontSize: font.size.xxs,
        fontWeight: font.weight.bold,
      },
      label: {
        fontSize: font.size.s,
        fontWeight: font.weight.bold,
      },
      li: {
        hoverColor: Color(someThemeColors.main).lighten(0.7).hex(),
      },
      ul: {
        bgColor: someThemeColors.controls.bgColor,
        boxShadow: `0 1px 7px -1px ${someThemeColors.darkGray}`,
        scrollBar: {
          thumb: {
            bgColor: someThemeColors.darkGray,
          },
          track: {
            bgColor: someThemeColors.controls.bgColor,
            border: `1px solid ${someThemeColors.darkGray}`,
          },
        },
      },
      status: {
        default: someThemeColors.controls.status.default,
        disabled: someThemeColors.controls.status.disabled,
        error: someThemeColors.controls.status.error,
        success: someThemeColors.controls.status.success,
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
        fontSize: font.size.xl,
        fontWeight: font.weight.bold,
      },
      totalLikesHeartIcon: {
        color: color.palette.ferrari,
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
        fontSize: font.size.m,
      },
    },
    tooltip: {
      fontSize: font.size.xs,
      fontWeight: font.weight.regular,
    },
    userProfileImage: {
      actionsWrapperBgColor: Color(
        someThemeColors.main,
      ).darken(0.9).alpha(0.7).string(),
      bgColor: Color(someThemeColors.main).lighten(0.6).hex(),
      border: `2px solid ${someThemeColors.main}`,
      errorMessage: {
        color: someThemeColors.controls.status.error,
        fontSize: font.size.xxs,
        fontWeight: font.weight.bold,
      },
    },
  },
  forms: {
    comment: {
      smileIcon: {
        color: someThemeColors.darkGray,
      },
      textarea: {
        borderBottomWidth: '2px',
        status: {
          default: someThemeColors.controls.status.default,
          disabled: someThemeColors.controls.status.disabled,
          focus: someThemeColors.main,
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
        color: someThemeColors.darkGray,
        fontSize: font.size.s,
      },
    },
  },
  global: {
    borderRadius: '4px',
    textSelectionColor: Color(
      someThemeColors.main,
    ).lighten(0.5).hex(),
  },
  htmlTags: {
    a: {
      color: someThemeColors.main,
      fontWeight: font.weight.medium,
    },
    blockquote: {
      bgColor: color.palette.cloud,
      borderLeftColor: someThemeColors.main,
      borderLeftWidth: '8px',
      mainText: color.palette.seal,
      textFontSize: font.size.m,
      quoteColor: someThemeColors.main,
      quoteFontSize: '4rem',
    },
    body: {
      background: `linear-gradient(
        ${color.palette.cloud},
        ${Color(color.palette.frenchRose).lighten(0.55).hex()}
      )`,
      // background: 'black',
      color: someThemeColors.mainText,
      filter: 'none',
      fontFamily: font.family.AlegreyaSans,
      fontSize: font.size.sm,
    },
    h: {
      color: someThemeColors.main,
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
      color: someThemeColors.controls.color,
    },
    textarea: {
      color: someThemeColors.controls.color,
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
    verifyEmail: {
      email: {
        fontWeight: font.weight.bold,
      },
    },
  },
};
