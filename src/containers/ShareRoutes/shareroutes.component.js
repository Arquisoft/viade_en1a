import React from "react";
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import * as Icon from "react-feather";
import { Loader } from "@util-components";
import {FriendsShareContainer} from "./shareroutes.style";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";

export const ShareRoutesPageContent = (props) => {

    const {inflatedGroups, share} = props;
    const {t} = useTranslation();

    let isLoading = true;

    function shareRoute(group, id) {
        inflatedGroups[String(group)].forEach(
            (friend) => {
                share.shareRoute(friend.webId, id);
            }
        );
    }

    return (
        <FriendsShareContainer
            className={"card"}>

            <Accordion allowZeroExpanded={true}>

                {
                    Object.keys(inflatedGroups).map((key) => {
                        return (<>

                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            {key}
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <table>
                                            {
                                                inflatedGroups[String(key)].map(
                                                    (friend) => {
                                                        return (
                                                            <tr>
                                                                <td>{friend.name}</td>
                                                                <td>
                                                                    <Button class="shareClass" id={"btn" + friend.webId.split("//")[1].split(".")[0]}
                                                                            variant="primary"
                                                                            onClick={share.shareRoute.bind(this, friend.webId, friend.webId.split("//")[1].split(".")[0])}
                                                                            block>
                                                                        <Icon.Share2/> {t("routes.share")}
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )
                                                
                                            }
                                        </table>
                                        <Button class="shareClass" id={"btn" + key} variant="primary"
                                                onClick={shareRoute.bind(this, key, key)} block>
                                            <Icon.Share2/> {t("routes.sharewithall")}
                                        </Button>
                                    </AccordionItemPanel>
                                    {isLoading=false}
                                </AccordionItem>
                            </>
                        );
                    })
                }

            </Accordion>
            {isLoading && <Loader absolute/>}

            <Button
                href="#/maps"
                variant="secondary"
                block>
                < Icon.ArrowLeft/>
                {t("routes.return")}
            </Button>
        </FriendsShareContainer>

    );

};