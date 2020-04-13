import React from "react";
import { Button/*, Dropdown, ButtonGroup */} from "react-bootstrap";
import styled from "styled-components";
//import * as Icon from "react-feather";
//import { useTranslation } from "react-i18next";

const StyledNoti = styled.div`
  margin: 10px;
`;

export const Notis = (props) => {
    const { noti } = props;
    // const {t} = useTranslation();
    
    // function deleteRoute(){
        
    // }


    function showNotification(){
        
    }
 
    
    return (
        <StyledNoti>
        {/* <Dropdown as={ButtonGroup}> */}
            <Button variant="success" onClick={showNotification}>{noti.name}</Button>

            {/* <Dropdown.Toggle split variant="success" id="dropdown-split-basic" /> */}

            {/* <Dropdown.Menu>
                <Dropdown.Item onClick={deleteRoute} href="#"><Icon.Trash/>Borrar</Dropdown.Item>
            </Dropdown.Menu> */}
       {/* </Dropdown> */}
        </StyledNoti>
    );
};