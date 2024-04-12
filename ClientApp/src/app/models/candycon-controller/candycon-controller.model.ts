import { CandyconDpad } from "../candycon-dpad/candycon-dpad.model";
import { CandyconFaceplate } from "../candycon-faceplate/candycon-faceplate.model";
import { CandyconThumbstick } from "../candycon-thumbstick/candycon-thumbstick.model";

export interface CandyconController {
  dpad: CandyconDpad;
  joystick: CandyconThumbstick;
  faceplate: CandyconFaceplate;
}
