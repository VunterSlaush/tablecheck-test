import {useController} from "./useController";
import React from "react";

export function ShopBookingPage(): React<Element> {

    const {title, openCTA, renderModal} = useController();

    return (
        <div>
            <h1 data-testid="Shop Title">{title}</h1>
            <button data-testid="Party Size CTA" onClick={openCTA}>
                click here to set party size
            </button>
            {renderModal()}
        </div>
    );
}
