import './App.css';
import logo from './assets/logo.svg';
import profile from './assets/Windows.jpg';
import pauseIcon from './assets/pause.svg';
import playIcon from './assets/play.svg';
import stopIcon from './assets/stop.svg';
import previousIcon from './assets/previous.svg';
import nextIcon from './assets/next.svg';

import ShowMusics from './components/songs';
import { musics } from './musics.js';
import { useState, useRef } from 'react';


function App() {
  const audioRef = useRef(null);
  const progresRef = useRef(null);
  const contInterval = useRef(0);

  const [btnState, setBtnState] = useState(false);
  const [music, setMusic] = useState({
    id: 0,
    title: '',
    artist: '',
    description: '',
    url: '',
    cover: ''
  });

  let intervalProgress = null;

  function handleSelectMusic(music) {

    setMusic(music);

    let localState = btnState;

    localState = true;
    setBtnState(localState);

    audioRef.current.src = music.url;
  }

  function handlePlayMusic() {

    contInterval.current += 1;

    intervalProgress = setInterval(() => {
      // console.log('contando...');

      if (contInterval.current % 2 === 0) {
        clearInterval(intervalProgress);
      }

      const durationMusic = audioRef.current.duration / 60;
      const currentProgres = ((audioRef.current.currentTime / 60) * 100) / durationMusic;

      progresRef.current.style.width = `${currentProgres}%`;
    }, 1000);



    let localState = btnState;

    localState = false;

    audioRef.current.play();

    setBtnState(localState);
    console.log(btnState);

  }

  function handlePauseMusic() {

    contInterval.current += 1;

    if (contInterval.current % 2 === 0) {
      // console.log('par');
    }


    audioRef.current.pause();

    let localState = btnState;

    localState = true;

    setBtnState(localState);

  }

  function handleStopMusic() {
    audioRef.current.play();
    audioRef.current.currentTime = 0;
  }

  function handleNextMusic() {

    let localMusic = musics[music.id];

    if (!localMusic) {
      localMusic = musics[0];

    }

    audioRef.current.src = localMusic.url;
    setMusic(localMusic);

    let localState = btnState;

    localState = true;
    setBtnState(localState);

  }

  function handlePreviousMusic() {
    let localMusic = musics[music.id - 2]

    if (!localMusic) {
      localMusic = musics[musics.length - 1];
    }

    audioRef.current.src = localMusic.url;
    setMusic(localMusic);

    let localState = btnState;

    localState = true;
    setBtnState(localState);
  }

  return (
    <div className="container">
      <header>
        <div className='sub-container'>
          <div className='container__header'>
            <img src={logo} alt='Logo da Cubos' />
            <div className='container__welcome'>
              <img className='welcome__photo' src={profile} alt='Foto de perfil' />
              <h3>Bem vindo, José.</h3>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className='main__container'>
          <h2>The best play list</h2>
          <div className='main__comp'>
            {musics.map((music) => (
              <div onClick={() => handleSelectMusic(music)} key={music.id}>
                <ShowMusics
                  img={music.cover}
                  title={music.title}
                  text={music.description}
                />
              </div>
            )
            )}
          </div>
        </div>
      </main>
      <footer>
        <div className='footer__container'>
          <div className='informations'>
            <h2>{music.title}</h2>
            <h4>{music.artist}</h4>

          </div>
          <div className='selectArea'>
            <div className='commands'>
              <img src={stopIcon} alt='Stop Icon' onClick={() => handleStopMusic()} />
              <img src={previousIcon} alt='Previous Icon' onClick={() => handlePreviousMusic()} />
              {btnState ? <img className='btnAction' src={playIcon} alt='Play Icon' onClick={() => handlePlayMusic()} /> :
                <img className='btnAction' src={pauseIcon} alt='Pause Icon' onClick={() => handlePauseMusic()} />}
              <img src={nextIcon} alt='Next Icon' onClick={() => handleNextMusic()} />

            </div>
            <div className='timeArea'>
              <span>0</span>

              <div className='container-bar'>
                <div className='timeBar'></div>
                <div className='timeBar-color' ref={progresRef}></div>
              </div>

              <span>3:34</span>
            </div>
          </div>
        </div>

      </footer>
      <audio ref={audioRef}></audio>
    </div>
  );
}

export default App;
