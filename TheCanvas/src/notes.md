# Intro

The following contains notes on things that we haven't incorporated into our canvas element that are definately worth a mention

## Blend Modes

For detailed info read:
ref: Advanced Game Design chap 2, p 81
Author: Rex van der Spuy

There are 16 blend modes to choose from which have the same effect as the same blend modes have in image editing software such as Photoshop.

The method to invoke these blend modes is:

globalCompositionOperation = "blend mode"

e.g. ctx.globalCompositionOperation = "multiply";

There are 16 blend modes to choose from:

• No blending: "normal"
• Contrast: "soft-light", "hard-light", "overlay"
• Lighten: "lighten", "color-dodge", "screen"
• Darken: "darken", "color-burn", "multiply"
• Color inversion: "difference", "exclusion"
• Complex blending: "hue", "saturation", "color", "luminosity"

Use an image editor to investigate these!

## Compositing Effects

The globalCompositonOperation method also gives control of how ovelapping shapes should be combined. You can use twelve Porter-Duff operations to combine shapes in various ways.

For detailed info read:
ref: Advanced Game Design chap 2, p 82 - 84
Author: Rex van der Spuy

Table 2-1. Canvas compositing effects
Composite operation | What it does
"source-over" | Draws the first shape in front of the second shape.

"destination-over" | Draws the second shape in front of the first shape.

"source-in" | Draws the second shape only on the section of the canvas
where the two shapes overlap.

"destination-in" | Draws the first shape only on the section of the canvas
where the two shapes overlap.

"source-out" | Draws the second shape where it doesn’t overlap the first shape.

"destination-out" | Draws the first shape where it doesn’t overlap the second shape.

"source-atop" | Draws the second shape only where it overlaps the first shape.

"destination-atop" | Draws the first shape only where it overlaps the second shape.

"lighter" | Blends the overlapping shape colors together into a lighter shade.

"darker" | Blends the overlapping shape colors together into a darker shade.

"xor" | Makes the overlapping region transparent.

“copy” | Draws only the second shape.

**See Page 83 for images of the above**
...
