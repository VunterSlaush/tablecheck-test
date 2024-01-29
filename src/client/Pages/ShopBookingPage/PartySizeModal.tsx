import React, {useEffect, useState} from 'react';
import {PartySizeList} from "../../Components/PartySizeList";
import Counter from "./Counter";
import {useMutableState} from "../../utils/useMutableState";
import {PartySize} from "./PartySize";
import {MenuItem, Shop} from "../../../types";

type Props = {
    open: boolean;
    close: () => void
    shop: Shop,
    menu: MenuItem[]

};

export default function PartySizeModal({open, close, shop, menu}: Props) {

    const [state, setState] = useState(new PartySize(shop, menu));

    const onChangeCounter = selector => (value: number) => {
        const newPartySize = state.change(selector, value)
        setState(newPartySize);
    }

    return (
        <dialog open={open} data-testid="Party Size Modal">
            <PartySizeList partySize={state}/>
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
            <button onClick={close}>close</button>
        </dialog>
    );
}
