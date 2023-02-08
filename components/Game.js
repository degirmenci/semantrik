import { useState } from "react";


function Game({puzzleOftheDay}) {
    const [guesses, setGuesses] = useState([]);
    const [guessWords, setGuessWords] = useState([]);
    const [guessNumber, setGuessNumber] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [isGuessValid, setIsGuessValid] = useState(true);
    const [isGuessCorrect, setIsGuessCorrect] = useState(false);

    const puzzleWord = puzzleOftheDay.word;

    const similarWords = puzzleOftheDay.similar_words;
    const distanceToClosest = puzzleOftheDay.distances[1]
    const distanceToHundredthClosest = puzzleOftheDay.distances[100]

    // Feb 8, 2023 Game Epoch
    const epoch = new Date(2023, 1, 8)
    const start = new Date(epoch)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let puzzleIndex = 1
    while (start < today) {
        puzzleIndex++
        start.setDate(start.getDate() + 1)
    }
  
    const handleGuess = () => {
        if (inputValue === puzzleWord) {
            setIsGuessCorrect(true);
            setInputValue('');
            let newGuesses = [...guesses, {guessNumber: guessNumber, word: inputValue, distance: 100.0, rank: 0}]
            newGuesses = newGuesses.sort((a, b) => b.distance - a.distance)
            setGuesses(newGuesses);
            setGuessWords({...guessWords, [inputValue]: true});
            setGuessNumber(guessNumber + 1);
            setInputValue('');
            return
        }

        if (!inputValue | !(inputValue in similarWords)) {
            setIsGuessValid(false);
            setInputValue('');
            return
        }
        setIsGuessValid(true);

        if (inputValue in guessWords) {
            setInputValue('');
            return
        }

        const guessDistance = similarWords[inputValue]['distance']
        const guessRank = similarWords[inputValue]['rank']

        let newGuesses = [...guesses, {guessNumber: guessNumber, word: inputValue, distance: guessDistance, rank: guessRank}]
        newGuesses = newGuesses.sort((a, b) => b.distance - a.distance)
        setGuesses(newGuesses);
        setGuessWords({...guessWords, [inputValue]: true});
        setGuessNumber(guessNumber + 1);
        setInputValue('');
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter' && inputValue) {
            handleGuess();
        }
    };

      
    return (
        <div className="items-center justify-center py-10 px-4 text-center">
            <div>
                <p>Bugünün bulmaca numarası {puzzleIndex}. En yakın kelimenin benzerlik skoru {distanceToClosest},
                en yakın 100. kelimenin benzerlik skoru {distanceToHundredthClosest}.</p>
            </div>

            <div className="p-6">
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleEnter}
                type="text" placeholder="Tahmin"
                className="rounded-full text-center	w-70 px-48 py-2 border-gray-300"
                />
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 mx-6 rounded-full"
                onClick={() => handleGuess()}>Tahmin et</button>
            </div>

            {!isGuessValid && (
                <p className="py-4 font-bold"> Kelime geçerli değil.</p>
            )}

            {isGuessCorrect && (
                <div className="font-bold p-4"> Tebrikler! Günün kelimesi "{puzzleWord}", {guessNumber} denemede buldun.</div>
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
                                <div className="h-6 bg-gray-600 w-full">
                                        <div
                                        className="bg-blue-500 h-6"
                                        style={{ width: `${((1000 - item.rank) / 1000) * 100}%` }}
                                        >
                                            {1000 - item.rank}/1000
                                        </div>
                                </div>
                            )}
                            {item.rank <= 5000 && item.rank > 1000 && (
                                <div className="w-full">Orta uzaklıkta</div>
                            )}
                            {item.rank > 5000 && (
                                <div className="w-full">Uzak</div>
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