import styled from "styled-components";

export const MapsSideBar = styled.div`

  border-right: 1px solid blue;

  overflow-y: scroll;

  height: 50vh;

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
