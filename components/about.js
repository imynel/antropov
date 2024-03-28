import React, { useCallback, useEffect } from "react"
import styled from "styled-components"
import { useHorizontalScroll } from './horizontalScroll'
import { DataCopmonent } from "./dataComponent";

export default function About({ close, handleMouse, databases}) {
  const scrollRef = useHorizontalScroll();
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      close()
    }
  }, []);
  console.log(databases)
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <Root> 
      <Scroll ref={scrollRef}>
          {databases.map((elm, index) => {

            return (
              <DataCopmonent key={index} data={index > 1 ? elm.data.results : elm.data.results[0].properties.description.title } title={elm.title} years={elm.years}/>
            )
          })}

      </Scroll>
      <Footer>
        <CloseButton {...handleMouse}>
          <h1 onClick={close}>Close</h1>
        </CloseButton>
        <h1>
          <a {...handleMouse} href="https://www.facebook.com/danya.antropov">FB</a>
          <a {...handleMouse} href="https://www.instagram.com/danyantropov/">IG</a>
        </h1>
      </Footer>
    </Root>
  );
}


const Root = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  z-index: 2;
`;

const Scroll = styled.div`
  display: flex;
  max-height: 80vh;
  overflow: auto;
  z-index: 3;
`;



// grid-template-columns: repeat(7, minmax(40vw, auto));
// grid-template-rows: 75vh;


const Footer = styled.div`
  width: 96vw;
  position: absolute;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  margin: 2vw;
  a {
    user-select: none;
  }
`;

// const Indent = styled.p`
//   tab-size: 4;
//   text-indent: -6.5vw;
//   padding-left: 6.5vw;
//   white-space: pre-wrap;
// `;


const CloseButton = styled.button`
  outline: none;
  border: none;
  user-select: none;
  cursor: pointer;
  background-color: transparent;
`;
