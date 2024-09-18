import { useContext, useEffect } from "react"
import Question from "./Question"
import { QuizContext } from "../context/quiz"

export default function Quiz() {
  const [quizState, dispatch] = useContext(QuizContext)
  
  const currentQuestionNumber = quizState.currentQuestionIndex + 1
  const totalQuestions = quizState.questions.length

  const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=url3986'
  
  useEffect(() => {

    if (quizState.questions.length > 0 || quizState.error) return

    fetch(apiUrl).then(res => res.json()).then((data) => {
      dispatch({ type: "QUESTIONS_LOADED", payload: data.results })
    }).catch((err) => {
      dispatch({ type: "SERVER_ERROR", payload: err.message })
    })
  })

  return (
    <div className="quiz">

      { quizState.error && (
        <div className="results">
          <div className="congratulations">
            Server error
          </div>
          <div className="results-info">
            <div>{quizState.error}</div>
          </div>
        </div>
      )}

      { quizState.showResults && (
        <div className="results">
          <div className="congratulations">
            Congratulations!
          </div>
          <div className="results-info">
            <div>You have completed the quiz.</div>
            <div>You've got {quizState.totalCorrectAnswers} correct out of {quizState.questions.length} questions</div>
          </div>
          <div className="next-button" onClick={() => dispatch({type: "RESTART"})}>Restart</div>
        </div>
      )}

      { !quizState.showResults && quizState.questions.length > 0 && (<div>
        <div className="score">
          Question {currentQuestionNumber}/{totalQuestions}
        </div>
        <Question />
        <div className="next-button" onClick={() => dispatch({ type: "NEXT_QUESTION" })}>
          Next Question
        </div>
      </div>)}
    </div>
  )
}
