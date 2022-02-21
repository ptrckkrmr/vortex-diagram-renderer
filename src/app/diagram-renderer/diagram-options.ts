/** The options for rendering a vortex diagram. */
export interface DiagramOptions {
    /** The multiplier used for determining the values to plot. */
    multiplier: number;

    /** The modulus used for the diagram. */
    modulus: number;

    /** Whether digits are shown in the diagram. */
    showDigits: boolean;
}