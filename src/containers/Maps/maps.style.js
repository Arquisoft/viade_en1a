import styled from "styled-components";

export const MapsWrapper = styled.section`
  left: 2%;

  position: relative;

  overflow: hidden;
`;

export const MapsWrapper2 = styled.section`
  width: 100%;

  background-image: url("img/concentric-hex-pattern_2x.png");

  background-repeat: repeat;

  h3 {
    color: #666666;

    span {
      font-weight: bold;
    }

    a {
      font-size: 1.9rem;
    }
  }
`;

export const MapsCard = styled.div`
  background-color: #fff;

  //Overriding the style guide card flexbox settings

  flex-direction: row !important;

  align-items: center;

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    margin-left: 8px;
  }
`;

export const ButtonStyled = styled.button`
  border: none;

  background: rgba(23, 20, 34, 0.73);

  border-radius: 360px;

  display: block;

  transition: all 0.3s ease-in;

  opacity: 0;

  position: absolute;

  width: 100%;

  padding: 20px;

  bottom: 0;

  top: 0;

  left: 0;

  &:hover {
    border: 3px solid white;

    color: white;
  }
`;

export const styledUploadButton = `

  top: 80%;

  left: 5%;

  bottom: 10%;

}`;

export const MapsSideBar = styled.div`

  padding: 0;

  left: 0;

}

`;

export const InputFile = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  margin-top:"5vh";
}
`;

export const LabelInput = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: #106BA0;
  display: inline-block;
  transition: all .5s;
  cursor: pointer;
  padding: 15px 40px !important;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  }
}`;
