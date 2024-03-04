import MessageComponent from "./MessageComponent.mjs";
import controlServerSelect from "./controlServerSelect.mjs";
import controlStartBtn from "./controlStartBtn.mjs";
import controlStopBtn from "./controlStopBtn.mjs";
import controlReloadBtn from "./controlReloadBtn.mjs";
import controlRestartBtn from "./controlRestartBtn.mjs";
import controlKillBtn from "./controlKillBtn.mjs";
import controlMenu from "./controlMenu.mjs";

const messageComponents:Array<MessageComponent> = [
    controlMenu,
    controlServerSelect,
    controlStartBtn,
    controlStopBtn,
    controlKillBtn,
    controlRestartBtn,
    controlReloadBtn
];

export default messageComponents;