import React, {useState} from "react";
import {PartySize} from "../../domain/PartySize";
import PartySizeModal from "./PartySizeModal";
import {PartySizeList} from "../../Components/PartySizeList";
import {useMenu, useShop} from "../../App";

export function ShopBookingPage(): React<Element> {

    const shop = useShop();
    const menu = useMenu();
    const [isOpen, setOpen] = useState(false);
    const [party, setParty] = useState<PartySize>(null)

    const open = () => {
        setOpen(true)
    }

    const close = () => {
        setOpen(false)
    }

    const onPartyChange = party => {
        setParty(party)
    }

    return (
        <div>
            <h1 data-testid="Shop Title">{`welcome to ${shop.config.slug}`}</h1>
            {party && <PartySizeList partySize={party}/>}
            <button data-testid="Party Size CTA" onClick={open}>
                click here to set party size
            </button>
            <PartySizeModal
                open={isOpen}
                close={close}
                shop={shop.config}
                menu={menu.items}
                onChange={onPartyChange}
            />
        </div>
    );
}
