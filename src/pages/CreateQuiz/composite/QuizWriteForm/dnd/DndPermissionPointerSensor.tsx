import { PointerSensor } from "@dnd-kit/core";
import {
  hasAllowDndAttribute,
  hasNoDndAttribute,
  isInteractiveElement,
} from "./dndUtil";

export class DndPermissionPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown" as const,
      handler: ({ nativeEvent: event }: { nativeEvent: PointerEvent }) => {
        const element = event.target as HTMLElement;
        if (hasAllowDndAttribute(element)) {
          return true;
        }
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          isInteractiveElement(element) ||
          hasNoDndAttribute(element)
        ) {
          return false;
        }

        return true;
      },
    },
  ];
}
