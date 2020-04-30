import React from "react";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import * as Icon from "react-feather";

export const ShareRoutesPageContent = (props) => {

    const {inflatedGroups, share} = props;
    const {t} = useTranslation();

    function shareRoute(group) {
        inflatedGroups[group].forEach(
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
                                                {inflatedGroups[key].reduce(
                                                    (accumulator, currentValue) => {return accumulator + ((accumulator !== "") ? ", " : "" ) + currentValue.name ;},
                                                    ''
                                                )}
                                            </Tooltip>
                                        }
                                    >
                                        <h3>{key}</h3>
                                    </OverlayTrigger></td>
                                <td><Button class="shareClass" id={"btn" + key} variant="primary"
                                            onClick={shareRoute.bind(this, key)} block>
                                    <Icon.Share2/> {t("routes.share")}
                                </Button></td>
                            </tr>
                        )
                    })
                }
            </table>

            <Button href="#/maps" variant="secondary" block><Icon.ArrowLeft/> {t("routes.return")}</Button>
        </div>
    );

};