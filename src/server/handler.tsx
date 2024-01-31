import {MenuItem, Shop, Store} from "../types";
import {CONTEXT_ID} from "../client/App/hydration";
import {Request, Response} from "express";
import {renderToString} from "react-dom/server";
import {App, context} from "../client/App";
import axios from "axios";

type Get = <T, R = axios.AxiosResponse<T>>(url: string) => Promise<T>

export default class Handler {
    private readonly get: Get

    constructor(get: Get) {
        this.get = get
    }

    public bookingHandler = async (req: Request, res: Response) => {

        try {
            const {data: shop} = await this.get<Shop>(
                `/shops/${req.params.shop}`
            );
            const {data: menu} = await this.get<MenuItem[]>(
                `/shops/${req.params.shop}/menu`
            );
            const store = {
                shop,
                menu,
            };

            const markup = renderToString(<App store={store}/>);
            const html = Handler.interpolate(markup, req.params.shop, store);

            res.send(html);
        } catch (e) {
            console.log(e.config);
            res.send((e as Error).message);
        }
    }

    private static interpolate(markup: string, slug: string, store: Store): string {
        return `
      <html lang="en">
        <head>
          <link
            rel="shortcut icon"
            href="https://cdn0.tablecheck.com/common/images/favicons/tc/v1.0.0/apple-icon-precomposed.png"
            type="image/x-icon"
          />
          <title>${slug}</title>
        </head>
        <body>
          <div id="root">${markup}</div>
          <div style="display: none;" id="${CONTEXT_ID}">${context.chunk(store)}</div>
          <script src="/public/bundle.js"></script>
        </body>
      </html>
    `;
    }

}