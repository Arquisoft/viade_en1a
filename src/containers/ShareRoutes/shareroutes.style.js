import styled from "styled-components";

export const FriendsShareContainer = styled.div`
  background-color: #fff;
  margin: 30px auto;

  //Overriding the style guide card flexbox settings
  max-width: 80% !important;
  flex-direction: row !important;
  padding: 40px 0 ; //temporary fix to a style guide bug

  align-items: center;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .shareClass{
    margin-top: 30px;
  }

  .friend-img {
    border-radius: 50%;
  }
  
  td{
    margin-bottom: 20px;
    columns:1;
  }

  ul li btn{
    margin: auto;
  }
`;