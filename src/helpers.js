export const shuffleAnswers = (question) => {
  const unshuffledAnswers = [
    question.correctAnswer,
    ...question.incorrectAnswers
  ]

  return unshuffledAnswers.map((unshuffledAnswer) => ({
    sort: Math.random(),
    value: unshuffledAnswer,
  })).sort((a, b) => a.sort - b.sort).map((a) => a.value)
}

export const normalizeQuestions = (backendQuestions) => {
  return backendQuestions.map((backendquestion) => {

    const incorrectAnswers = backendquestion.incorrect_answers.map((incorrectAnswer) => {
      return decodeURIComponent(incorrectAnswer)
    })

    return {
      correctAnswer: decodeURIComponent(backendquestion.correct_answer),
      question: decodeURIComponent(backendquestion.question),
      incorrectAnswers,
    }
  })
}
