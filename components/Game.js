import { useState } from "react";


function Game({puzzleOftheDay}) {
    const [guesses, setGuesses] = useState([]);
    const [guessWords, setGuessWords] = useState([]);
    const [guessNumber, setGuessNumber] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [isGuessValid, setIsGuessValid] = useState(true);
    const [isGuessCorrect, setIsGuessCorrect] = useState(false);
    const totalHints = 5;
    const [hintsLeft, setHintsLeft] = useState(totalHints);

    const puzzleWord = puzzleOftheDay.word;

    const similarWords = puzzleOftheDay.similar_words;
    const distanceToClosest = puzzleOftheDay.distances[1]
    const distanceToHundredthClosest = puzzleOftheDay.distances[100]


    // Feb 8, 2023 Game Epoch
    const epoch = new Date(2023, 1, 8)
    const start = new Date(epoch)
    const today = new Date()
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    today.setHours(0, 0, 0, 0)
    yesterday.setHours(0, 0, 0, 0)
    let puzzleIndex = 1
    while (start < today) {
        puzzleIndex++
        start.setDate(start.getDate() + 1)
    }
  
    const handleGuess = () => {
        let inputValueLowerCase = inputValue.toLowerCase().trim()

        if (inputValueLowerCase === puzzleWord) {
            setIsGuessCorrect(true);
            setInputValue('');
            let newGuesses = [...guesses, {guessNumber: guessNumber, word: inputValueLowerCase, distance: 100.0, rank: 0}]
            newGuesses = newGuesses.sort((a, b) => b.distance - a.distance)
            setGuesses(newGuesses);
            setGuessWords({...guessWords, [inputValueLowerCase]: true});
            setGuessNumber(guessNumber + 1);
            setInputValue('');
            return
        }

        if (!inputValueLowerCase | !(inputValueLowerCase in similarWords)) {
            setIsGuessValid(false);
            setInputValue('');
            return
        }
        setIsGuessValid(true);

        if (inputValueLowerCase in guessWords) {
            setInputValue('');
            return
        }

        const guessDistance = similarWords[inputValueLowerCase]['distance']
        const guessRank = similarWords[inputValueLowerCase]['rank']

        let newGuesses = [...guesses, {guessNumber: guessNumber, word: inputValueLowerCase, distance: guessDistance, rank: guessRank}]
        newGuesses = newGuesses.sort((a, b) => b.distance - a.distance)
        setGuesses(newGuesses);
        setGuessWords({...guessWords, [inputValueLowerCase]: true});
        setGuessNumber(guessNumber + 1);
        setInputValue('');
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter' && inputValue) {
            handleGuess();
        }
    };

    const findHintWord = (bestRank) => {
        let hintWord = ''
        for (const [word, data] of Object.entries(similarWords)) {
            if (data['rank'] < bestRank && data['rank'] > bestRank / 2) {
                return word
            }
        }
        return hintWord
    }

    const handleHint = () => {
        if (hintsLeft === 0) {
            return
        }

        let bestRank = Object.keys(similarWords).length

        if (guesses.length > 0) {
            bestRank = guesses[0].rank
        }
        let hintWord = findHintWord(bestRank)
        const hintDistance = similarWords[hintWord]['distance']
        const hintRank = similarWords[hintWord]['rank']
        let newGuesses = [...guesses, {guessNumber: "💡", word: hintWord, distance: hintDistance, rank: hintRank}]
        newGuesses = newGuesses.sort((a, b) => b.distance - a.distance)
        setGuesses(newGuesses);
        setGuessWords({...guessWords, [hintWord]: true});

        setHintsLeft(hintsLeft - 1);
    }

      
    return (
        <div className="items-center justify-center py-10 px-4 text-center">
            <div>
                <p>Bugünün bulmaca numarası {puzzleIndex}. En yakın kelimenin benzerlik skoru {distanceToClosest},
                en yakın 100. kelimenin benzerlik skoru {distanceToHundredthClosest}.</p>
            </div>

            <div className="mt-6 mb-6 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                <input type="text" className="text-center w-full md:w-7/12 max-w-md px-4 py-2 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tahmin" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleEnter}/>
                <button className="w-full md:w-3/12 max-w-xs px-4 py-2 rounded-full bg-blue-500 text-white font-medium
                 hover:bg-blue-600 transition-colors duration-300" onClick={() => handleGuess()}>
                    Tahmin et
                </button>
                <button className="w-full md:w-3/12 max-w-xs px-4 py-2 rounded-full bg-blue-500 text-white font-medium
                 hover:bg-blue-600 transition-colors duration-300"
                 disabled={hintsLeft <= 0 ? true : false}
                 onClick={() => handleHint()}>
                    İpucu al ({hintsLeft}/{totalHints})
                </button>
            </div>

            {}

            {!isGuessValid && (
                <p className="mb-4 font-bold"> Kelime geçerli değil.</p>
            )}

            {isGuessCorrect && (
                <div className="font-bold p-4"> Tebrikler! Günün kelimesi {puzzleWord}, {guessNumber} denemede buldun.</div>
            )}

            <table className="w-full p-12 py-2 text-left border-collapse border-2 rounded-full">
                <thead>
                    <tr className="bg-gray-700 text-white">
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Tahmin</th>
                        <th className="border px-4 py-2">Benzerlik</th>
                        <th className="border px-4 py-2">Yakın mı?</th>
                    </tr>
                </thead>
                <tbody>
                    {guesses.map(item => (
                    <tr key={item.word}>
                        <td className="border px-4 py-2">{item.guessNumber}</td>
                        <td className="border px-4 py-2">{item.word}</td>
                        <td className="border px-4 py-2">
                            <p>{item.distance}</p>
                        </td>
                        <td className="border px-4 py-2">
                            {item.rank <= 1000 && (
                                <div className="mx-1 h-6 bg-gray-600 w-full">
                                        <div
                                        className="bg-blue-500 h-6"
                                        style={{ width: `${((1000 - item.rank) / 1000) * 100}%` }}
                                        >
                                            <div className="mx-1">
                                                {1000 - item.rank}/1000
                                            </div>
                                        </div>
                                </div>
                            )}
                            {item.rank <= 5000 && item.rank > 1000 && (
                                <div className="w-full mx-2">Orta uzaklıkta</div>
                            )}
                            {item.rank > 5000 && (
                                <div className="w-full mx-2">Uzak</div>
                            )}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>


            {/* <ul className="flex flex-col p-4">
                {guesses.map((guess, index) => (
                <li className='' key={index}>{guess}</li>
                ))}
            </ul> */}



        </div>
    )
}

export default Game