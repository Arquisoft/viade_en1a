import React, {Component} from "react";

import FC from "solid-file-client";

import auth from "solid-auth-client";

import {MapsSideBar} from "./maps.style";

import styled from "styled-components";

import {MapRoute} from "./components";
import {SharedRoute} from "./shared";

import {Button} from "react-bootstrap";
import {withTranslation} from "react-i18next";

import Switch from "react-switch";


const StyledDesignSidebar = styled.div`

      height: 70vh;

      width: 25%;

    `;


class DesignSideBar extends Component {

    constructor(props) {
        super(props);
    };

    render() {
        const {t} = this.props;
        return (

            <StyledDesignSidebar>

                <MapsSideBar style={{height:"90%"}}>
                    <h2>Nueva ruta</h2>
                    <form>
                        <p>Nombre:</p>
                        <input type="text"></input>
                        <p>Descripción:</p>
                        <input type="text"></input>
                    </form> 
                </MapsSideBar>
                <Button variant="primary" block>Subir al POD</Button>
            
            </StyledDesignSidebar>
        );

    }

}

export default withTranslation()(DesignSideBar);