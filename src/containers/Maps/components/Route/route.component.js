import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import * as Icon from 'react-feather';
import styled from "styled-components";

const StyledMapRoute = styled.div`
  margin: 10px;
`;

export const MapRoute = props => {
    const { route } = props;

    function showRoute(){
        route.showRoute(route);
    }

    function shareRoute(){
        route.shareRoute(route);
    }

    function deleteRoute(){
        route.deleteRoute(route);
    }

    return (
        <StyledMapRoute>
        <Dropdown as={ButtonGroup}>
            <Button variant="success" onClick={showRoute}>{route.name}</Button>

            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

            <Dropdown.Menu>
                <Dropdown.Item onClick={shareRoute} href="#"><Icon.Share2/>Compartir</Dropdown.Item>
                <Dropdown.Item onClick={deleteRoute} href="#"><Icon.Trash/>Eliminar</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </StyledMapRoute>
    );
}