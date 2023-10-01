import React from 'react';
import axios from 'axios';
import './index.css';

class App extends React.Component {
  state = {
    advice: '',
  }

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    axios.get('https://api.adviceslip.com/advice')
      .then((response) => {
        const { advice } = response.data.slip;

        this.setState({ advice });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
      <div className="flex flex-col h-screen justify-between bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400">
      <h1 className='bg-black text-white text-center p-3 text-lg mb-2'>Motivation Quote Generator</h1>
          <div className=''>
            <div className=''>
              <h1 className="text-center text-4xl font-medium">{this.state.advice}</h1>
            </div>
            <div className='flex items-center justify-center mt-5 animate-pulse'>
              <button className="text-white font-medium p-3 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500" onClick={this.fetchAdvice}>Load Another
              </button>
            </div>
            </div>
      <h5 className='bg-purple-300 text-black-100 text-center py-2 flex-row'> <span>Made With Love By <span className='animate-bounce'>❤️--</span> </span><a href='https://webdevisaac.com' className='bg-sky-300 underline rounded p-0.5 px-1  '>WebDeveloper@Isaac </a>🌎</h5>
      </div>
      </>
    );
  }
}

export default App;