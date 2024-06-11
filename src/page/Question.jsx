import React from 'react'
import { Questions1 } from '../questions/Questions1'
import { Questions2 } from '../questions/Questions2'
import { Questions3 } from '../questions/Questions3'
import { Questions4 } from '../questions/Questions4'
import { Questions5 } from '../questions/Questions5'
import { Questions6 } from '../questions/Questions6'
import { Questions7 } from '../questions/Questions7'
import { Questions8 } from '../questions/Questions8'
import { Questions9 } from '../questions/Questions9'
import { Questions10 } from '../questions/Questions10'
import { Questions11 } from '../questions/Questions11'
import { Questions12 } from '../questions/Questions12'
import { Questions13 } from '../questions/Questions13'
import { useParams } from 'react-router-dom'

export const Question = () => {
    const params = useParams();

    const questionsObject = {
        1: <Questions1 />,
        2: <Questions2 />,
        3: <Questions3 />,
        4: <Questions4 />,
        5: <Questions5 />,
        6: <Questions6 />,
        7: <Questions7 />,
        8: <Questions8 />,
        9: <Questions9 />,
        10: <Questions10 />,
        11: <Questions11 />,
        12: <Questions12 />,
        13: <Questions13 />,
    }

    return (
    <>
        {questionsObject[params.questionId]}
    </>
  )
}
