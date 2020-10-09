// const start = document.querySelector('.start-btn');
// const next = document.querySelector('.next-btn');
// const answerEl = document.querySelector('.answer-buttons');
// const questionsCont = document.querySelector('.questions-container');
// const questionElement = document.querySelector('.question');
// const answerButton = document.querySelectorAll('.answer');

// let shuffledQuestions, currentIndex;

// start.addEventListener('click',()=>{
//     start.classList.add('hide');
//     questions.classList.remove('hide');
//     shuffleQuestions= questions.sort(()=>Math.random()-0.5);
//     currentIndex = 0;
//     setNextQuestion(currentIndex);
// });
// function setNextQuestion(){
//     resetState();
//     question = shuffledQuestions[currentIndex];
//     showQuestion();
// }
// function showQuestion(question) {
//     questionElement.innerText = question.question
//     question.answers.forEach(answer => {
//       const button = document.createElement('button')
//       button.innerText = answer.text
//       button.classList.add('answer')
//       if (answer.correct) {
//         button.dataset.correct = answer.correct
//       }
//       button.addEventListener('click', selectAnswer)
//       answerButtonsElement.appendChild(button)
//     })
//   }

//   function resetState() {
//     clearStatusClass(document.body)
//     nextButton.classList.add('hide')
//     while (answerButtonsElement.firstChild) {
//       answerButtonsElement.removeChild(answerButtonsElement.firstChild)
//     }
//   }

//   function selectAnswer(e) {
//     const selectedButton = e.target
//     const correct = selectedButton.dataset.correct
//     setStatusClass(document.body, correct)
//     Array.from(answerButtonsElement.children).forEach(button => {
//       setStatusClass(button, button.dataset.correct)
//     })
//     if (shuffledQuestions.length > currentQuestionIndex + 1) {
//       nextButton.classList.remove('hide')
//     } else {
//       startButton.innerText = 'Restart'
//       startButton.classList.remove('hide')
//     }
//   }

//   function setStatusClass(element, correct) {
//     clearStatusClass(element)
//     if (correct) {
//       element.classList.add('correct')
//     } else {
//       element.classList.add('incorrect')
//     }
//   }

//   function clearStatusClass(element) {
//     element.classList.remove('correct')
//     element.classList.remove('incorrect')
//   }

// const questions =[
//     {
//         question : 'What is 2+ 2 ?',
//         answers = [
//             {text='4',correct:true},
//             {text='5',correct:false},
//             {text='6',correct:false},
//             {text='7',correct:false}
//         ]
//     }
//     {
//         question : 'What is 2+ 3 ?',
//         answers = [
//             {text='4',correct:true},
//             {text='5',correct:false},
//             {text='6',correct:false},
//             {text='7',correct:false}
//         ]
//     }
//     {
//         question : 'What is 2+ 4 ?',
//         answers = [
//             {text='4',correct:true},
//             {text='5',correct:false},
//             {text='6',correct:false},
//             {text='7',correct:false}
//         ]
//     }
//     {
//         question : 'What is 2+ 5 ?',
//         answers = [
//             {text='4',correct:true},
//             {text='5',correct:false},
//             {text='6',correct:false},
//             {text='7',correct:false}
//         ]
//     }
//     {
//         question : 'What is 2+ 6 ?',
//         answers = [
//             {text='4',correct:true},
//             {text='5',correct:false},
//             {text='6',correct:false},
//             {text='7',correct:false}
//         ]
//     }
// ]

const startButton = document.querySelector('.start-btn');
const nextButton = document.querySelector('.next-btn');
const questionContainerElement = document.querySelector('.questions-container');
const questionElement = document.querySelector('.question');
const answerButtonsElement = document.querySelector('.answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('answer');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('incorrect');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('incorrect');
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false },
    ],
  },
  {
    question: 'What is 2 + 4?',
    answers: [
      { text: '6', correct: true },
      { text: '16', correct: false },
    ],
  },
  {
    question: 'What is 2 + 12?',
    answers: [
      { text: '14', correct: true },
      { text: '22', correct: false },
    ],
  },
  {
    question: 'What is 22 + 2?',
    answers: [
      { text: '24', correct: true },
      { text: '22', correct: false },
    ],
  },
  {
    question: 'What is 2 + 222?',
    answers: [
      { text: '224', correct: true },
      { text: '22', correct: false },
    ],
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true },
    ],
  },
];
