import {MenuItem, Shop} from "../../../types";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;


export class PartySize {
    private readonly shop: Shop;

    private readonly menu: MenuItem[];

    adult: number;
    children: number;
    senior: number;
    baby: number;

    constructor(shop: Shop, menu: MenuItem[]) {
        this.shop = shop;
        this.menu = menu;
        this.adult = 0;
        this.children = 0;
        this.senior = 0;
        this.baby = 0;
    }

    copy() {
        const copy = new PartySize(this.shop, this.menu)
        copy.adult = this.adult;
        copy.children = this.children;
        copy.senior = this.senior;
        copy.baby = this.baby;
        return copy;
    }

    change(selector: string, value: number): PartySize {
        const copy = this.copy()
        copy[selector] = value;
        return copy;
    }

    private isValidParty(): boolean {
        const min = this.getMin();
        const max = this.getMax();
        const sum = this.sumValues()
        return (sum >= 0 && sum <= min) || (max >= sum && sum >= min);
    }

    public validMove(selector: string, value: number): boolean {
        if (this[selector] === 0 && value < 0) return false;

        const min = this.getMin();
        const max = this.getMax();
        const preValue = this[selector];
        this[selector] = value
        const sum = this.sumValues()
        this[selector] = preValue;

        return (sum >= 0 && sum <= min) || (max >= sum && sum >= min);
    }

    private sumValues(): number {
        return this.adult + this.senior + this.baby + this.children;
    }

    private getMin() {
        let min = this.getMinFromMenu() || this.shop.minNumPeople;
        if (min <= 0) return 1;
        return min;
    }

    private getMax() {
        let max = this.getMaxFromMenu() || this.shop.minNumPeople;
        if (max >= Infinity) return 10;
        return max;
    }

    private getMinFromMenu() {

        for (const item of this.menu) {
            if (item.isGroupOrder) {
                return item.minOrderQty
            }
        }

        return null;
    }

    private getMaxFromMenu() {
        for (const item of this.menu) {
            if (item.isGroupOrder) {
                return item.maxOrderQty
            }
        }
        return null;
    }
}
