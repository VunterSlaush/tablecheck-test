import {PartySize} from "../domain/PartySize";

type Props = {
    partySize: PartySize;
};

export const PartySizeList = ({partySize}: Props): JSX.Element => {
    return <div data-testid="Party Size List" style={{marginBottom: "12px"}}>
        <h3>The party Size </h3>
        {partySize.adult > 0 && <span>Adults: {partySize.adult}<br/></span>}
        {partySize.senior > 0 && <span>Seniors: {partySize.senior}<br/></span>}
        {partySize.children > 0 && <span>Children: {partySize.children}<br/></span>}
        {partySize.baby > 0 && <span>Babies: {partySize.baby}<br/></span>}
    </div>;
};
