import MessageComponent from "./MessageComponent.mjs";
import controlServerSelect from "./controlServerSelect.mjs";
import controlStartBtn from "./controlStartBtn.mjs";
import controlStopBtn from "./controlStopBtn.mjs";
import controlKillBtn from "./controlKillBtn.mjs";
import controlReloadBtn from "./controlReloadBtn.mjs";

const messageComponents:Array<MessageComponent> = [
    controlServerSelect,
    controlStartBtn,
    controlStopBtn,
    controlKillBtn,
    controlReloadBtn
];

export default messageComponents;