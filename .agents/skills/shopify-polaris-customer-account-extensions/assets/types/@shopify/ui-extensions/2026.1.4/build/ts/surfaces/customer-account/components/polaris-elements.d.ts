// Polaris web component element types for customer-account surface
// These are required for public docs and must be exported for doc generation.
// Each export is tagged with @publicDocs and a placeholder JSDoc. Update descriptions as needed.

// Button
/**
 * Properties for the button component element.
 * @publicDocs
 */
export type ButtonElementProps =
  import('../../checkout/components/Button').ButtonElementProps;
/**
 * Events for the button component element.
 * @publicDocs
 */
export type ButtonElementEvents =
  import('../../checkout/components/Button').ButtonElementEvents;
/**
 * Slots for the button component element.
 * @publicDocs
 */
export type ButtonElementSlots =
  import('../../checkout/components/Button').ButtonElementSlots;
/**
 * Methods for the button component element.
 * @publicDocs
 */
export type ButtonElementMethods =
  import('../../checkout/components/Button').ButtonElementMethods;

// Add similar exports for all other missing Polaris web components (TextField, Checkbox, etc.) following this pattern.

// Checkbox
/**
 * Properties for the Checkbox component element.
 * @publicDocs
 */
export type CheckboxElementProps =
  import('../../checkout/components/Checkbox').CheckboxElementProps;
/**
 * Events for the Checkbox component element.
 * @publicDocs
 */
export type CheckboxElementEvents =
  import('../../checkout/components/Checkbox').CheckboxElementEvents;
// No slots or methods for Checkbox in checkout

// TextField
/**
 * Properties for the TextField component element.
 * @publicDocs
 */
export type TextFieldElementProps =
  import('../../checkout/components/TextField').TextFieldElementProps;
/**
 * Events for the TextField component element.
 * @publicDocs
 */
export type TextFieldElementEvents =
  import('../../checkout/components/TextField').TextFieldElementEvents;
/**
 * Slots for the TextField component element.
 * @publicDocs
 */
export type TextFieldElementSlots =
  import('../../checkout/components/TextField').TextFieldElementSlots;
// No methods for TextField in checkout

// Select
/**
 * Properties for the Select component element.
 * @publicDocs
 */
export type SelectElementProps =
  import('../../checkout/components/Select').SelectElementProps;
/**
 * Events for the Select component element.
 * @publicDocs
 */
export type SelectElementEvents =
  import('../../checkout/components/Select').SelectElementEvents;
// No slots or methods for Select in checkout

// ClickableChip
/**
 * Slots for the ClickableChip component element.
 * @publicDocs
 */
export type ClickableChipElementSlots =
  import('../../checkout/components/ClickableChip').ClickableChipElementSlots;

/**
 * Events for the ClickableChip component element.
 * @publicDocs
 */
export type ClickableChipElementEvents =
  import('../../checkout/components/ClickableChip').ClickableChipElementEvents;

// Badge
/**
 * Properties for the Badge component element.
 * @publicDocs
 */
export type BadgeElementProps =
  import('../../checkout/components/Badge').BadgeElementProps;

// Spinner
/**
 * Properties for the Spinner component element.
 * @publicDocs
 */
export type SpinnerElementProps =
  import('../../checkout/components/Spinner').SpinnerElementProps;

// Tooltip
/**
 * Properties for the Tooltip component element.
 * @publicDocs
 */
export type TooltipElementProps =
  import('../../checkout/components/Tooltip').TooltipElementProps;

// Chip
/**
 * Properties for the Chip component element.
 * @publicDocs
 */
export type ChipElementProps =
  import('../../checkout/components/Chip').ChipElementProps;
/**
 * Slots for the Chip component element.
 * @publicDocs
 */
export type ChipElementSlots =
  import('../../checkout/components/Chip').ChipElementSlots;

// UnorderedList
/**
 * Properties for the UnorderedList component element.
 * @publicDocs
 */
export type UnorderedListElementProps =
  import('../../checkout/components/UnorderedList').UnorderedListElementProps;

// OrderedList
/**
 * Properties for the OrderedList component element.
 * @publicDocs
 */
export type OrderedListElementProps =
  import('../../checkout/components/OrderedList').OrderedListElementProps;
