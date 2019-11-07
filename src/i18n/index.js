import flatten from 'flat';

const messages = {
  en: flatten({
    components: {
      confirmationModal: {
        buttons: {
          defaultCancel: 'Cancel',
          defaultConfirm: 'Confirm',
        },
      },
      emoji: {
        labelSuffix: 'Emoji',
      },
      header: {
        logoImageAlt: 'Spacebox logo',
        links: {
          home: 'Home',
          createSpacebox: 'Create Spacebox',
          account: 'Account',
          admin: 'ADMIN',
          signOut: 'Sign out',
          faq: 'WT#?',
          signUp: 'Sign up',
          signIn: 'Sign in',
        },
        searchBar: {
          placeholder: 'Search',
        },
      },
      post: {
        comment: {
          postAuthor: 'Post author',
        },
        successDeletePostAlertMessage: 'The post has been deleted.',
        iconsTooltips: {
          needLoggedInToLike: 'You need to be logged in to like a post',
          needValidateEmailToLike: 'You need to validate your e-mail to like a post',
          needLoggedInToComment: 'You need to be logged in to make a comment',
          needValidateEmailToComment: 'You need to validate your e-mail to make a comment',
          deletePost: 'Delete post',
        },
        seeCommentsText: 'See comments ({remainingComments})...',
        hideCommentsText: 'Hide comments...',
      },
      signInWithButton: {
        signInWithText: 'Sign in with {account}',
      },
      spaceboxInfoSection: {
        categoryTitle: 'Category: ',
        buttons: {
          editSpacebox: 'Edit Spacebox',
          goToUserProfile: 'Go to user profile',
          goBack: 'Go back',
          goToSpacebox: 'Go to Spacebox',
        },
      },
      wizard: {
        buttons: {
          start: 'Start',
          previousStep: 'Back',
          nextStep: 'Next',
          finish: 'Finish',
        },
      },
    },
    constants: {
      categories: {
        architecture: 'Architecture',
        cars: 'Cars',
        computing: 'Computing',
        cooking: 'Cooking',
        events: 'Events',
        fashion: 'Fashion',
        future: 'Future',
        gaming: 'Gaming',
        lifestyle: 'Lifestyle',
        love: 'Love',
        medicine: 'Medicine',
        moviesAndTv: 'Movies and TV programs',
        music: 'Music',
        nature: 'Nature',
        news: 'News',
        nightlife: 'Nightlife',
        poetry: 'Poetry',
        politics: 'Politics',
        religion: 'Religion',
        sports: 'Sports',
        technology: 'Technology',
        travel: 'Travel',
        other: 'Other',
      },
      errors: {
        firebase: {
          accountExists: 'An account with an E-Mail address to this social account already exists. Try to login from this account instead and associate your social accounts on your personal account page.',
          wrongPassword: 'Your current password is wrong',
        },
      },
    },
    forms: {
      comment: {
        contentTextareaPlaceholder: 'Make a comment...',
        submitButton: 'Comment',
      },
      createSpacebox: {
        successAlertMessage: 'Your Spacebox was successfully created. Enjoy!',
        defaultDescriptionValue: 'Description',
        defaultTitleValue: 'Title',
        labels: {
          backgroundColorPicker: 'Background',
          textColorPicker: 'Text',
          titleInput: 'Title',
          descriptionInput: 'Description',
          categorySelect: 'Category',
          visibleCheckbox: 'Visible on home page',
        },
        step1: {
          h2: 'Step 1: colors',
          p: 'Background and Text color of the box. We recommend you to choose combination of colors with contrast that are pleasing to the eye.',
        },
        step2: {
          h2: 'Step 2: title and description',
          p: 'Keep in mind that if the title or description of your space is too long, it will not be shown completely.',
        },
        step3: {
          h2: 'Step 3: category and visible',
          p: 'Choose carefully the category of your Spacebox, since in case you decide that it is visible on the home page, other users will filter by category to quickly find what they want to read.',
        },
      },
      editSpacebox: {
        successAlertMessage: 'Your Spacebox was successfully updated.',
        labels: {
          backgroundColorPicker: 'Background',
          textColorPicker: 'Text',
          titleInput: 'Title',
          descriptionInput: 'Description',
          categorySelect: 'Category',
          visibleCheckbox: 'Visible on home page',
        },
        cancelButton: 'Cancel',
        submitButton: 'Save',
      },
      passwordChange: {
        successAlertMessage: 'Your password was successfully updated.',
        reachedMaxCurrentPasswordAttempsAlertMessage: 'You reached the limit of attempts to enter your current password, please try again later.',
        labels: {
          passwordOneInput: 'New password',
          passwordTwoInput: 'Confirm password',
          passwordInput: 'Your current password',
        },
        submitButton: 'Update',
      },
      passwordForget: {
        successAlertMessage: 'We sent you an e-mail so you can reset your password. We hope everything goes well!',
        emailInputLabel: 'E-mail',
        submitButton: 'Send',
      },
      passwordLink: {
        successAlertMessage: 'Congratulations! You just linked a password to your account.',
        labels: {
          passwordOneInput: 'New password',
          passwordTwoInput: 'Confirm password',
        },
        submitButton: 'Done',
      },
      post: {
        labels: {
          title: 'Title',
          content: 'Content',
        },
        submitButton: 'Post',
      },
      signIn: {
        labels: {
          emailInput: 'E-mail',
          passwordInput: 'Password',
          rememberAccessCheckbox: 'Remember this access',
        },
        forgotPasswordLink: 'Forgot password?',
        submitButton: 'Sign in',
      },
      signUp: {
        successAlertMessage: 'Welcome to Spacebox! Please, follow the instructions that you received in your e-mail account in order to enjoy 100% of Spacebox.',
        labels: {
          usernameInput: 'Name or Username',
          emailInput: 'E-mail',
          passwordOneInput: 'Password',
          passwordTwoInput: 'Confirm your password',
        },
        termsOfUseNotice: 'By signing up, you are accepting our {termsOfUseLink}.',
        links: {
          termsOfUse: 'Terms of Use',
          signIn: 'Sign in instead?',
        },
        submitButton: 'Sign up',
      },
    },
    pages: {
      account: {
        general: {
          title: 'General - Spacebox',
          h1: 'General',
        },
        changePassword: {
          title: 'Change password - Spacebox',
          h1: 'Change password',
          changePasswordSubtitle: 'Complete the following inputs to change your password. Don\'t forget your current one, just in case ',
          changePasswordSubtitleEmojiLabel: 'Slightly Smiling Face',
          linkPasswordSubtitle: 'You don\'t have a password linked to your account, but let\'s do that right now.',
        },
        loginManagement: {
          title: 'Login management - Spacebox',
          h1: 'Login management',
          subtitle: 'Manage how you sign in and link your social media accounts.',
          buttons: {
            loading: '...',
            link: 'Link',
            unlink: 'Unlink',
          },
          signInMethods: {
            password: 'Password',
            google: 'Google',
            facebook: 'Facebook',
            twitter: 'Twitter',
          },
          successLinkAlertMessage: 'Congratulations! You just linked your {provider} account.',
          successUnlinkAlertMessage: 'Your {provider} account has been unlinked.',
        },
        sidebarContent: {
          section1: {
            heading: 'Account',
            links: {
              general: 'General',
              changePassword: 'Change password',
              loginManagement: 'Login management',
            },
          },
        },
      },
      admin: {
        title: 'Admin - Spacebox',
        sidebarContent: {
          section1: {
            heading: 'User(s)',
            links: {
              listOfUsers: 'List of users',
              findUser: 'Find user',
            },
          },
          section2: {
            heading: 'Spacebox(es)',
            links: {
              listOfSpaceboxes: 'List of Spaceboxes',
              findSpacebox: 'Find Spacebox',
            },
          },
        },
      },
      createSpacebox: {
        title: 'Create Spacebox - Spacebox',
        h1: 'Create Spacebox',
      },
      editSpacebox: {
        title: 'Edit Spacebox - Spacebox',
        h1: 'Edit Spacebox',
        deleteSpacebox: {
          triggerElementText: 'delete Spacebox',
          confirmationModal: {
            title: 'Delete Spacebox',
            content: 'Are you 100% sure about this?',
          },
          successAlertMessage: 'Your Spacebox {spaceboxTitle} has been deleted.',
        },
      },
      faq: {
        title: 'WT#? - Spacebox',
        h1: 'What is this all about?',
        p1: 'Spacebox is a platform designed for two types of people: those who like to write and those who like to read what other people write.',
        p2: 'On the home page you can filter the spaces depending on what you want to read, the idea is that you always find content that you find interesting.',
        p3: 'If you want to create your own space and start writing or maybe just make a comment in the space of another person, you can {signUpLink} (don\'t worry, is free) or {signInLink} using your favorite social media account.',
        p4: 'At the moment of thinking about the idea of creating this page I thought it would be longer, but I\'m running out of imagination so... I think this is it ',
        p4EmojiLabel: 'Face Neutral Skeptical',
        links: {
          signUp: 'create an account',
          signIn: 'sign in',
          home: 'Enjoy!',
        },
      },
      home: {
        title: {
          home: 'Home - Spacebox',
          search: 'Search results - Spacebox',
        },
        informativeSpaceboxTitles: {
          loading: 'Loading...',
          error: 'ERROR.',
        },
      },
      notFound: {
        title: '404 - Spacebox',
        randomEmojiLabels: {
          emoji1: 'Face Without Mouth',
          emoji2: 'Anguished Face',
          emoji3: 'Grimacing Face',
          emoji4: 'Pensive Face',
          emoji5: 'Dizzy Face',
          emoji6: 'Face Screaming In Fear',
        },
        content: 'This is embarrasing but... {boldPieceOfContent}',
        boldPieceOfContent: 'this page was not found.',
      },
      passwordForget: {
        title: 'Forgot password - Spacebox',
        p: 'Please enter the e-mail adress of your account.',
      },
      post: {
        title: '{postTitle} - Spacebox',
      },
      signIn: {
        title: 'Sign in - Spacebox',
      },
      signUp: {
        title: 'Sign up - Spacebox',
        h1: 'Good choice.',
      },
      space: {
        title: '{spaceboxTitle} - Spacebox',
        noPostsText: {
          authUserIsTheOwner: 'You haven\'t made any post yet.',
          authUserIsNotTheOwner: 'The writer of this Spacebox hasn\'t made any post yet.',
        },
        postsHistory: {
          boxCollapseTitle: '<h3>Posts history</h3>',
          h3: '<h3>Posts history</h3>',
        },
      },
      verifyEmail: {
        title: 'Verify e-mail - Spacebox',
        h1: 'Verify your e-mail',
        p1: 'Please verify the e-mail of your account in order to access this page.',
        p2: 'Once you press the button below you will receive an e-mail in ',
        submitButton: 'Send',
        successAlertMessage: 'We sent you an e-mail so you can verify your account. We hope everything goes well!',
      },
    },
    yup: {
      emailInvalid: 'Please check your e-mail',
      minimumCharacters: 'The minimum of characters for this field is {characters}',
      maximumCharacters: 'The maximum of characters for this field is {characters}',
      passwordsMustMatch: 'Passwords must match',
      required: 'This field is required!',
    },
  }),
  es: {},
};

messages.es = messages.en;

export default messages;
