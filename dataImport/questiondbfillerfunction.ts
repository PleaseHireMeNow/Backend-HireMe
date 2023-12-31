

// import { doc, setDoc } from 'firebase/firestore';
// import { questionsCol } from '../database/firestore';
import { Questions, Question } from '../types/models/Questions';


//this function will evole into the function that interfaces with data directly from GPT

// export const importQuestionData = async () => {
//     console.log('importing sample data !!!!');       
//     for (let questionf of questionArray) {
//         const questionRef = doc(questionsCol)
//         await setDoc(questionRef, questionf)
//     }
// }


const questionArray: Question[] = [
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What is React?",
      "answers": [
        {
          "answer_content": {
            "text": "A JavaScript library for building user interfaces."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "A programming language developed by Facebook."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A database management system."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A server-side scripting language."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "Does React use HTML?",
      "answers": [
        {
          "answer_content": {
            "text": "Yes, it uses JSX, which is similar to HTML."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "No, it uses XML exclusively."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Yes, it uses HTML directly."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "No, it uses a custom markup language."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "When was React first released?",
      "answers": [
        {
          "answer_content": {
            "text": "March 2013."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "June 2015."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "January 2010."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "December 2017."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What are two significant drawbacks of React?",
      "answers": [
        {
          "answer_content": {
            "text": "Integrating React with the MVC framework like Rails requires complex configuration."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "React has no support for third-party libraries."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "React is not compatible with modern browsers."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "React is primarily designed for server-side scripting."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "State the difference between Real DOM and Virtual DOM.",
      "answers": [
        {
          "answer_content": {
            "text": "Real DOM updates slowly; Virtual DOM updates faster."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "Real DOM allows direct updates from HTML; Virtual DOM cannot be used to update HTML directly."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Real DOM consumes less memory; Virtual DOM wastes too much memory."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Real DOM is used exclusively in React; Virtual DOM is used in other JavaScript libraries."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What is Flux Concept in React?",
      "answers": [
        {
          "answer_content": {
            "text": "A new kind of architecture that complements React and the concept of Unidirectional Data Flow."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "A design pattern for creating server-side rendering in React applications."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A built-in React library for managing global state."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A tool for optimizing React performance."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "Define the term Redux in React.",
      "answers": [
        {
          "answer_content": {
            "text": "A state container for JavaScript applications used for state management."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "A library for handling asynchronous actions in React."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A router library for navigation in React applications."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A styling framework for React components."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What is the 'Store' feature in Redux?",
      "answers": [
        {
          "answer_content": {
            "text": "Allows saving the application's entire state in one place."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "A container for storing React components."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A feature for handling server-side rendering in Redux."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A tool for optimizing React performance."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What is an action in Redux?",
      "answers": [
        {
          "answer_content": {
            "text": "A function that returns an action object."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "A built-in React component for handling user input."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A type of CSS animation used in React applications."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A feature for handling asynchronous actions in Redux."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "Name the important features of React.",
      "answers": [
        {
          "answer_content": {
            "text": "Allows you to use 3rd party libraries."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "Designed for slow development processes."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Not supported by Facebook."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Does not support code stability."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What is the purpose of the React createContext function?",
      "answers": [
        {
          "answer_content": {
            "text": "To create a context for sharing values like themes among components."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "To define a new React component."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "To handle asynchronous actions in React applications."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "To create a new React class."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What are the four different phases in the lifecycle of a React component?",
      "answers": [
        {
          "answer_content": {
            "text": "Initialization, Mounting, Updating, and Unmounting."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "Configuration, Rendering, State, and Event Handling."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Setup, Execution, Refresh, and Cleanup."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Preparation, Deployment, Maintenance, and Decommissioning."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What are the limitations of React?",
      "answers": [
        {
          "answer_content": {
            "text": "React is not a full-blown framework, and it might be difficult for beginners to understand."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "React is limited to server-side rendering only."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "React components do not support inline templating."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "React does not provide any form of state management."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "Explain the difference between Shadow DOM and Virtual DOM.",
      "answers": [
        {
          "answer_content": {
            "text": "Shadow DOM is for scoping variables and CSS in web components, while Virtual DOM is a concept implemented by libraries in JavaScript."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "Shadow DOM and Virtual DOM are two terms referring to the same concept in React."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Shadow DOM is used exclusively in React, and Virtual DOM is used in other JavaScript libraries."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Virtual DOM is for scoping variables and CSS in web components, while Shadow DOM is a concept implemented by libraries in JavaScript."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What is the purpose of the ReactTestUtils package?",
      "answers": [
        {
          "answer_content": {
            "text": "To perform actions against a simulated DOM for the purpose of unit testing."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "To handle asynchronous actions in React applications."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "To create a new React component."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "To optimize the performance of React components."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What are the core principles of Redux?",
      "answers": [
        {
          "answer_content": {
            "text": "Single source of truth, State is read-only, Changes are made with pure functions."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "Global state, Direct state modification, State transformations with impure functions."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Multiple sources of truth, Mutable state, Changes are made with impure functions."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Single source of truth, State is write-only, Changes are made with pure functions."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "How can you access the Redux store outside a component?",
      "answers": [
        {
          "answer_content": {
            "text": "Export the store from the module where it is created with createStore()."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "Use the window object to access the global Redux store."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Call a special function provided by React called getReduxStore()."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "Accessing the Redux store outside a component is not possible."
          },
          "is_correct": false
        }
      ]
    }
  },

  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "Explain the yield catchphrase in JavaScript.",
      "answers": [
        {
          "answer_content": {
            "text": "The yield catchphrase is used to delay and resume a generator function, which is known as the yield keyword."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "The yield catchphrase is a syntax error in JavaScript."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "The yield catchphrase is used to declare variables in JavaScript."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "The yield catchphrase is only applicable to asynchronous functions."
          },
          "is_correct": false
        }
      ]
    }
  },

  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What is the difference between a React component and a container in React Redux?",
      "answers": [
        {
          "answer_content": {
            "text": "A component is for the presentational part of an application, while a container is connected to a Redux store."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "A component is only used for state management, while a container is used for rendering UI elements."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A container is a synonym for a React component in React Redux."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "A component and a container are terms used interchangeably in React."
          },
          "is_correct": false
        }
      ]
    }
  },
  {
    "question_id": "",
    "rating": 0,
    "question_content": {
      "text": "What is the concept of Lifting State Up in React?",
      "answers": [
        {
          "answer_content": {
            "text": "It involves moving shared state data to the closest common ancestor when multiple components need to share the same changing data."
          },
          "is_correct": true
        },
        {
          "answer_content": {
            "text": "It refers to moving state data from parent components to child components for better performance."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "It involves using the setState function to lift state data to the top level of the component tree."
          },
          "is_correct": false
        },
        {
          "answer_content": {
            "text": "It is a concept used only in class components and not in functional components."
          },
          "is_correct": false
        }
      ]
    }
  }
]


