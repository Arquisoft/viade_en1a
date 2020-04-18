import React from "react";
import { Button} from "react-bootstrap";
import styled from "styled-components";
const StyledNoti = styled.div
`
  margin: 10px;
  border-radius: 20px;
`;

export const Notis = (props) => {
    const { noti } = props;

    function showNotification(){
        
    }
 
    
    return (
        <StyledNoti>
            <Button variant="success" onClick={showNotification}>
            <style>
                {`
                    .btn-success {
                        background-color: green;
                        color: white;
                        border-radius: 20px;
                    
                    }
                `}
            </style>
                {noti.name}</Button>
        </StyledNoti>
    );
};