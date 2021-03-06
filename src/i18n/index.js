import flatten from 'flat';

import { SUPPORTED_LOCALES } from '../constants';

export default {
  [SUPPORTED_LOCALES.EN]: flatten({
    components: {
      confirmationModal: {
        buttons: {
          defaultCancel: 'Cancel',
          defaultConfirm: 'Confirm',
        },
      },
      emojiPicker: {
        recentlyUsedEmojisLabel: 'Recent Emojis',
        allEmojisLabel: 'All Emojis',
        searchResultsLabel: 'Search results',
        searchInputPlaceholder: 'Search a Emoji',
      },
      header: {
        logoImageAlt: 'Spacebox logo',
        links: {
          home: 'Home',
          createSpacebox: 'Create Spacebox',
          account: 'Account',
          signOut: 'Sign out',
          faq: 'WT#?',
          signUp: 'Sign up',
          signIn: 'Sign in',
        },
        searchBar: {
          placeholder: 'Search',
        },
      },
      loadingScreen: {
        text: 'Loading',
      },
      post: {
        comment: {
          postAuthor: 'Post author',
        },
        postLink: {
          label: 'Link',
        },
        deletePost: {
          successAlertMessage: 'The post has been deleted.',
          confirmationModal: {
            title: 'Delete post',
            content: 'Please confirm this action.',
          },
        },
        iconsTooltips: {
          needLoggedInToLike: 'You need to be logged in to like a post',
          needValidateEmailToLike:
            'You need to validate your e-mail address to like a post',
          needLoggedInToComment: 'You need to be logged in to make a comment',
          needValidateEmailToComment:
            'You need to validate your e-mail address to make a comment',
          deletePost: 'Delete post',
        },
        seeCommentsText: 'See comments ({remainingComments})...',
        hideCommentsText: 'Hide comments...',
      },
      postsHistory: {
        boxCollapseTitle: '<h3>History</h3>',
      },
      richTextEditor: {
        richUtilButton: {
          bold: '<b>B</b>',
          italic: '<i>I</i>',
          underline: '<u>U</u>',
          strikethrough: '<s>S</s>',
          highlight: 'highlight',
          h1: 'H1',
          h2: 'H2',
          h3: 'H3',
          blockquote: 'blockquote',
          ol: 'ol',
          ul: 'ul',
        },
      },
      signInWithButton: {
        signInWithText: 'Sign in with {account}',
      },
      spaceboxInfoBox: {
        categoryTitle: 'Category: ',
      },
      userProfileImage: {
        altImage: 'User profile image',
        changeImageButton: 'Change image',
        uploadNewImageButton: 'New image',
        removeImageButton: 'Remove image',
        badFileTypeErrorMessage: 'You can only upload images!',
        badFileSizeErrorMessage: 'Image size cannot be larger than 10mb',
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
        other: 'Other category',
      },
      errors: {
        firebase: {
          accountExists:
            'An account with an e-mail address to this social media account already exists. Try to login from this account instead and associate your social media accounts on your personal account page.',
          wrongPassword: 'Your current password is wrong',
        },
      },
      languages: {
        en: 'English',
        es: 'Spanish',
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
          p:
            'Background and Text color of the box. We recommend you to choose combination of colors with contrast that are pleasing to the eye.',
        },
        step2: {
          h2: 'Step 2: title and description',
          p:
            'Keep in mind that if the title or description of your Spacebox is too long, it will not be shown completely.',
        },
        step3: {
          h2: 'Step 3: category and visible',
          p:
            'Choose carefully the category of your Spacebox, since in case you decide that it is visible on the home page, other users will filter by category to quickly find what they want to read.',
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
        cancelButton: 'Back',
        submitButton: 'Save',
      },
      generalSettings: {
        successAlertMessage: 'Your information has been successfully saved.',
        labels: {
          usernameInput: 'Name or Username',
          emailInput: 'E-mail address',
          bioTextarea: 'Something about you',
          languageSelect: 'Language',
        },
        submitButton: 'Save',
      },
      passwordChange: {
        successAlertMessage: 'Your password was successfully updated.',
        reachedMaxCurrentPasswordAttempsAlertMessage:
          'You reached the limit of attempts to enter your current password, please try again later.',
        labels: {
          passwordOneInput: 'New password',
          passwordTwoInput: 'Confirm password',
          passwordInput: 'Your current password',
        },
        submitButton: 'Done',
      },
      passwordForget: {
        successAlertMessage:
          'We sent you an e-mail so you can reset your password. We hope everything goes well!',
        emailInputLabel: 'E-mail address',
        backButton: 'Back',
        submitButton: 'Send',
      },
      passwordLink: {
        successAlertMessage:
          'Congratulations! You just linked a password to your account.',
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
          emailInput: 'E-mail address',
          passwordInput: 'Password',
          rememberAccessCheckbox: 'Remember this access',
        },
        signUpLink: 'Want to sign up?',
        forgotPasswordLink: 'Forgot password?',
        submitButton: 'Sign in',
      },
      signUp: {
        successAlertMessage:
          'Welcome to Spacebox! Please, follow the instructions that you received in your e-mail address in order to enjoy 100% of Spacebox.',
        labels: {
          usernameInput: 'Name or Username',
          emailInput: 'E-mail address',
          passwordOneInput: 'Password',
          passwordTwoInput: 'Confirm your password',
        },
        termsOfUseNotice:
          'By signing up, you are accepting our {termsOfUseLink}.',
        links: {
          termsOfUse: 'Terms of Use',
          signIn: 'Sign in instead?',
        },
        submitButton: 'Sign up',
      },
    },
    pages: {
      account: {
        title: 'Account - Spacebox',
        h2: 'Account',
        generalSettings: {
          h3: 'General settings',
          subtitle: 'Update your personal information.',
        },
        changePassword: {
          h3: 'Change password',
          subtitle: 'Complete the following inputs to change your password.',
          reachedMaxCurrentPasswordAttempsSubtitle:
            "Right now you can't change your password as you reached the limit of attempts to enter your current one, please try again later.",
        },
        loginManagement: {
          h3: 'Login management',
          subtitle:
            'Manage how you sign in and link your social media accounts.',
          buttons: {
            loading: '...',
            link: 'Link',
            unlink: 'Unlink',
          },
          signInMethods: {
            password: 'Password',
          },
          successLinkAlertMessage:
            'Congratulations! You just linked your {provider} account.',
          successUnlinkAlertMessage:
            'Your {provider} account has been unlinked.',
          successPasswordUnlinkAlertMessage:
            'Your password has been unlinked and removed.',
        },
        sidebarContent: {
          section1: {
            heading: 'Account',
            links: {
              generalSettings: 'General settings',
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
          section3: {
            heading: 'Global Messaging',
            links: {
              newGlobalMessage: 'New global message',
              allGlobalMessages: 'List of global messages',
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
          successAlertMessage:
            'Your Spacebox {spaceboxTitle} has been deleted.',
        },
      },
      faq: {
        title: 'WT#? - Spacebox',
        h1: 'What is this all about?',
        p1:
          'Spacebox is a platform designed for two types of people: those who like to write and those who like to read what other people write.',
        p2:
          'On the home page you can filter the spaces depending on what you want to read, the idea is that you always find content that you find interesting.',
        p3:
          "If you want to create your own space and start writing or maybe just make a comment in the space of another person, you can {signUpLink} (don't worry, is free) or {signInLink} using your favorite social media account.",
        p4:
          "At the moment of thinking about the idea of creating this page I thought it would be longer, but I'm running out of imagination so... I think this is it ",
        p4EmojiLabel: 'face Neutral skeptical emoji',
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
          error: 'ERROR! Sorry.',
          resultsCount: '{count} results',
          noResults: 'No results',
        },
      },
      notFound: {
        title: '404 - Spacebox',
        randomEmojiLabels: {
          emoji1: 'face without mouth emoji',
          emoji2: 'anguished face emoji',
          emoji3: 'grimacing face emoji',
          emoji4: 'pensive face emoji',
          emoji5: 'dizzy face emoji',
          emoji6: 'face screaming in fear emoji',
        },
        content: 'This is embarrasing but... {boldPieceOfContent}',
        boldPieceOfContent: 'this page was not found.',
      },
      passwordForget: {
        title: 'Reset password - Spacebox',
        p: 'Please enter the e-mail address of your account.',
      },
      signIn: {
        title: 'Sign in - Spacebox',
      },
      signUp: {
        title: 'Sign up - Spacebox',
        h1: 'Good choice.',
      },
      space: {
        title: '{title} - Spacebox',
        buttons: {
          editSpacebox: 'Edit Spacebox',
          followSpacebox: 'Follow',
          unfollowSpacebox: 'Unfollow',
          newPost: 'Create a new post',
          userProfile: "Writer's profile",
          userProfileAuthUser: 'My profile',
        },
        noPostsText: "The writer of this Spacebox hasn't made any post yet.",
        noPostsTextAuthUser: "You haven't made any post yet.",
        postNotFoundAlertMessage:
          "We couldn\t find the post you wanted to see, but we send you to the Spacebox! it's something...",
        spaceboxNotFoundAlertMessage:
          "We couldn't find the Spacebox you wanted to see so we send you to the home page. Sorry!",
      },
      test: {
        testAlertMessage: '{value1}, {value2}, <b>{value3}</b>',
      },
      verifyEmail: {
        title: 'Verify e-mail address - Spacebox',
        h1: 'Verify e-mail address',
        p1:
          'Please verify the e-mail address of your account in order to access this page.',
        p2: 'Once you press the button below you will receive an e-mail in ',
        submitButton: 'Send',
        successAlertMessage:
          'We sent you an e-mail so you can verify your account. We hope everything goes well!',
      },
    },
    yup: {
      emailInvalid: 'Please check your e-mail address',
      minimumCharacters:
        'The minimum of characters for this field is {characters}',
      maximumCharacters:
        'The maximum of characters for this field is {characters}',
      passwordsMustMatch: 'Passwords must match',
      required: 'This field is required!',
    },
  }),
  [SUPPORTED_LOCALES.ES]: flatten({
    components: {
      confirmationModal: {
        buttons: {
          defaultCancel: 'Cancelar',
          defaultConfirm: 'Confirmar',
        },
      },
      emojiPicker: {
        recentlyUsedEmojisLabel: 'Emojis recientes',
        allEmojisLabel: 'Todos los emojis',
        searchResultsLabel: 'Resultados de la búsqueda',
        searchInputPlaceholder: 'Buscar un Emoji',
      },
      header: {
        logoImageAlt: 'Logo de Spacebox',
        links: {
          home: 'Inicio',
          createSpacebox: 'Crear Spacebox',
          account: 'Cuenta',
          signOut: 'Salir',
          faq: 'WT#?',
          signUp: 'Registro',
          signIn: 'Ingreso',
        },
        searchBar: {
          placeholder: 'Buscar',
        },
      },
      loadingScreen: {
        text: 'Cargando',
      },
      post: {
        comment: {
          postAuthor: 'Autor de la publicación',
        },
        postLink: {
          label: 'Enlace',
        },
        deletePost: {
          successAlertMessage: 'La publicación fue eliminada.',
          confirmationModal: {
            title: 'Eliminar publicación',
            content: 'Por favor confirma esta acción.',
          },
        },
        iconsTooltips: {
          needLoggedInToLike:
            'Debes ingresar a tu cuenta para indicar que te gusta una publicación',
          needValidateEmailToLike:
            'Debes validar tu dirección correo electrónico para indicar que te gusta una publicación',
          needLoggedInToComment:
            'Debes ingresar a tu cuenta para hacer un comentario',
          needValidateEmailToComment:
            'Debes validar tu dirección de correo electrónico para hacer un comentario',
          deletePost: 'Eliminar publicación',
        },
        seeCommentsText: 'Mostrar comentarios ({remainingComments})...',
        hideCommentsText: 'Ocultar comentarios...',
      },
      postsHistory: {
        boxCollapseTitle: '<h3>Historial</h3>',
      },
      richTextEditor: {
        richUtilButton: {
          bold: '<b>B</b>',
          italic: '<i>I</i>',
          underline: '<u>U</u>',
          strikethrough: '<s>S</s>',
          highlight: 'resaltar',
          h1: 'H1',
          h2: 'H2',
          h3: 'H3',
          blockquote: 'cita',
          ol: 'ol',
          ul: 'ul',
        },
      },
      signInWithButton: {
        signInWithText: 'Ingresar con {account}',
      },
      spaceboxInfoBox: {
        categoryTitle: 'Categoría: ',
      },
      userProfileImage: {
        altImage: 'Imagen de perfil del usuario',
        changeImageButton: 'Cambiar imagen',
        uploadNewImageButton: 'Nueva imagen',
        removeImageButton: 'Eliminar imagen',
        badFileTypeErrorMessage: 'Solo puedes cargar imágenes!',
        badFileSizeErrorMessage:
          'El tamaño de la imagen no puede ser mayor a 10mb',
      },
      wizard: {
        buttons: {
          start: 'Comenzar',
          previousStep: 'Volver',
          nextStep: 'Siguiente',
          finish: 'Finalizar',
        },
      },
    },
    constants: {
      categories: {
        architecture: 'Arquitectura',
        cars: 'Autos',
        computing: 'Informática',
        cooking: 'Cocina',
        events: 'Eventos',
        fashion: 'Moda',
        future: 'Futuro',
        gaming: 'Gaming',
        lifestyle: 'Estilo de vida',
        love: 'Amor',
        medicine: 'Medicina',
        moviesAndTv: 'Películas y series',
        music: 'Música',
        nature: 'Naturaleza',
        news: 'Noticias',
        nightlife: 'Vida nocturna',
        poetry: 'Poesía',
        politics: 'Política',
        religion: 'Religión',
        sports: 'Deportes',
        technology: 'Tecnología',
        travel: 'Viajes',
        other: 'Otra categoría',
      },
      errors: {
        firebase: {
          accountExists:
            'Ya existe una cuenta con una dirección de correo electrónico para esta cuenta de red social. Intente iniciar sesión desde esta cuenta y asocie sus cuentas de redes sociales en la página de tu cuenta personal.',
          wrongPassword: 'Tu contraseña actual es incorrecta',
        },
      },
      languages: {
        en: 'Inglés',
        es: 'Español',
      },
    },
    forms: {
      comment: {
        contentTextareaPlaceholder: 'Haz un comentario...',
        submitButton: 'Comentar',
      },
      createSpacebox: {
        successAlertMessage:
          'Tu Spacebox fue exitosamente creado. ¡Que lo disfrutes!',
        defaultDescriptionValue: 'Descripción',
        defaultTitleValue: 'Título',
        labels: {
          backgroundColorPicker: 'Fondo',
          textColorPicker: 'Texto',
          titleInput: 'Título',
          descriptionInput: 'Descripción',
          categorySelect: 'Categoría',
          visibleCheckbox: 'Visible en página de inicio',
        },
        step1: {
          h2: 'Paso 1: colores',
          p:
            'Color de fondo y de texto de la caja. Te recomendamos elegir una combinación de colores con contraste que sea placentera al ojo.',
        },
        step2: {
          h2: 'Paso 2: título y descripción',
          p:
            'Ten en cuenta que si el título o la descripción de tu Spacebox es muy larga, no será mostrada completamente.',
        },
        step3: {
          h2: 'Paso 3: categoría y visible',
          p:
            'Elige cuidadosamente la categoría de tu Spacebox, ya que en caso de que decidas que el mismo sea visible en la página de inicio, otros usuarios filtrarán por categoría para encontrar rápidamente lo que quieran leer.',
        },
      },
      editSpacebox: {
        successAlertMessage: 'Tu Spacebox fue exitosamente actualizado.',
        labels: {
          backgroundColorPicker: 'Fondo',
          textColorPicker: 'Texto',
          titleInput: 'Título',
          descriptionInput: 'Descripción',
          categorySelect: 'Categoría',
          visibleCheckbox: 'Visible en página de inicio',
        },
        cancelButton: 'Volver',
        submitButton: 'Guardar',
      },
      generalSettings: {
        successAlertMessage: 'Tu información fue exitosamente guardada.',
        labels: {
          usernameInput: 'Nombre de usuario',
          emailInput: 'Dirección de correo electrónico',
          bioTextarea: 'Algo acerca de ti',
          languageSelect: 'Idioma',
        },
        submitButton: 'Guardar',
      },
      passwordChange: {
        successAlertMessage: 'Tu contraseña fue exitosamente actualizada.',
        reachedMaxCurrentPasswordAttempsAlertMessage:
          'Alcanzaste el límite de intentos para ingresar tu contraseña actual, por favor intenta más tarde.',
        labels: {
          passwordOneInput: 'Nueva contraseña',
          passwordTwoInput: 'Confirmar contraseña',
          passwordInput: 'Tu contraseña actual',
        },
        submitButton: 'Hecho',
      },
      passwordForget: {
        successAlertMessage:
          'Te enviamos un correo electrónico para que puedas restablecer tu contraseña. ¡Esperamos que todo salga bien!',
        emailInputLabel: 'Dirección de correo electrónico',
        backButton: 'Volver',
        submitButton: 'Enviar',
      },
      passwordLink: {
        successAlertMessage:
          '¡Felicitaciones! Acabas de vincular una contraseña a tu cuenta.',
        labels: {
          passwordOneInput: 'Nueva contraseña',
          passwordTwoInput: 'Confirmar contraseña',
        },
        submitButton: 'Hecho',
      },
      post: {
        labels: {
          title: 'Título',
          content: 'Contenido',
        },
        submitButton: 'Publicar',
      },
      signIn: {
        labels: {
          emailInput: 'Dirección de correo electrónico',
          passwordInput: 'Contraseña',
          rememberAccessCheckbox: 'Recordar este acceso',
        },
        signUpLink: '¿Quieres registrarte?',
        forgotPasswordLink: '¿Olvidaste tu contraseña?',
        submitButton: 'Ingresar',
      },
      signUp: {
        successAlertMessage:
          '¡Bienvenido a Spacebox! Sigue las instrucciones que recibiste en tu dirección de correo electrónico para disfrutar al 100% de Spacebox.',
        labels: {
          usernameInput: 'Nombre de usuario',
          emailInput: 'Dirección de correo electrónico',
          passwordOneInput: 'Contraseña',
          passwordTwoInput: 'Confirma tu contraseña',
        },
        termsOfUseNotice: 'Al registrarte, aceptas nuestros {termsOfUseLink}.',
        links: {
          termsOfUse: 'Términos de Uso',
          signIn: '¿Ya tienes una cuenta?',
        },
        submitButton: 'Registrarse',
      },
    },
    pages: {
      account: {
        title: 'Cuenta - Spacebox',
        h2: 'Cuenta',
        generalSettings: {
          h3: 'Ajustes generales',
          subtitle: 'Actualiza tu información personal.',
        },
        changePassword: {
          h3: 'Cambiar contraseña',
          subtitle:
            'Completa los siguientes campos para cambiar tu contraseña.',
          reachedMaxCurrentPasswordAttempsSubtitle:
            'Ahora mismo no puedes cambiar tu contraseña ya que alcanzaste el límite de intentos para ingresar tu contraseña actual, por favor intenta más tarde.',
        },
        loginManagement: {
          h3: 'Inicio de sesión',
          subtitle:
            'Administra cómo iniciar sesión y vincula tus cuentas de redes sociales.',
          buttons: {
            loading: '...',
            link: 'Vincular',
            unlink: 'Desvincular',
          },
          signInMethods: {
            password: 'Contraseña',
          },
          successLinkAlertMessage:
            '¡Felicitaciones! Acabas de vincular tu cuenta de <b>{provider}</b>',
          successUnlinkAlertMessage:
            'Tu cuenta de <b>{provider}</b> fue desvinculada.',
          successPasswordUnlinkAlertMessage:
            'Tu contraseña fue desvinculada y eliminada.',
        },
        sidebarContent: {
          section1: {
            heading: 'Cuenta',
            links: {
              generalSettings: 'Ajustes generales',
              changePassword: 'Cambiar contraseña',
              loginManagement: 'Inicio de sesión',
            },
          },
        },
      },
      admin: {
        title: 'Admin - Spacebox',
        sidebarContent: {
          section1: {
            heading: 'Usuario(s)',
            links: {
              listOfUsers: 'Lista de usuarios',
              findUser: 'Buscar usuario',
            },
          },
          section2: {
            heading: 'Spacebox(es)',
            links: {
              listOfSpaceboxes: 'Lista de Spaceboxes',
              findSpacebox: 'Buscar Spacebox',
            },
          },
          section3: {
            heading: 'Mensajes Globales',
            links: {
              newGlobalMessage: 'Crear mensaje global',
              allGlobalMessages: 'Lista de mensajes globales',
            },
          },
        },
      },
      createSpacebox: {
        title: 'Crear Spacebox - Spacebox',
        h1: 'Crear Spacebox',
      },
      editSpacebox: {
        title: 'Editar Spacebox - Spacebox',
        h1: 'Editar Spacebox',
        deleteSpacebox: {
          triggerElementText: 'eliminar Spacebox',
          confirmationModal: {
            title: 'Eliminar Spacebox',
            content: '¿Estás completamente seguro de esto?',
          },
          successAlertMessage: 'Tu Spacebox {spaceboxTitle} fue eliminado.',
        },
      },
      faq: {
        title: 'WT#? - Spacebox',
        h1: '¿De qué se trata todo esto?',
        p1:
          'Spacebox es una plataforma diseñada para dos tipos de personas: las que les gusta escribir y las que les gusta leer lo que otras personas escriben.',
        p2:
          'En la página de inicio puedes filtrar los espacios según lo que quieras leer, la idea es que siempre encuentres contenido que te parezca interesante.',
        p3:
          'Si deseas crear tu propio espacio y comenzar a escribir o simplemente hacer un comentario en el espacio de otra persona, puedes {signUpLink} (no te preocupes, es gratis) o {signInLink} utilizando tu cuenta de red social favorita.',
        p4:
          'En el momento de pensar en la idea de crear esta página, pensé que sería más largo, pero me estoy quedando sin imaginación, así que... creo que eso es todo ',
        p4EmojiLabel: 'emoji de cara neutral escéptica',
        links: {
          signUp: 'crear una cuenta',
          signIn: 'ingresar',
          home: '¡Que lo disfrutes!',
        },
      },
      home: {
        title: {
          home: 'Inicio - Spacebox',
          search: 'Resultados de la búsqueda - Spacebox',
        },
        informativeSpaceboxTitles: {
          loading: 'Cargando...',
          error: 'ERROR! Lo sentimos.',
          resultsCount: '{count} resultados',
          noResults: 'No hay resultados',
        },
      },
      notFound: {
        title: '404 - Spacebox',
        randomEmojiLabels: {
          emoji1: 'emoji de cara sin boca',
          emoji2: 'emoji de cara angustiada',
          emoji3: 'emoji de cara que hace muecas',
          emoji4: 'emoji de cara pensativa',
          emoji5: 'emoji de cara mareada',
          emoji6: 'emoji de cara gritando de miedo',
        },
        content: 'Esto es vergonzoso pero... {boldPieceOfContent}',
        boldPieceOfContent: 'esta página no fue encontrada.',
      },
      passwordForget: {
        title: 'Restablecer contraseña - Spacebox',
        p: 'Por favor ingresa la dirección de correo electrónico de tu cuenta.',
      },
      signIn: {
        title: 'Ingreso - Spacebox',
      },
      signUp: {
        title: 'Registro - Spacebox',
        h1: 'Buena elección.',
      },
      space: {
        title: '{title} - Spacebox',
        buttons: {
          editSpacebox: 'Editar Spacebox',
          followSpacebox: 'Seguir',
          unfollowSpacebox: 'Dejar de seguir',
          newPost: 'Nueva publicación',
          userProfile: 'Perfil del escritor',
          userProfileAuthUser: 'Mi perfil',
        },
        noPostsText:
          'El escritor de este Spacebox aún no realizó ninguna publicación.',
        noPostsTextAuthUser: 'Aún no realizaste ninguna publicación.',
        postNotFoundAlertMessage:
          'No pudimos encontrar la publicación que querías ver, pero te enviamos al Spacebox. Algo es algo...',
        spaceboxNotFoundAlertMessage:
          'No pudimos encontrar el Spacebox que querías ver así que te enviamos a la página de inicio. ¡Lo sentimos!',
      },
      test: {
        testAlertMessage: '{value1}, {value2}, <b>{value3}</b>',
      },
      verifyEmail: {
        title: 'Verificar dirección de correo electrónico - Spacebox',
        h1: 'Verificar dirección de correo electrónico',
        p1:
          'Verifica el correo electrónico de tu cuenta para acceder a esta página.',
        p2:
          'Una vez que presiones el botón a continuación, recibirás un correo electrónico en ',
        submitButton: 'Enviar',
        successAlertMessage:
          'Te enviamos un correo electrónico para que puedas verificar tu cuenta. ¡Esperamos que todo salga bien!',
      },
    },
    yup: {
      emailInvalid: 'Revisa tu dirección de correo electrónico',
      minimumCharacters:
        'El mínimo de caracteres para este campo es {characters}',
      maximumCharacters:
        'El máximo de caracteres para este campo es {characters}',
      passwordsMustMatch: 'Las contraseñas deben coincidir',
      required: '¡Este campo es requerido!',
    },
  }),
};
