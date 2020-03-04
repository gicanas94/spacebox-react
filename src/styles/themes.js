import Color from 'color';

import { color, font } from '.';

const mainDefaultThemeColors = {
  heartColor: color.palette.ferrari,
  textColor: color.palette.anchor,
  mainColor: color.palette.mulberry,
  disabledColor: color.palette.pearlRiver,

  // Used of icons
  mainGreyColor: color.palette.harborGray,

  // Default grey
  secondaryGreyColor: color.palette.lava,
};

const defaultTheme = {
  name: 'default',
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
        color: mainDefaultThemeColors.mainGreyColor,
      },
      bgColor: color.palette.white,
      borderWidth: '1px',
    },
    button: {
      borderWidth: '2px',
      color: {
        default: mainDefaultThemeColors.mainColor,
        disabled: mainDefaultThemeColors.disabledColor,
      },
      filter: 'none',
      fontSize: font.size.m,
      fontWeight: font.weight.bold,
    },
    checkbox: {
      borderWidth: '2px',
      color: {
        checked: mainDefaultThemeColors.mainColor,
        disabled: mainDefaultThemeColors.disabledColor,
        error: color.palette.chili,
        unchecked: mainDefaultThemeColors.secondaryGreyColor,
      },
      checkboxContent: {
        fontSize: '1.2em',
      },
      label: {
        fontSize: font.size.s,
      },
    },
    colorPicker: {
      color: mainDefaultThemeColors.secondaryGreyColor,
      fontSize: font.size.s,
      fontWeight: font.weight.bold,
    },
    comment: {
      borderWidth: '2px',
      createdAtDate: {
        color: mainDefaultThemeColors.secondaryGreyColor,
        fontSize: font.size.xxs,
      },
      username: {
        fontWeight: font.weight.medium,
      },
    },
    confirmationModal: {
      bgColor1: color.palette.white,
      bgColor2: Color(
        mainDefaultThemeColors.mainColor,
      ).darken(0.7).alpha(0.7).string(),
    },
    emojiPicker: {
      bgColor: color.palette.cloud,
      boxShadow: `0 1px 7px 3px ${mainDefaultThemeColors.secondaryGreyColor}`,
      emojiHoverColor: Color(
        mainDefaultThemeColors.mainColor,
      ).lighten(0.7).hex(),
      label: {
        color: mainDefaultThemeColors.secondaryGreyColor,
        fontSize: font.size.xs,
        fontWeight: font.weight.bold,
      },
      scrollBar: {
        thumb: {
          bgColor: mainDefaultThemeColors.secondaryGreyColor,
          borderRadius: '1px',
        },
        track: {
          bgColor: 'transparent',
        },
      },
      searchInput: {
        bgColor: 'transparent',
        borderBottom: `2px solid ${mainDefaultThemeColors.secondaryGreyColor}`,
        fontSize: font.size.s,
      },
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
        default: mainDefaultThemeColors.secondaryGreyColor,
        disabled: mainDefaultThemeColors.disabledColor,
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
      bgColor: Color(
        mainDefaultThemeColors.mainColor,
      ).darken(0.7).alpha(0.7).string(),
      heartColor: color.palette.white,
      text: {
        color: color.palette.white,
        fontSize: '50px',
        fontWeight: font.weight.bold,
      },
    },
    post: {
      commentIcon: {
        color: mainDefaultThemeColors.mainGreyColor,
      },
      createdAtDate: {
        dateFromNow: {
          color: mainDefaultThemeColors.mainColor,
          fontSize: font.size.s,
          fontWeight: font.weight.bold,
        },
        longDate: {
          color: mainDefaultThemeColors.secondaryGreyColor,
          fontSize: font.size.xxs,
        },
      },
      trashIcon: {
        color: mainDefaultThemeColors.mainGreyColor,
      },
      likeHeartIcon: {
        likeColor: mainDefaultThemeColors.heartColor,
        noLikeColor: mainDefaultThemeColors.mainGreyColor,
      },
      seeOrHideComments: {
        color: mainDefaultThemeColors.mainColor,
        fontWeight: font.weight.medium,
      },
      stats: {
        color: mainDefaultThemeColors.secondaryGreyColor,
        fontSize: font.size.s,
      },
    },
    richTextEditor: {
      bgColor: color.palette.cloud,
      borderBottomWidth: '2px',
      color: {
        default: mainDefaultThemeColors.secondaryGreyColor,
        disabled: mainDefaultThemeColors.disabledColor,
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
      richUtilButton: {
        fontSize: font.size.xs,
        active: {
          bgColor: mainDefaultThemeColors.mainColor,
          border: '0',
          color: color.palette.white,
        },
        default: {
          bgColor: 'transparent',
          border: '0',
          color: mainDefaultThemeColors.secondaryGreyColor,
        },
        disabled: {
          bgColor: 'transparent',
          border: '0',
          color: mainDefaultThemeColors.disabledColor,
        },
        hover: {
          bgColor: 'transparent',
          border: '0',
          color: mainDefaultThemeColors.mainColor,
        },
      },
    },
    searchBar: {
      bgColor: color.palette.cloud,
      border: `2px solid ${mainDefaultThemeColors.mainColor}`,
      color: mainDefaultThemeColors.textColor,
      searchIcon: {
        color: mainDefaultThemeColors.mainColor,
      },
    },
    select: {
      bgColor: color.palette.cloud,
      borderBottomWidth: '2px',
      color: {
        default: mainDefaultThemeColors.secondaryGreyColor,
        disabled: mainDefaultThemeColors.disabledColor,
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
        hoverColor: Color(mainDefaultThemeColors.mainColor).lighten(0.7).hex(),
      },
      ul: {
        bgColor: color.palette.cloud,
        boxShadow: `0 1px 7px -1px ${mainDefaultThemeColors.secondaryGreyColor}`,
        scrollBar: {
          thumb: {
            bgColor: mainDefaultThemeColors.secondaryGreyColor,
          },
          track: {
            bgColor: color.palette.cloud,
            border: `1px solid ${mainDefaultThemeColors.secondaryGreyColor}`,
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
        color: mainDefaultThemeColors.heartColor,
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
    },
    tooltip: {
      fontSize: font.size.xs,
      fontWeight: font.weight.regular,
    },
    userProfileImage: {
      actionsWrapperBgColor: Color(
        mainDefaultThemeColors.mainColor,
      ).darken(0.9).alpha(0.7).string(),
      bgColor: Color(mainDefaultThemeColors.mainColor).lighten(0.6).hex(),
      border: `2px solid ${mainDefaultThemeColors.mainColor}`,
      errorMessage: {
        color: color.palette.chili,
        fontSize: font.size.xxs,
        fontWeight: font.weight.bold,
      },
    },
  },
  forms: {
    comment: {
      smileIcon: {
        color: mainDefaultThemeColors.secondaryGreyColor,
      },
      textarea: {
        borderBottomWidth: '2px',
        color: {
          default: mainDefaultThemeColors.secondaryGreyColor,
          disabled: mainDefaultThemeColors.disabledColor,
          focus: mainDefaultThemeColors.mainColor,
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
        color: mainDefaultThemeColors.secondaryGreyColor,
        fontSize: font.size.s,
      },
    },
  },
  global: {
    borderRadius: '4px',
    textSelectionColor: Color(
      mainDefaultThemeColors.mainColor,
    ).lighten(0.5).hex(),
  },
  htmlTags: {
    a: {
      color: mainDefaultThemeColors.mainColor,
      fontWeight: font.weight.medium,
    },
    blockquote: {
      bgColor: color.palette.cloud,
      borderLeftColor: mainDefaultThemeColors.mainColor,
      borderLeftWidth: '8px',
      textColor: color.palette.seal,
      textFontSize: font.size.m,
      quoteColor: mainDefaultThemeColors.mainColor,
      quoteFontSize: '4rem',
    },
    body: {
      background: `linear-gradient(
        ${color.palette.cloud},
        ${Color(color.palette.frenchRose).lighten(0.55).hex()}
      )`,
      color: mainDefaultThemeColors.textColor,
      filter: 'none',
      fontFamily: font.family.AlegreyaSans,
      fontSize: font.size.sm,
    },
    h: {
      color: mainDefaultThemeColors.mainColor,
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
      color: mainDefaultThemeColors.textColor,
    },
    textarea: {
      color: mainDefaultThemeColors.textColor,
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

const mainDarkThemeColors = {
  heartColor: color.palette.ferrari,
  textColor: color.palette.anchor,
  mainColor: color.palette.asphalt,
  disabledColor: color.palette.pearlRiver,

  // Used of icons
  mainGreyColor: color.palette.harborGray,

  // Default grey
  secondaryGreyColor: color.palette.lava,
};

const darkTheme = {
  name: 'dark',
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
        color: mainDarkThemeColors.mainGreyColor,
      },
      bgColor: color.palette.white,
      borderWidth: '1px',
    },
    button: {
      borderWidth: '2px',
      color: {
        default: mainDarkThemeColors.mainColor,
        disabled: mainDarkThemeColors.disabledColor,
      },
      filter: 'none',
      fontSize: font.size.m,
      fontWeight: font.weight.bold,
    },
    checkbox: {
      borderWidth: '2px',
      color: {
        checked: mainDarkThemeColors.mainColor,
        disabled: mainDarkThemeColors.disabledColor,
        error: color.palette.chili,
        unchecked: mainDarkThemeColors.secondaryGreyColor,
      },
      checkboxContent: {
        fontSize: '1.2em',
      },
      label: {
        fontSize: font.size.s,
      },
    },
    colorPicker: {
      color: mainDarkThemeColors.secondaryGreyColor,
      fontSize: font.size.s,
      fontWeight: font.weight.bold,
    },
    comment: {
      borderWidth: '2px',
      createdAtDate: {
        color: mainDarkThemeColors.secondaryGreyColor,
        fontSize: font.size.xxs,
      },
      username: {
        fontWeight: font.weight.medium,
      },
    },
    confirmationModal: {
      bgColor1: color.palette.white,
      bgColor2: Color(
        mainDarkThemeColors.mainColor,
      ).darken(0.7).alpha(0.7).string(),
    },
    emojiPicker: {
      bgColor: color.palette.cloud,
      boxShadow: `0 1px 7px 3px ${mainDarkThemeColors.secondaryGreyColor}`,
      emojiHoverColor: Color(
        mainDarkThemeColors.mainColor,
      ).lighten(0.7).hex(),
      label: {
        color: mainDarkThemeColors.secondaryGreyColor,
        fontSize: font.size.xs,
        fontWeight: font.weight.bold,
      },
      scrollBar: {
        thumb: {
          bgColor: mainDarkThemeColors.secondaryGreyColor,
          borderRadius: '1px',
        },
        track: {
          bgColor: 'transparent',
        },
      },
      searchInput: {
        bgColor: 'transparent',
        borderBottom: `2px solid ${mainDarkThemeColors.secondaryGreyColor}`,
        fontSize: font.size.s,
      },
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
        default: mainDarkThemeColors.secondaryGreyColor,
        disabled: mainDarkThemeColors.disabledColor,
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
      bgColor: Color(
        mainDarkThemeColors.mainColor,
      ).darken(0.7).alpha(0.7).string(),
      heartColor: color.palette.white,
      text: {
        color: color.palette.white,
        fontSize: '50px',
        fontWeight: font.weight.bold,
      },
    },
    post: {
      commentIcon: {
        color: mainDarkThemeColors.mainGreyColor,
      },
      createdAtDate: {
        dateFromNow: {
          color: mainDarkThemeColors.mainColor,
          fontSize: font.size.s,
          fontWeight: font.weight.bold,
        },
        longDate: {
          color: mainDarkThemeColors.secondaryGreyColor,
          fontSize: font.size.xxs,
        },
      },
      trashIcon: {
        color: mainDarkThemeColors.mainGreyColor,
      },
      likeHeartIcon: {
        likeColor: mainDarkThemeColors.heartColor,
        noLikeColor: mainDarkThemeColors.mainGreyColor,
      },
      seeOrHideComments: {
        color: mainDarkThemeColors.mainColor,
        fontWeight: font.weight.medium,
      },
      stats: {
        color: mainDarkThemeColors.secondaryGreyColor,
        fontSize: font.size.s,
      },
    },
    richTextEditor: {
      bgColor: color.palette.cloud,
      borderBottomWidth: '2px',
      color: {
        default: mainDarkThemeColors.secondaryGreyColor,
        disabled: mainDarkThemeColors.disabledColor,
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
      richUtilButton: {
        fontSize: font.size.xs,
        active: {
          bgColor: mainDarkThemeColors.mainColor,
          border: '0',
          color: color.palette.white,
        },
        default: {
          bgColor: 'transparent',
          border: '0',
          color: mainDarkThemeColors.secondaryGreyColor,
        },
        disabled: {
          bgColor: 'transparent',
          border: '0',
          color: mainDarkThemeColors.disabledColor,
        },
        hover: {
          bgColor: 'transparent',
          border: '0',
          color: mainDarkThemeColors.mainColor,
        },
      },
    },
    searchBar: {
      bgColor: color.palette.cloud,
      border: `2px solid ${mainDarkThemeColors.mainColor}`,
      color: mainDarkThemeColors.textColor,
      searchIcon: {
        color: mainDarkThemeColors.mainColor,
      },
    },
    select: {
      bgColor: color.palette.cloud,
      borderBottomWidth: '2px',
      color: {
        default: mainDarkThemeColors.secondaryGreyColor,
        disabled: mainDarkThemeColors.disabledColor,
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
        hoverColor: Color(mainDarkThemeColors.mainColor).lighten(0.7).hex(),
      },
      ul: {
        bgColor: color.palette.cloud,
        boxShadow: `0 1px 7px -1px ${mainDarkThemeColors.secondaryGreyColor}`,
        scrollBar: {
          thumb: {
            bgColor: mainDarkThemeColors.secondaryGreyColor,
          },
          track: {
            bgColor: color.palette.cloud,
            border: `1px solid ${mainDarkThemeColors.secondaryGreyColor}`,
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
        color: mainDarkThemeColors.heartColor,
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
    },
    tooltip: {
      fontSize: font.size.xs,
      fontWeight: font.weight.regular,
    },
    userProfileImage: {
      actionsWrapperBgColor: Color(
        mainDarkThemeColors.mainColor,
      ).darken(0.9).alpha(0.7).string(),
      bgColor: Color(mainDarkThemeColors.mainColor).lighten(0.6).hex(),
      border: `2px solid ${mainDarkThemeColors.mainColor}`,
      errorMessage: {
        color: color.palette.chili,
        fontSize: font.size.xxs,
        fontWeight: font.weight.bold,
      },
    },
  },
  forms: {
    comment: {
      smileIcon: {
        color: mainDarkThemeColors.secondaryGreyColor,
      },
      textarea: {
        borderBottomWidth: '2px',
        color: {
          default: mainDarkThemeColors.secondaryGreyColor,
          disabled: mainDarkThemeColors.disabledColor,
          focus: mainDarkThemeColors.mainColor,
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
        color: mainDarkThemeColors.secondaryGreyColor,
        fontSize: font.size.s,
      },
    },
  },
  global: {
    borderRadius: '4px',
    textSelectionColor: Color(
      mainDarkThemeColors.mainColor,
    ).lighten(0.5).hex(),
  },
  htmlTags: {
    a: {
      color: mainDarkThemeColors.mainColor,
      fontWeight: font.weight.medium,
    },
    blockquote: {
      bgColor: color.palette.cloud,
      borderLeftColor: mainDarkThemeColors.mainColor,
      borderLeftWidth: '8px',
      textColor: color.palette.seal,
      textFontSize: font.size.m,
      quoteColor: mainDarkThemeColors.mainColor,
      quoteFontSize: '4rem',
    },
    body: {
      background: color.palette.asphalt,
      color: mainDarkThemeColors.textColor,
      filter: 'none',
      fontFamily: font.family.AlegreyaSans,
      fontSize: font.size.sm,
    },
    h: {
      color: mainDarkThemeColors.mainColor,
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
      color: mainDarkThemeColors.textColor,
    },
    textarea: {
      color: mainDarkThemeColors.textColor,
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

export default [defaultTheme, darkTheme];
