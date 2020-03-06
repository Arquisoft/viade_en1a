import React from 'react';
import {
    MyRoutesWrapper,
    MyRoutesContainer
} from './myroutes.style';
import { Route, UploadRoute } from './components';


export const MyRoutesPageContent = props => {
    const { routes, webId, onchangehandler } = props;

    return (
        <MyRoutesWrapper>
            <MyRoutesContainer className="card">
                <UploadRoute onchangehandler={onchangehandler}/>
                <ul>
                    {
                        routes.map(
                            route =>(
                                <Route route={route}/>
                            )
                        )
                    }
                </ul>
            </MyRoutesContainer>
        </MyRoutesWrapper>
    );
}