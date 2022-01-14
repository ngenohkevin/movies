import React, {useRef, useState} from 'react';
import "./Collapsible.css";

export default function Collapsible(props) {


    const [isOpen, setIsOpen] = useState(false);
    const parentRef = useRef();


    return (
        <div className="collapsible">
            <button
                className="toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {props.label}
                {props.name}
            </button>
            <div className="content-parent"
                 ref={parentRef}
                 style={isOpen ? {
                     height: parentRef.current.scrollHeight + "px"
                 }: {
                     height: "0",
                 }}
            >
                <div className="content">{props.children}</div>
            </div>
        </div>
    );
};
