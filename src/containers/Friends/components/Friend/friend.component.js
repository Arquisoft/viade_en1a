import React from "react";
import {useTranslation} from "react-i18next";
import {Dropdown, Card} from "react-bootstrap";
import * as Icon from "react-feather";

export const Friend = (props) => {
    const {friend, deleteFriend, changeFriendGroup} = props;
    const {t} = useTranslation();

    function btnDeleteFriend() {
        deleteFriend(friend.webId);
    }

    function btnChangeFriendGroup(){
        changeFriendGroup(friend.webId);
    }

    return (
        <>
            <Card id={friend.name} className={"friendBox"} style={{width: '18rem'}}>
                <Card.Img className={"friend-img"} variant="top" src={friend.image}/>
                <Card.Body>
                    <Card.Title>{friend.name}</Card.Title>
                    <Card.Text>
                        <a href={friend.webId}>Solid Pod</a>
                    </Card.Text>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <Icon.Settings/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={btnDeleteFriend} href="#"><Icon.Trash/>{t("friends.delete")}</Dropdown.Item>
                            <Dropdown.Item onClick={btnChangeFriendGroup}><Icon.Archive/>{t("friends.changeGroup")}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
            </Card>
        </>
    );
};