export type ParticleEffect = 'fireflies' | 'stars' | 'bubbles' | 'hearts' | 'network';

export const particleEffects = {
  fireflies: {
    name: 'Vaga-lumes',
    description: 'Pequenos pontos de luz que flutuam suavemente',
    config: {
      fullScreen: {
        enable: false
      },
      background: {
        color: "transparent"
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: "#ff6b81"
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce"
          },
          random: true,
          speed: 2,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: 40
        },
        opacity: {
          value: 0.5,
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1
          }
        },
        shape: {
          type: "circle"
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.1
          }
        }
      }
    }
  },
  stars: {
    name: 'Estrelas',
    description: 'Estrelas cintilantes no céu',
    config: {
      fullScreen: {
        enable: false
      },
      background: {
        color: "transparent"
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: "#ffffff"
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce"
          },
          random: true,
          speed: 1,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: 50
        },
        opacity: {
          value: 0.8,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1
          }
        },
        shape: {
          type: "star"
        },
        size: {
          value: { min: 2, max: 4 }
        }
      }
    }
  },
  bubbles: {
    name: 'Bolhas',
    description: 'Bolhas flutuantes e suaves',
    config: {
      fullScreen: {
        enable: false
      },
      background: {
        color: "transparent"
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: ["#ff6b81", "#ff4757", "#ff6b81"]
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce"
          },
          random: true,
          speed: 1,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: 30
        },
        opacity: {
          value: 0.3
        },
        shape: {
          type: "circle"
        },
        size: {
          value: { min: 20, max: 50 }
        }
      }
    }
  },
  hearts: {
    name: 'Corações',
    description: 'Corações flutuantes e românticos',
    config: {
      fullScreen: {
        enable: false
      },
      background: {
        color: "transparent"
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: "#ff6b81"
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce"
          },
          random: false,
          speed: 2,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: 30
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: "heart"
        },
        size: {
          value: { min: 10, max: 20 }
        }
      }
    }
  },
  network: {
    name: 'Rede',
    description: 'Pontos conectados por linhas',
    config: {
      fullScreen: {
        enable: false
      },
      background: {
        color: "transparent"
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: "#ff6b81"
        },
        links: {
          color: "#ff6b81",
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: 80
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: "circle"
        },
        size: {
          value: { min: 1, max: 3 }
        }
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab"
          }
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 1
            }
          }
        }
      }
    }
  }
}; 