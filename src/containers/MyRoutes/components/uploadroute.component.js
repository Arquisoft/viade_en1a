import React from 'react';

export const UploadRoute = (props) => {

    const {onchangehandler} = props;

    return (
        <input type="file" name="file" onChange={onchangehandler}/>
    );
};