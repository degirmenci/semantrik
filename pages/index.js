import Header from '@/components/Header'
import Game from '@/components/Game'


export default function Home({validWords, puzzleOftheDay}) {
  //console.log(validWords)
  //console.log(puzzleOftheDay)

  return (
    <div>
      <Header/>
      <Game validWords={validWords} puzzleOftheDay={puzzleOftheDay}/>     
    </div>
  )
};

// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path'
export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const jsonData = await fsPromises.readFile(jsonDirectory + '/data.json', 'utf8');
  const objectData = JSON.parse(jsonData);

  // Feb 7, 2023 Game Epoch
  const epoch = new Date(2023, 1, 7)
  const start = new Date(epoch)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let index = 0
  while (start < today) {
    index++
    start.setDate(start.getDate() + 1)
  }

  return {
    props: {
      puzzleOftheDay: objectData.puzzle_words[index % objectData.puzzle_words.length],
    }
  }
}
