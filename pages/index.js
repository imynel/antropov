import React, { useState, useRef } from "react";
import styled from "styled-components";
import Lottie from "react-lottie-segments";
import animationData from "../public/json/doner_hand.json";
import About from "../components/about.js";
import { isMobile } from 'react-device-detect'
import { Client } from "@notionhq/client"

export async function getServerSideProps() {
  const notion = new Client({ auth: process.env.NOTION_AUTH_KEY });
  const databases = await Promise.all([
    {
      name: 'page_bio',
      id: process.env.NOTION_AUTH_BIOGRAPHY_DATABASE_ID,
      title: 'Biografy',
      years: false,
    },

    {
      name: 'page_artist_statement',
      id: process.env.NOTION_AUTH_ARITST_STATEMENT_DATABASE_ID,
      title: 'Artist',
      years: false,
    },

    {
      name: 'page_education',
      id: process.env.NOTION_AUTH_EDUCATION_DATABASE_ID,
      title: 'Education',
      years: true,
    },

    {
      name: 'page_selected_group',
      id: process.env.NOTION_AUTH_SELECTED_GROUP_DATABASE_ID,
      title: 'Selected Group Exhibitions',
      years: true,
    },

    {
      name: 'page_personal_exhibition',
      id: process.env.NOTION_AUTH_PERSONAL_EXHIBITION_DATABASE_ID,
      title: 'Personal exhibition',
      years: true,
    },

    {
      name: 'page_art_residence',
      id: process.env.NOTION_AUTH_ART_RESIDENCIES_DATABASE_ID,
      title: 'Art residencies',
      years: true,
    },

    {
      name: 'page_awards',
      id: process.env.NOTION_AUTH_AWARDS_DATABASE_ID,
      title: 'Awards',
      years: true,
    }
  ].map(async ({ name, id, title, years }) => {
const response = await notion.databases.query({ database_id: id });
return { name, title, data: response, years };
}));

return { props: { databases } };

}

export default function Main({databases}) {
  const [gray, setGray] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [sequence, setSequence] = useState({
    segments: [0, 0],
    forceFlag: true,
  });
  const [mouseOver, setMouseOver] = useState(false);
  const cursorRef = useRef(null);


  React.useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current.style = `top: ${e.clientY}px; left: ${e.clientX}px;`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorRef]);

  const handStyle = {
    width: "unset",
    height: "80%",
    position: "absolute",
    pointerEvents: "none",
    zIndex: "3",
  };
  const handAnimation = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const animate = () => {
    setSequence({
      segments: [0, 50],
      forceFlag: true,
    });
  };
  const toggleAbout = () => {
    setGray(!gray);
    setShowAbout(!showAbout);
  };

  const handleMouse = {
    onMouseEnter: () => setMouseOver(true),
    onMouseLeave: () => setMouseOver(false),
  };

  return (
    <div>
      { isMobile ||
        <Cursor
          ref={cursorRef}
          src={
            !mouseOver
              ? "/imgs/doner_cursor-default.svg"
              : "/imgs/doner_cursor-pointer.svg"
          }
        />
      }
      <Kebabov
        style={{
          filter: gray ? "saturate(0%) brightness(150%)" : "",
        }}
      >
        <Lottie
          options={handAnimation}
          style={handStyle}
          isClickToPauseDisabled={true}
          playSegments={sequence}
        />
        <ShavaWrapper {...handleMouse} onClick={() => animate()}>
          <Shava src={`/imgs/doner_1.gif`} />
        </ShavaWrapper>
        <Bg src={`/imgs/doner_bg.svg`} />
        <AboutButton {...handleMouse} onClick={toggleAbout}>
          <AboutImg src={`/imgs/doner_about.svg`} />
        </AboutButton>
      </Kebabov>
      {showAbout ? <About handleMouse={handleMouse} close={toggleAbout} databases={databases} /> : null}
    </div>
  );
}

const Cursor = styled.img`
  width: 5vw;
  height: 5vw;
  border: 1px black;
  position: absolute;
  z-index: 999;
  /* transform: translate(-50%, -50%); */
  transform: translate(-10%, -10%);
  pointer-events: none;
`;

const Kebabov = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const ShavaWrapper = styled.div`
  height: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0 auto 10%;
  z-index: 1;
  user-select: none;
  cursor: default;
  &:hover {
    cursor: pointer;
  }
`;

const Shava = styled.img`
  height: 100%;
  z-index: 2;
`;

const Bg = styled.img`
  height: 80%;
  position: relative;
  user-select: none;
`;

const AboutButton = styled.button`
  height: 12.35%;
  position: relative;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
  z-index: 1;
`;

const AboutImg = styled.img`
  height: 100%;
`;
