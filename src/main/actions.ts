export const REGISTER_SECTION = 'REGISTER_SECTION';
export function registerSection(sectionId: string, expanded?: boolean) {
  return {
    expanded,
    sectionId,
    type: REGISTER_SECTION
  };
}

export const TOGGLE_SECTION = 'TOGGLE_SECTION';
export function toggleSection(sectionId: string, expanded?: boolean) {
  return {
    expanded,
    sectionId,
    type: TOGGLE_SECTION
  };
}
