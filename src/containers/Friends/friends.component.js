import React from 'react';
import {useState} from 'react';
import {
    FriendsWrapper,
    FriendsContainer
} from './friends.style';
import {Friend} from './components';
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";


export const FriendsPageContent = (props) => {
    const [input, setInput] = useState('');
    const [group, setGroup] = useState('0');

    const {groups, addFriend, deleteFriend} = props;
    const {t} = useTranslation();

    function btnAddFriend() {
        if (input !== "") {
            addFriend(input, group);
            setInput("");
        }
    }

    return (
        <FriendsWrapper>
            <FriendsContainer id="friendsContainer" className="card">
                {
                    Object.keys(groups).map((key) => {
                        return (
                            <>
                                <h2>{key}</h2>
                                {
                                    groups[key].map(
                                        (friend) => (
                                            <Friend friend={friend} deleteFriend={deleteFriend}/>
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
                    <input type={"text"} value={input} onInput={e => setInput(e.target.value)}/>
                    <select value={group} onChange={e => setGroup(e.target.value)}>
                        {
                            Object.keys(groups).map((key, index) => {
                                return (
                                    <option value={index}>{key}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <Button onClick={btnAddFriend}>{t("friends.addFriend")}</Button>
            </FriendsContainer>
        </FriendsWrapper>
    );
};