import React from "react";
import styled from "styled-components";
const StyledNoti = styled.div`
  margin: 10px;
  border-radius: 20px;
`;

export const Notis = (props) => {
    const { noti } = props;

    function showNotification(){
        
    }
 
    
    return (
        <table>
            <thead>
                <tr>
                    <td align="center">
                        <StyledNoti>
                            <ul className="Noti" variant="success" onClick={showNotification}>
                                <style>
                                    {`
                                        .Noti {
                                            background: linear-gradient(
                                                to right,
                                                rgba(124, 77, 255, 0.8) 0%,
                                                rgba(83, 97, 253, 0.8) 40%,
                                                rgba(55, 203, 239, 0.9) 100%
                                              );
                                            color: white;
                                            border-radius: 20px;
                                            width: 70vh;
                                            height:5vh;
                                            text-align:center;
                                        }
                                    `}
                                </style>
                                    {noti.name}
                            </ul>
                        </StyledNoti>
                    </td>
                </tr>
            </thead>
        </table>
        
    );
};