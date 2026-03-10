// @ts-expect-error
import QRCode from "qrcode";

export function getQRCode() {
  return <img class="w-80 h-80" src={QRCode.toDataURL("TODO")} />;
}
