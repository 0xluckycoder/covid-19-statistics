export default function FlagComponent (slFlag, global) {
    const slElement = document.querySelector('.sl-flag');
    const globalElement = document.querySelector('.global');

    const initSlFlag = new Image();
    const initGlobalFlag = new Image();

    initSlFlag.src = slFlag;
    initGlobalFlag.src = global;

    slElement.appendChild(initSlFlag);
    globalElement.appendChild(initGlobalFlag);

}