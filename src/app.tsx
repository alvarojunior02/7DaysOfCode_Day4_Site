import { useState } from "react"
import { ArrowRightCircle, X, Check, PlusCircle, MinusCircle } from 'lucide-react'
import { toast } from "sonner"

interface NumberAttemptProps {
  number: number,
  correct: boolean
}

const randomNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1)

export function App() {
  const [numberAttempt, setNumberAttempt] = useState(1)
  const [attempt, setAttempt] = useState(1)
  const [attemptsArrayObject, setAttemptsArrayObject] = useState<NumberAttemptProps[]>([])
  const [attemptsArray, setAttemptsArray] = useState<number[]>([])
  const [gotRight, setGotRight] = useState(false)

  function handleAttempt() {
    if (attemptsArray.length > 0 && attemptsArray.includes(numberAttempt)) {
      toast.warning(`Você já tentou o número ${numberAttempt}.`)
      return
    }

    if (attempt < 4) {
      if (numberAttempt === randomNumber) {
        const newNumberAttempt = {
          number: numberAttempt,
          correct: true
        }
        setAttemptsArrayObject([...attemptsArrayObject, newNumberAttempt])
        setAttemptsArray([...attemptsArray, numberAttempt])
        toast.success(`Você acertou! Era o número: ${randomNumber}`)
        setGotRight(true)
        setAttempt(4)
      } else {
        if (attempt === 3) {
          const newNumberAttempt = {
            number: numberAttempt,
            correct: false
          }
          setAttemptsArrayObject([...attemptsArrayObject, newNumberAttempt])
          setAttemptsArray([...attemptsArray, numberAttempt])
          toast.error(`Tentativas esgotadas! O número era o: ${randomNumber}`)
          setAttempt(attempt + 1)
        } else {
          const newNumberAttempt = {
            number: numberAttempt,
            correct: false
          }
          setAttemptsArrayObject([...attemptsArrayObject, newNumberAttempt])
          setAttemptsArray([...attemptsArray, numberAttempt])
          if (attempt === 2) {
            toast.warning(`Não é esse número! Você ainda tem 1 chance.`)
          } else {
            toast.warning(`Não é esse número! Você ainda tem ${3 - attempt} chances.`)
          }
          setAttempt(attempt + 1)
        }

      }
    }
  }

  return (
    <div className="flex flex-col pt-10 justify-start items-center w-screen h-screen overflow-hidden space-y-4">
      <h1 className="font-bold text-2xl text-slate-50 text-center">Tente advinhar o número de 1 à 10:</h1>
      <h2 className="font-regular text-lg text-slate-50">
        {
          gotRight ? (
            'Parabéns, você acertou!'
          ) : attempt > 3 ? (
            'Acabaram suas chances.'
          ) : attempt === 3 ? (
            `Você tem 1 chance.`
          ) : (
            `Você tem ${4 - attempt} chances.`
          )
        }
      </h2>
      <div className="max-w-2xl min-w-md w-full flex flex-row justify-center items-center space-x-2">
        <button
          className="bg-slate-50 p-2 rounded-md disabled:bg-slate-400"
          onClick={() => setNumberAttempt(numberAttempt - 1)}
          disabled={numberAttempt === 1}
        >
          <MinusCircle />
        </button>
        <input
          value={numberAttempt}
          onChange={(e) => e.preventDefault()}
          className="bg-slate-50 p-2 rounded-md outline-none max-w-20 w-full placeholder:text-slate-900 disabled:bg-slate-400 "
          type="number"
          name="number"
          min={1}
          max={10}
          disabled={attempt > 3}
        />
        <button
          className="bg-slate-50 p-2 rounded-md disabled:bg-slate-400"
          onClick={() => setNumberAttempt(numberAttempt + 1)}
          disabled={numberAttempt === 10}
        >
          <PlusCircle />
        </button>
        <button
          className="bg-slate-50 p-2 rounded-md disabled:bg-slate-400"
          onClick={handleAttempt}
          disabled={attempt > 3}
        >
          <ArrowRightCircle />
        </button>
      </div>
      {
        attemptsArrayObject.length > 0 ? (
          <div className="text-slate-50 font-semibold">
            <p>Tentativas: </p>
            <ul className="list-disc list-inside">
              {attemptsArrayObject.map((item, index) => {
                return (
                  <li key={index} className="flex flex-row space-x-2 items-center justify-center">
                    <p>( {item.number} )</p>
                    <p>{item.correct ? <Check className="size-6" /> : <X className="size-6" />}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null
      }

      {
        attempt > 3 ? (
          <div>
            <p className="text-slate-50 font-semibold">Resposta: ( {randomNumber} )</p>
          </div>
        ) : null
      }
    </div>
  )
}
