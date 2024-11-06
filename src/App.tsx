import { MouseEventHandler, useState } from 'react'

interface Question {
  title: string
  variants: string[]
  correct: number
}

const questions = [
  {
    title: 'Brotato - это ...',
    variants: ['еда', 'игрушка', 'лучшая игрушка в мире'],
    correct: 2
  },
  {
    title: 'Найти работу в IT ...',
    variants: ['легко', 'памагити', 'трудно'],
    correct: 1
  },
  {
    title: 'Лучший трек в ру сегменте',
    variants: ['пачки - lil krystall', 'бентли, бенз и бумер - Платина', 'замер - heronwater'],
    correct: 0
  },
]

function Game({ question, step, onClickVariant }: { question: Question, step: number, onClickVariant: any}) {
  const perc = Math.round(step / questions.length * 100);

  return (
    <>
      <div className='progress'>
        <div style={{ width: `${perc}%` }} className='progress__inner'></div>
      </div>

      <h1>{question.title}</h1>

      <ul>
        {question.variants.map((variant: string, index: number) => (
          <li onClick={() => onClickVariant(index)} key={index}>{variant}</li>
        ))}
      </ul>

    </>
  )
}

function Result({ answers, reset }: { answers: number, reset: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали  ответа { answers } из { questions.length }</h2>
      <button onClick={reset}>Попробовать снова</button>
    </div>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const question = questions[step];
  const [answers, setAnswers] = useState(0)


  const onClickVariant = (index: number) => {
    // console.log(step, index)
    if (question.correct == index) setAnswers(answers + 1);
    setStep(step + 1)

  }

  const reset = () => {
    setStep(0)
    setAnswers(0)
  }

  return (
    <div className='App'>
      {step !== questions.length ? (<Game question={question} step={step} onClickVariant={onClickVariant}/>) : (<Result answers={answers} reset={reset} />)}

    </div>
  )
}

export default App
