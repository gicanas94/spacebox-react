import Color from 'color';

import { colors, fonts } from '..';

const someThemeColors = {
  main: colors.palette.mulberry,
  mainText: colors.palette.anchor,
  darkGray: colors.palette.lava,
  mainIcons: colors.palette.harborGray,
  controls: {
    bgColor: colors.palette.cloud,
    color: colors.palette.anchor,
    status: {
      default: colors.palette.lava,
      disabled: colors.palette.pearlRiver,
      error: colors.palette.chili,
      success: colors.palette.green,
    },
  },
};

export default {
  name: 'base',
  components: {
    alert: {
      fontWeight: fonts.weight.medium,
      laptopWidth: '70%',
      maxWidth: '1280px',
      mobileWidth: '100%',
      type: {
        danger: {
          bgColor: colors.palette.salmon,
          border: `1px solid ${Color(colors.palette.salmon).darken(0.2).hex()}`,
          color: colors.palette.mahogany,
        },
        success: {
          bgColor: colors.palette.green,
          border: `1px solid ${Color(colors.palette.green).darken(0.2).hex()}`,
          color: colors.palette.tea,
        },
        warning: {
          bgColor: colors.palette.tuscany,
          border: `1px solid ${Color(colors.palette.tuscany)
            .darken(0.2)
            .hex()}`,
          color: colors.palette.gingerbread,
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
      bgColor: colors.palette.white,
      borderColor: colors.palette.abalone,
      borderWidth: '1px',
    },
    button: {
      borderWidth: '2px',
      status: {
        default: someThemeColors.main,
        disabled: someThemeColors.controls.status.disabled,
      },
      filter: 'none',
      fontSize: fonts.size.m,
      fontWeight: fonts.weight.bold,
      size: {
        headerOnLaptop: {
          fontSize: fonts.size.sm,
          height: '35px',
        },
        headerOnMobile: {
          fontSize: fonts.size.xxl,
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
        fontSize: fonts.size.s,
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
      fontSize: fonts.size.s,
      fontWeight: fonts.weight.bold,
    },
    confirmationModal: {
      bgColor1: colors.palette.white,
      bgColor2: Color(someThemeColors.main).darken(0.7).alpha(0.7).string(),
    },
    emojiPicker: {
      bgColor: colors.palette.cloud,
      border: `1px solid ${someThemeColors.darkGray}`,
      boxShadow: `0 0 3px 1px ${someThemeColors.main}`,
      emojiHoverColor: Color(someThemeColors.main).lighten(0.7).hex(),
      label: {
        color: someThemeColors.darkGray,
        fontSize: fonts.size.xs,
        fontWeight: fonts.weight.bold,
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
        fontSize: fonts.size.s,
      },
    },
    globalMessage: {
      content: {
        fontSize: fonts.size.xs,
      },
      link: {
        fontSize: fonts.size.xs,
        fontWeight: fonts.weight.bold,
      },
      reliefEffect: {
        filter: 'blur(6px)',
      },
      title: {
        fontSize: fonts.size.s,
        fontWeight: fonts.weight.bold,
      },
      type: {
        danger: {
          bgColor: colors.palette.salmon,
          border: `1px solid ${Color(colors.palette.salmon).darken(0.4).hex()}`,
          color: colors.palette.mahogany,
          reliefEffectBorder: `5px solid ${Color(colors.palette.salmon)
            .darken(0.4)
            .hex()}`,
        },
        info: {
          bgColor: colors.palette.sky,
          border: `1px solid ${Color(colors.palette.sky).darken(0.4).hex()}`,
          color: colors.palette.denim,
          reliefEffectBorder: `5px solid ${Color(colors.palette.sky)
            .darken(0.4)
            .hex()}`,
        },
        success: {
          bgColor: colors.palette.green,
          border: `1px solid ${Color(colors.palette.green).darken(0.4).hex()}`,
          color: colors.palette.tea,
          reliefEffectBorder: `5px solid ${Color(colors.palette.green)
            .darken(0.4)
            .hex()}`,
        },
        warning: {
          bgColor: colors.palette.tuscany,
          border: `1px solid ${Color(colors.palette.tuscany)
            .darken(0.4)
            .hex()}`,
          color: colors.palette.gingerbread,
          reliefEffectBorder: `5px solid ${Color(colors.palette.tuscany)
            .darken(0.4)
            .hex()}`,
        },
      },
    },
    header: {
      bgColor: colors.palette.asphalt,
      color: colors.palette.cloud,
      laptopWidth: '70%',
      maxWidth: '1280px',
      mobileWidth: '100%',
      searchBar: {
        bgColor: someThemeColors.controls.bgColor,
        // border: `2px solid ${someThemeColors.main}`,
        border: 0,
        color: someThemeColors.controls.color,
        searchIcon: {
          color: someThemeColors.main,
        },
      },
    },
    hr: {
      bgColor: colors.palette.abalone,
      height: '2px',
    },
    input: {
      bgColor: someThemeColors.controls.bgColor,
      borderBottomWidth: '2px',
      color: someThemeColors.controls.color,
      errorMessage: {
        fontSize: fonts.size.xxs,
        fontWeight: fonts.weight.bold,
      },
      label: {
        fontSize: fonts.size.s,
        fontWeight: fonts.weight.bold,
      },
      status: {
        default: someThemeColors.controls.status.default,
        disabled: someThemeColors.controls.status.disabled,
        error: someThemeColors.controls.status.error,
        success: someThemeColors.controls.status.success,
      },
    },
    loadingScreen: {
      bgColor: Color(someThemeColors.main).darken(0.7).alpha(0.7).string(),
      heartColor: colors.palette.white,
      text: {
        color: colors.palette.white,
        fontSize: '50px',
        fontWeight: fonts.weight.bold,
      },
    },
    post: {
      comment: {
        borderWidth: '2px',
        createdAtDate: {
          color: someThemeColors.darkGray,
          fontSize: fonts.size.xxs,
        },
        username: {
          fontWeight: fonts.weight.medium,
        },
      },
      commentPostIcon: {
        color: someThemeColors.mainIcons,
      },
      copyPostLinkIcon: {
        color: someThemeColors.mainIcons,
      },
      createdAtDate: {
        dateFromNow: {
          color: someThemeColors.main,
          fontSize: fonts.size.s,
          fontWeight: fonts.weight.bold,
        },
        longDate: {
          color: someThemeColors.darkGray,
          fontSize: fonts.size.xxs,
        },
      },
      deletePostIcon: {
        color: someThemeColors.mainIcons,
      },
      likePostIcon: {
        likeColor: colors.palette.ferrari,
        noLikeColor: someThemeColors.mainIcons,
      },
      postLink: {
        bgColor: colors.palette.white,
        border: `2px dashed ${someThemeColors.main}`,
        borderRadius: '2px',
        fontSize: fonts.size.xs,
        input: {
          bgColor: colors.palette.white,
        },
        label: {
          bgColor: colors.palette.white,
          color: someThemeColors.main,
          fontWeight: fonts.weight.bold,
        },
      },
      seeOrHideComments: {
        color: someThemeColors.main,
        fontWeight: fonts.weight.medium,
      },
      selected: {
        backgroundBorder: `linear-gradient(${colors.gradient.pastelRainbow})`,
        border: '1px solid rgba(0, 0, 0, 0.5)',
      },
      stats: {
        color: someThemeColors.darkGray,
        fontSize: fonts.size.s,
      },
    },
    postsHistory: {
      link: {
        fontSize: fonts.size.s,
      },
      monthTitle: {
        fontSize: fonts.size.l,
        fontWeight: fonts.weight.thin,
      },
      yearTitle: {
        fontSize: fonts.size.l,
        fontWeight: fonts.weight.light,
      },
    },
    richTextEditor: {
      bgColor: someThemeColors.controls.bgColor,
      borderBottomWidth: '2px',
      color: someThemeColors.controls.color,
      errorMessage: {
        fontSize: fonts.size.xxs,
        fontWeight: fonts.weight.bold,
      },
      label: {
        fontSize: fonts.size.s,
        fontWeight: fonts.weight.bold,
      },
      status: {
        default: someThemeColors.controls.status.default,
        disabled: someThemeColors.controls.status.disabled,
        error: someThemeColors.controls.status.error,
        success: someThemeColors.controls.status.success,
      },
      richUtilButton: {
        fontSize: fonts.size.xs,
        status: {
          active: {
            bgColor: someThemeColors.main,
            border: 0,
            color: colors.palette.white,
          },
          default: {
            bgColor: 'transparent',
            border: 0,
            color: someThemeColors.controls.status.default,
          },
          disabled: {
            bgColor: 'transparent',
            border: 0,
            color: someThemeColors.controls.status.disabled,
          },
          hover: {
            bgColor: 'transparent',
            border: 0,
            color: someThemeColors.main,
          },
        },
      },
    },
    select: {
      bgColor: someThemeColors.controls.bgColor,
      borderBottomWidth: '2px',
      color: someThemeColors.controls.color,
      errorMessage: {
        fontSize: fonts.size.xxs,
        fontWeight: fonts.weight.bold,
      },
      label: {
        fontSize: fonts.size.s,
        fontWeight: fonts.weight.bold,
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
        fontWeight: fonts.weight.bold,
      },
      heading: {
        fontWeight: fonts.weight.bold,
      },
      link: {
        fontSize: fonts.size.s,
        fontWeight: fonts.weight.regular,
      },
    },
    signInWithButton: {
      filter: 'none',
      fontSize: fonts.size.m,
      fontWeight: fonts.weight.medium,
    },
    spacebox: {
      authUserIsTheOwner: {
        backgroundBorder: `linear-gradient(${colors.gradient.pastelRainbow})`,
        border: '1px solid rgba(0, 0, 0, 0.5)',
      },
      borderWidth: '2px',
      bubble: {
        borderRadius: '3px',
        fontSize: fonts.size.xxs,
        fontWeight: fonts.weight.medium,
      },
      description: {
        fontSize: fonts.size.s,
        fontWeight: fonts.weight.medium,
      },
      informative: {
        bgColor: colors.palette.asphalt,
        border: '3px solid transparent',
        color: colors.palette.white,
      },
      title: {
        filterOnHover: 'blur(4px)',
        fontSize: fonts.size.xl,
        fontWeight: fonts.weight.bold,
      },
      totalLikesHeartIcon: {
        color: colors.palette.ferrari,
      },
    },
    spaceboxInfoBox: {
      spaceboxCategory: {
        fontSize: fonts.size.s,
        titleFontWeight: fonts.weight.bold,
      },
      spaceboxDescription: {
        fontSize: fonts.size.s,
      },
      spaceboxTitle: {
        fontWeight: fonts.weight.bold,
        fontSize: fonts.size.m,
      },
    },
    tooltip: {
      fontSize: fonts.size.xs,
      fontWeight: fonts.weight.regular,
    },
    userProfileImage: {
      actionsWrapperBgColor: Color(someThemeColors.main)
        .darken(0.9)
        .alpha(0.7)
        .string(),
      bgColor: Color(someThemeColors.main).lighten(0.6).hex(),
      border: `2px solid ${someThemeColors.main}`,
      errorMessage: {
        color: someThemeColors.controls.status.error,
        fontSize: fonts.size.xxs,
        fontWeight: fonts.weight.bold,
      },
      filter: 'blur(5px)',
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
        fontSize: fonts.size.s,
      },
    },
    signUp: {
      signInLink: {
        fontSize: fonts.size.s,
      },
      termsOfUseNotice: {
        color: someThemeColors.darkGray,
        fontSize: fonts.size.s,
      },
    },
  },
  global: {
    borderRadius: '4px',
    textSelectionColor: Color(someThemeColors.main).lighten(0.5).hex(),
  },
  htmlTags: {
    a: {
      color: someThemeColors.main,
      fontWeight: fonts.weight.medium,
    },
    blockquote: {
      bgColor: colors.palette.cloud,
      borderLeftColor: someThemeColors.main,
      borderLeftWidth: '8px',
      mainText: colors.palette.seal,
      textFontSize: fonts.size.m,
      quoteColor: someThemeColors.main,
      quoteFontSize: '4rem',
    },
    body: {
      background: `linear-gradient(
        ${colors.palette.cloud},
        ${Color(colors.palette.frenchRose).lighten(0.55).hex()}
      )`,
      // background: 'black',
      color: someThemeColors.mainText,
      filter: 'none',
      fontFamily: fonts.family.AlegreyaSans,
      fontSize: fonts.size.sm,
    },
    h: {
      color: someThemeColors.main,
    },
    h1: {
      fontSize: fonts.size.l,
    },
    h2: {
      fontSize: fonts.size.lm,
    },
    h3: {
      fontSize: fonts.size.m,
    },
    h4: {
      fontSize: fonts.size.sm,
    },
    h5: {
      fontSize: fonts.size.sm,
    },
    h6: {
      fontSize: fonts.size.sm,
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
        color: colors.palette.salmon,
        fontSize: fonts.size.xs,
        fontWeight: fonts.weight.bold,
      },
    },
    notFound: {
      content: {
        fontSize: fonts.size.l,
        fontWeight: fonts.weight.bold,
      },
    },
    verifyEmail: {
      email: {
        fontWeight: fonts.weight.bold,
      },
    },
  },
};
