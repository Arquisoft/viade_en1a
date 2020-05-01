import React from "react";
import {useState} from "react";
import {
    FriendsWrapper,
    FriendsContainer,
    StyledGroupBox
} from "./friends.style";
import {Friend} from "./components";
import {Button, ButtonGroup, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import * as Icon from "react-feather";
import { Loader } from "}@util-components";


function GroupBox(props) {
    const {deleteGroup, groupName} = props;

    function btnDeleteGroup() {
        deleteGroup(groupName);
    }

    return(
        <StyledGroupBox>
            {groupName}
            {
                groupName !== "Default" ? <Button variant="danger" onClick={btnDeleteGroup}><Icon.XCircle/></Button> : null
            }
        </StyledGroupBox>
    )
}

function ChooseGroupsModal(props) {
    const {t, groups, changeFriendFromGroupModal} = props;

    const [group, setGroup] = useState("Default");

    function chooseGroup() {
        changeFriendFromGroupModal(group);
    }
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <label for="groupsSelect">{t("friends.changeGroup")}</label>
                    <select id = "groupsSelect" value={group} onChange={(e) => setGroup(e.target.value)}>
                        {
                            Object.keys(groups).map((key) => {
                                return (
                                    <option value={key}>{key}</option>
                                )
                            })
                        }
                    </select>
                    <Button onClick={chooseGroup}><Icon.Save/> {t("friends.save")}</Button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>{t("friends.close")}</Button>
            </Modal.Footer>
            
        </Modal>
    );
}

function EditGroupsModal(props) {
    const {t, groups, addGroup, deleteGroup} = props;
    const [input, setInput] = useState("");

    function btnAddGroup() {
        if (input !== "") {
            addGroup(input);
            setInput("");
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("friends.editGroups")}
                    {
                        Object.keys(groups).map((key) => {
                            return (
                                //<option value={index}>{key}</option>
                                <GroupBox groupName={key} deleteGroup={deleteGroup}/>
                            )
                        })
                    }
                    {t("friends.nameGroup")}
                    <input placeHolder = {t("friends.typename")} type={"text"} value={input} onInput={(e) => setInput(e.target.value)}/>
                    <Button onClick={btnAddGroup}><Icon.Plus/></Button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>{t("friends.close")}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const FriendsPageContent = (props) => {
    const [input, setInput] = useState("");
    const [group, setGroup] = useState("Default");
    const [editGroupsModalShow, setEditGroupsModalShow] = useState(false);
    const [chooseGroupsModalShow, setChooseGroupsModalShow] = useState(false);

    const [chosenFriend, setChosenFriend] = useState("");

    const {groups, addFriend, deleteFriend, addGroup, deleteGroup, changeFriendGroup} = props;
    const {t} = useTranslation();

    let isLoading = true;

    function btnAddFriend() {
        if (input !== "") {
            addFriend(input, group);
            setInput("");
        }
    }

    function  showChangeFriendGroupModal(friendid) {
        setChosenFriend(friendid);
        setChooseGroupsModalShow(true);
    }

    function changeFriendFromGroupModal(groupid) {
        setChooseGroupsModalShow(false);
        changeFriendGroup(chosenFriend, groupid);
    }

    return (
        <FriendsWrapper>
            <EditGroupsModal
                show={editGroupsModalShow}
                onHide={() => setEditGroupsModalShow(false)}
                t={t}
                groups={groups}
                addGroup={addGroup}
                deleteGroup={deleteGroup}
            />

            <ChooseGroupsModal
                show={chooseGroupsModalShow}
                onHide={() => setChooseGroupsModalShow(false)}
                t={t}
                groups={groups}
                addGroup={addGroup}
                deleteGroup={deleteGroup}
                changeFriendFromGroupModal={changeFriendFromGroupModal}
            />
            

            <FriendsContainer id="friendsContainer" className="card" >
                <h1>{t("friends.yourGroups")}</h1>
                <Button variant={"info"} onClick={() => setEditGroupsModalShow(true)}>{t("friends.groups")}</Button>
                {
                    Object.keys(groups).map((key) => {
                        return (
                            <>
                                <h2>{key}</h2>
                                {
                                    groups[key].map(
                                        (friend) => (
                                            <Friend friend={friend} deleteFriend={deleteFriend} changeFriendGroup={showChangeFriendGroupModal}/>
                                        )
                                    )
                                    

                                }
                            </>
                        )
                        
                    })
                }
            </FriendsContainer>

            <FriendsContainer className="card">
                <div className={"addUserForm"}>
                    <h1>{t("friends.addNewFriend")}</h1>
                    {t("friends.friendURL")}
                    <input type={"text"} value={input} onInput={(e) => setInput(e.target.value)}/>
                    <select value={group} onChange={(e) => setGroup(e.target.value)}>
                        {
                            Object.keys(groups).map((key) => {
                                isLoading=false;
                                return (
                                    <option value={key}>{key}</option>
                                );
                            })
                        }
                    </select>
                </div>
                <ButtonGroup aria-label="FriendsButtonGroup">
                    <Button onClick={btnAddFriend}>{t("friends.addFriend")}</Button>
                </ButtonGroup>
                
            </FriendsContainer>
            {isLoading && <Loader absolute/>}
        </FriendsWrapper>
    );
};