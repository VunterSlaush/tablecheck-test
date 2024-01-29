import {useMenu, useShop} from "../../App";
import {useMutableState} from "../../utils/useMutableState";
import {PartySize} from "./PartySize";
import PartySizeModal from "./PartySizeModal";

type Controller = {
    title: string;
    isCTAOpen: boolean;
    openCTA(): void;
    closeCTA(): void;
    renderModal(): JSX.Element;
};

export function useController(): Controller {
    const shop = useShop();
    const menu = useMenu();
    const [state, setState] = useMutableState({
        isCTAOpen: false,
        partySize: new PartySize(shop.config, menu.items),
    });

    const openCTA = () => {
        setState((state) => {
            state.isCTAOpen = true;
        });
    }

    const closeCTA = () => {
        setState((d) => {
            d.isCTAOpen = false;
        });
    }

    const renderModal = () => {
        return (
            <PartySizeModal
                open={state.isCTAOpen}
                close={closeCTA}
                shop={shop.config}
                menu={menu.items}
            />
        );
    }

    return {
        isCTAOpen: state.isCTAOpen,
        title: `welcome to ${shop.config.slug}`,
        openCTA,
        closeCTA,
        renderModal,
    };
}
