import React, { useState, useEffect } from "react";
import { Hexagram } from "../Hexagram";
import { makeHexagrams } from "../../lib/makeHexagrams";
import { fetchRandomNumbers } from "../../lib/fetchRandomNumbers";
import { CSSTransition } from "react-transition-group";
import Spinner from "../spinner/spinner";
import "../../App.css";

const USE_MOCKED_DATA = false;

export const Oracle = () => {
  const [displayHexagrams, setDisplayHexagrams] = useState(false);
  const [transition, setTransition] = useState(false);
  const [nowHexagram, setNowHexagram] = useState(0);
  const [futureHexagram, setFutureHexagram] = useState(0);
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    // divinate!
    fetchRandomNumbers(USE_MOCKED_DATA).then(res => {
      const { nowHexagram, futureHexagram, changes } = makeHexagrams(res.data);
      setNowHexagram(nowHexagram);
      setFutureHexagram(futureHexagram);
      setChanges(changes);
      setDisplayHexagrams(true);
    });
  }, []);

  return (
    <div className="App">
      <div className="changingHexagramContainer">
        {!displayHexagrams && <Spinner />}
        <CSSTransition
          classNames="hexagramTransitionContainer"
          timeout={{ exit: 1000, enter: 500 }}
          unmountOnExit
          in={displayHexagrams}
          onExited={() => setTransition(false)}
        >
          <div style={{ display: "flex" }}>
            <Hexagram initialFuxi={nowHexagram} changing={changes} />
            <Hexagram initialFuxi={futureHexagram} />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Oracle;
