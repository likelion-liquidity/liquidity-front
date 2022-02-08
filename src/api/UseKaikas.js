import Caver from "caver-js";
import { getKlaytnProvider } from "../commons/comnFunc";
const klaytn = getKlaytnProvider();

export const KlayEnable = () => {
    klaytn.enable();
};
// const caver = new Caver(klaytn)




