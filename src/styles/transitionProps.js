export default {
  components: {
    alert: {
      from: {
        marginTop: '-70px',
      },
      enter: {
        marginTop: '0',
      },
      leave: {
        marginTop: '-70px',
      },
      config: {
        mass: 1,
        tension: 600,
        friction: 42,
      },
    },
    confirmationModal: {
      from: {
        opacity: '1',
      },
      enter: {
        opacity: '1',
      },
      leave: {
        opacity: '0',
      },
      config: {
        duration: 100,
      },
    },
    globalMessage: {
      postLink: {
        from: {
          marginTop: '-45px',
        },
        enter: {
          marginTop: '0',
        },
        leave: {
          marginTop: '-45px',
        },
        config: {
          mass: 1,
          tension: 600,
          friction: 42,
        },
      },
    },
    header: {
      mobileNav: {
        from: {
          marginTop: `-${window.screen.height}px`,
        },
        enter: {
          marginTop: '0',
        },
        leave: {
          marginTop: `-${window.screen.height}px`,
        },
        config: {
          mass: 1,
          tension: 600,
          friction: 42,
        },
      },
    },
    loadingScreen: {
      from: {
        opacity: '1',
      },
      enter: {
        opacity: '1',
      },
      leave: {
        opacity: '0',
      },
      config: {
        duration: 100,
      },
    },
    post: {
      postLink: {
        from: {
          marginTop: '-45px',
        },
        enter: {
          marginTop: '0',
        },
        leave: {
          marginTop: '-45px',
        },
        config: {
          mass: 1,
          tension: 600,
          friction: 42,
        },
      },
    },
  },
  forms: {
    comment: {
      from: {
        marginTop: '-40px',
      },
      enter: {
        marginTop: '0',
      },
      leave: {
        marginTop: '-40px',
      },
      config: {
        mass: 1,
        tension: 600,
        friction: 42,
      },
    },
    post: {
      from: {
        transform: 'scale(0.1)',
      },
      enter: {
        transform: 'scale(1)',
      },
      leave: {
        display: 'none',
      },
      config: {
        mass: 1,
        tension: 600,
        friction: 42,
      },
    },
  },
  pages: {
    space: {
      justCreatedPost: {
        from: {
          transform: 'scale(0.1)',
        },
        enter: {
          transform: 'scale(1)',
        },
        leave: {
          display: 'none',
        },
        config: {
          mass: 1,
          tension: 600,
          friction: 42,
        },
      },
      postOfLocationPathname: {
        from: {
          transform: 'scale(0.1)',
        },
        enter: {
          transform: 'scale(1)',
        },
        leave: {
          display: 'none',
        },
        config: {
          mass: 1,
          tension: 600,
          friction: 42,
        },
      },
    },
  },
};
