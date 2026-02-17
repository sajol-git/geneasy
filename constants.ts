// ==========================================
// USER CONFIGURABLE PROMPT TEMPLATES
// ==========================================
// Edit these strings to change the "Pre-filled" part of the prompts.

// 1. PRODUCT PHOTO PROMPT
export const PHOTO_PROMPT_PREFIX = "Ultra-realistic professional product photography of ";
export const PHOTO_PROMPT_SUFFIX = " for NeedieShop eCommerce website. Background and environment must match the product’s real-life use case and purpose. Scene should feel natural, functional, and contextually relevant — not decorative. Soft cinematic lighting, high detail, commercial advertising quality, realistic textures, sharp focus on product, subtle depth of field, premium modern aesthetic, 4K resolution, no watermark, no text.";

// 2. DESCRIPTION PROMPT
// The user input will be appended to this.
export const DESCRIPTION_PROMPT_PREFIX = `Analyze the following reference product description and extract its structure, tone, persuasion style, and selling psychology.
Then write a completely original, high-converting product description for NeedieShop, a modern gadget-focused eCommerce brand in Bangladesh.

The description must:
– Be clear, benefit-driven, and trust-building
– Focus on real-life usage and problem solving
– Avoid generic buzzwords
– Include a strong hook in the first 2–3 lines
– Explain key features as benefits, not just specifications
– Include subtle urgency or value reinforcement
– Be optimized for online sales conversion
– Use simple but premium language
– Avoid copying wording from the reference

Target audience: Smart Bangladeshi online buyers looking for reliable tech gadgets at competitive prices.

Input Data / Reference: `;

// 3. AD COPY PROMPT
// The user input will be appended to this.
export const AD_COPY_PROMPT_PREFIX = `Analyze the following reference advertisement copy and identify its structure, emotional triggers, persuasion strategy, and conversion flow.
Then create a completely original, high-converting Facebook ad copy for NeedieShop (a gadget-focused eCommerce brand in Bangladesh).

Important Requirements:
– The final output MUST be written entirely in Bangla
– Do not copy wording from the reference
– Start with a powerful hook in the first 3–4 lines
– Clearly highlight a common problem faced by the target audience
– Present the product as the practical solution
– Explain features as real-life benefits
– Build trust and reduce buying hesitation
– Include a strong and clear call-to-action at the end
– Keep the tone professional, confident, and persuasive
– Avoid excessive emojis

Target Audience: Online gadget buyers in Bangladesh who value performance, reliability, and fair pricing.

Input Data / Reference: `;

// ==========================================
// APP CONSTANTS
// ==========================================
export const APP_NAME = "NEXUS GEN";
export const APP_TAGLINE = "Advanced AI Prompt Engineering Workspace";
