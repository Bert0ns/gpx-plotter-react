import VisibleDivProps from "@/app/components/atoms/VisibleDiv/index.types";
import {FC} from "react";

const VisibleDiv: FC<VisibleDivProps> = ({isVisible, children,...props}) => {
    if(!isVisible)
    {
        return null;
    }

    return (
        <div {...props}>
            {children}
        </div>
    )
}

export default VisibleDiv;