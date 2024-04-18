import { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Votes = ({ votes }) => <p>has {votes} votes</p>;

const BestAnecdote = ({ votes, text }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const ary = new Uint8Array(anecdotes.length);

  const [selected, setSelected] = useState(0);
  const [voteArr, setVoteArr] = useState(ary);

  const [bestAnIndex, setBestAnIndex] = useState(0);

  const newAnecdote = () => {
    return () => {
      console.log('New one');
      setSelected(getRandomInt(anecdotes.length));
    };
  };

  const toVote = (anecNumber) => {
    return () => {
      const voted = [...voteArr];
      voted[anecNumber] += 1;
      setVoteArr(voted);

      if (voted[anecNumber] >= Math.max(...voted)) {
        setBestAnIndex(anecNumber);
      }
    };
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      <Button text='Vote' handleClick={toVote(selected)}></Button>
      <Button text='Next anecdote' handleClick={newAnecdote()}></Button>
      <Votes votes={voteArr[selected]}></Votes>
      <h2>Best Anecdote</h2>
      <BestAnecdote text={anecdotes[bestAnIndex]} votes={voteArr[bestAnIndex]}></BestAnecdote>
    </div>
  );
};

export default App;
