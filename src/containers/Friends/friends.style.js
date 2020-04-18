import styled from 'styled-components';

export const FriendsWrapper = styled.section`
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

export const FriendsContainer = styled.div`
  background-color: #fff;
  margin: 30px auto;

  //Overriding the style guide card flexbox settings
  max-width: 80% !important;
  flex-direction: row !important;
  padding: 50px 0 !important; //temporary fix to a style guide bug

  align-items: left;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    margin-left: 10px
  }

  button {
    margin-left: 8px;
  }

  .friend-img {
    border-radius: 50%;
  }

  ul {
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
  }

  li{
    margin-left: 100px;
    margin-bottom: 30px;
  }
`;