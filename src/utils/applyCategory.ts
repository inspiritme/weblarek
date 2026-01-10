import { categoryMap } from "./constants";

export function applyCategory(element: HTMLElement, value: keyof typeof categoryMap){
  Object.values(categoryMap).forEach(className => element.classList.remove(className));
  element.classList.add(categoryMap[value]);
}