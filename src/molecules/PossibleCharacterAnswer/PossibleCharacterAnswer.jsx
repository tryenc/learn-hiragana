import React, { useEffect } from "react"
import { Button } from "../../atoms/Button/Button"
import { playAudio } from "../../js/playAudio"
import correct from "../../assets/sfx/correct.wav"
import incorrect from "../../assets/sfx/incorrect.wav"
import * as pronunciations from "../../assets/pronunciation/index"

const correctClasses = "text-white bg-green-500"
const incorrectClasses = "text-white bg-red-600"

function computeGuessedClasses(isCorrect) {
  if (isCorrect === true) {
    return correctClasses
  }
  if (isCorrect === false) {
    return incorrectClasses
  }
}

export const PossibleCharacterAnswer = ({ isCorrect, setGuessed, value }) => {
  const guessedClasses = computeGuessedClasses(isCorrect)
  const valueAudioPath = pronunciations[value]

  useEffect(() => {
    if (isCorrect === true) {
      playAudio(correct).then(() => playAudio(valueAudioPath))
    } else if (isCorrect === false) {
      playAudio(incorrect).then(() => playAudio(valueAudioPath))
    }
  }, [isCorrect, valueAudioPath])

  function handleClick(e) {
    if (isCorrect === undefined) {
      setGuessed(e)
    } else {
      playAudio(valueAudioPath)
    }
  }

  return (
    <Button className={guessedClasses} onClick={handleClick} value={value}>
      {value}
    </Button>
  )
}