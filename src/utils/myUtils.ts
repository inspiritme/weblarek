import { categoryMap } from "./constants";

export function applyCategory(element: HTMLElement, value: keyof typeof categoryMap){
  Object.values(categoryMap).forEach(className => element.classList.remove(className));
  element.classList.add(categoryMap[value]);
}

export function errorsArray(x: string[]){
  return x.filter((e: string): e is string => e !== undefined && e !== '')
}