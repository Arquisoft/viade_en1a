import styled from "styled-components";

export const ShareWrapper = styled.section`
  width: 100%;
  background-image: url('img/fondoFriends.png');
  background-repeat: repeat;
  padding: 50px 0;

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

export const FriendsShareContainer = styled.div`
  background-color: #fff;
  margin: 30px auto;

  //Overriding the style guide card flexbox settings
  max-width: 80% !important;
  display: block !important;
  padding: 40px !important; //temporary fix to a style guide bug
  align-items: center;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  
  .btn{
    margin: 10px;
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

  ul li .btn{
    margin: auto;
  }
`;