import React, { Component } from 'react';
import data from '@solid/query-ldflex';
import { successToaster, errorToaster } from '@utils';
import { findByTestId } from 'react-testing-library';

export const Friend = props => {
    const { friend } = props;

    return (
        <li key={friend.webId}><img width="100px" src={friend.image}/>{friend.name}</li>
    );
}