import React from "react";

export default interface VisibleDivProps extends React.HTMLProps<HTMLDivElement> {
    isVisible: boolean;
}