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

export const StyledGroupBox = styled.div`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

export const FriendsContainer = styled.div`
  background-color: #fff;
  margin: 30px auto;

  //Overriding the style guide card flexbox settings
  max-width: 80% !important;
  flex-direction: row !important;
  padding: 50px !important; //temporary fix to a style guide bug
  display: block !important;
  align-items: center;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  
  .friendBox{
    display: inline-flex;
    margin: 15px;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }

  .friend-img {
    background-color: lightgray;
    border-radius: 5px;
    height: 250px;
    object-fit: cover;
  }
  
  .addUserForm {
    margin: 20px;
    width: 80%;
  }
`;