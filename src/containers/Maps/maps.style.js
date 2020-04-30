import styled from 'styled-components';



export const MapsWrapper = styled.section`

  left: 2%;

  position: relative;

  overflow: hidden;

`;





export const MapsWrapper2 = styled.section`

  width: 100%;

  background-image: url('img/concentric-hex-pattern_2x.png');

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

  border-right: 1px solid blue;

  overflow-y: scroll;

  height: 50vh;

  padding: 0;

  left: 0;

}

`;