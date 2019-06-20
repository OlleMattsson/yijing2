import React, { useState, useEffect } from "react";
import {Hexagram} from "./components/Hexagram";
import {makeHexagrams} from "./lib/makeHexagrams"
import {fetchRandomNumbers} from "./lib/fetchRandomNumbers"
import { CSSTransition } from "react-transition-group";
import Spinner from "./components/spinner/spinner";
import "./App.css";

const USE_MOCKED_DATA = true;

const App = () => {

  const [displayHexagrams, setDisplayHexagrams] = useState(false);
  const [transition, setTransition] = useState( false );
  const [nowSequenceFuxi, setNowSequenceFuxi] = useState(0)
  const [futureSequenceFuxi, setFutureSequenceFuxi] = useState(0)
  const [changes, setChanges] = useState([])

  useEffect(() =>{
    fetchRandomNumbers(USE_MOCKED_DATA).then(res => {
      const {nowSequenceFuxi, futureSequenceFuxi, changes} = makeHexagrams(res.data)
      setNowSequenceFuxi(nowSequenceFuxi);
      setFutureSequenceFuxi(futureSequenceFuxi);
      setChanges(changes);
      setDisplayHexagrams(true)
    });
  }, [])

  return (
    <div className="App">
      <div className="changingHexagramContainer" >
        {!displayHexagrams && <Spinner />}
        <CSSTransition
          classNames="hexagramTransitionContainer"
          timeout={{ exit: 1000, enter: 500 }}
          unmountOnExit
          in={displayHexagrams}
          onExited={() => setTransition(false)}
        >
          <div style={{ display: "flex" }}>
             <Hexagram
              initialFuxi={nowSequenceFuxi}
              changing={changes}
            />             
            <Hexagram
              initialFuxi={futureSequenceFuxi}
              interactive
              withControls
            />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
