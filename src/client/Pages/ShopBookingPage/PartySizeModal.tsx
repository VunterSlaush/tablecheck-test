import React, {useState} from 'react';
import {PartySizeList} from "../../Components/PartySizeList";
import Counter from "../../Components/Counter";
import {PartySize} from "../../domain/PartySize";
import {MenuItem, Shop} from "../../../types";

type Props = {
    open: boolean;
    close: () => void
    shop: Shop,
    menu: MenuItem[]
    onChange: (PartySize) => void
};

export default function PartySizeModal({open, close, shop, menu, onChange}: Props) {

    const [state, setState] = useState(new PartySize(shop, menu));

    const onChangeCounter = selector => (value: number) => {
        const newPartySize = state.change(selector, value)
        setState(newPartySize);
    }

    const onClose = () => {
        setState(new PartySize(shop, menu))
        close()
    }

    const change = () => {
        onChange(state);
        onClose()
    }

    return (
        <dialog open={open} data-testid="Party Size Modal">
            <h4 style={{margin: "4px"}}>
                Set the Party Size!
            </h4>
            <Counter
                title={"Party Size List Adults Counter"}
                value={state.adult}
                onValueChange={onChangeCounter("adult")}
                validNextMove={val => state.validMove("adult", val)}
            />
            {shop.showSenior && <Counter title={"Party Size List Seniors Counter"}
                                         value={state.senior}
                                         onValueChange={onChangeCounter("senior")}
                                         validNextMove={val => state.validMove("senior", val)}
            />}
            {shop.showChild && <Counter
                title={"Party Size List Children Counter"}
                value={state.children}
                onValueChange={onChangeCounter("children")}
                validNextMove={val => state.validMove("children", val)}
            />}
            {shop.showBaby && <Counter
                title={"Party Size List Babies Counter"}
                value={state.baby}
                onValueChange={onChangeCounter("baby")}
                validNextMove={val => state.validMove("baby", val)}
            ></Counter>}
            <button onClick={onClose}>close</button>
            <button disabled={!state.isValidParty()} onClick={change}>Set</button>
        </dialog>
    );
}
