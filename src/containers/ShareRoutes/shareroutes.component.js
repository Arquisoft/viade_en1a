import React from "react";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import * as Icon from "react-feather";
import { Loader } from '@util-components';

export const ShareRoutesPageContent = (props) => {

    const {inflatedGroups, share} = props;
    const {t} = useTranslation();

    let isLoading=true;

    function shareRoute(group) {
        inflatedGroups[String(group)].forEach(
            (friend) => {
                share.shareRoute(friend);
            }
        );
    }

    return (
        
        
        <div>
            <table>
                {
                    Object.keys(inflatedGroups).map((key) => {
                        
                        return (
                            
                            <tr>
                                <td>
                                    <OverlayTrigger
                                        key={"top"}
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id={`tooltip-${"top"}`}>
                                                {inflatedGroups[String(key)].reduce(
                                                    (accumulator, currentValue) => {
                                                        return accumulator + ((accumulator !== "") ? ", " : "") + currentValue.name;
                                                    },
                                                    ""
                                                )}
                                            </Tooltip>
                                        }
                                    >
                                        <h3>{key}</h3>
                                    </OverlayTrigger>
                                    
                                    </td>
                                <td><Button class="shareClass" id={"btn" + key} variant="primary"
                                            onClick={shareRoute.bind(this, key)} block>
                                    <Icon.Share2/> {t("routes.share")}
                                </Button></td>
                                {isLoading=false}
                            </tr>
                        );
                    })
                }
            </table>
            {isLoading && <Loader absolute/>}

            <Button href="#/maps" variant="secondary" block><Icon.ArrowLeft/> {t("routes.return")}</Button>
        </div>
    );

};