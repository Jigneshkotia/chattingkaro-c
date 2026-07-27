import { Skeleton, keyframes, styled } from "@mui/material"
import {Link as LinkComponent} from 'react-router-dom'
import { myBlue } from "../../Constants/Colors";

const HiddenInput = styled("input")(
    {
        border: 0,
        clip : "rect(0 0 0 0)",
        height : 1,
        margin : -1,
        overflow: "hidden",
        padding : 0,
        position: "absolute",
        whiteSpace: "nowrap",
        width : 1
    }
);

const Link = styled(LinkComponent)`
    text-decoration : none;
    color : inherit;
    padding : 1rem;
    border-radius: 0.75rem;
    transition: background-color 150ms ease;
    &:hover{
        background-color : rgba(55,82,217,0.06);
    }
`;


const InputBox = styled("input")`
width : 100%;
height : 100%;
border: 1.5px solid transparent;
outline: none;
padding : 0 3rem;
border-radius: 1.5rem;
background-color: #F0F2F9;
font-size: 0.95rem;
font-family: inherit;
transition: border-color 150ms ease, background-color 150ms ease;

&:focus {
    background-color: #ffffff;
    border-color: ${myBlue};
}

&::placeholder {
    color: #8b91a7;
}
`

const SearchField = styled("input")`
    padding : 0.85rem 1.5rem;
    width : min(20vmax, 100%);
    min-width: 10rem;
    border : 1.5px solid #E1E5F0;
    outline : none;
    border-radius: 1.5rem;
    background-color : #ffffff;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 150ms ease;

    &:focus {
        border-color: ${myBlue};
    }
`

const CurveButton = styled("button")`
padding : 0.85rem 1.75rem;
border : none;
outline : none;
border-radius: 1.5rem;
cursor: pointer;
background-color : ${myBlue};
color: white;
font-size: 1rem;
font-family: inherit;
font-weight: 600;
transition: background-color 150ms ease, transform 150ms ease;
&:hover {
    background-color : #1F2F73;
}
&:active {
    transform: scale(0.97);
}
`

const bounceAnimation = keyframes`
 0% {transform: scale(1); }
 50% {transform: scale(1.5); }
 100% {transform: scale(1); }
`

const BouncingSkeleton = styled(Skeleton)(()=>({
    animation: `${bounceAnimation} 1s infinite`,

}))

export {CurveButton, SearchField, InputBox, Link, HiddenInput, BouncingSkeleton}