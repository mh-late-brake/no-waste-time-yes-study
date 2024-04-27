type Content = {
  doAnotherExercise: string;
  questionTitle: string;
  numOfTimesDone: string;
  inputAnswerLabel: string;
  inputIdLabel: string;
  submitButton: string;
  alertError: string;
  alertIncorrectAnswer: string;
  alertCorrectAnswer: string;
  correctNoMatterWhat: string;
}

const content: Content = {
  doAnotherExercise: "Do Another Random Exercise",
  questionTitle: "Question",
  numOfTimesDone: "Number of times have finished this problem:",
  inputAnswerLabel: "Answer",
  inputIdLabel: "id",
  submitButton: "Submit",
  alertError: "Error when submit answer",
  alertIncorrectAnswer: "Incorrect answer",
  alertCorrectAnswer: "Yay. Correct answer. Budget increased.",
  correctNoMatterWhat: "There is no correct answer in the database so we couldn't check to see whether you did correctly or not. But: yay, budget increased no matter what"
}

export default content;
