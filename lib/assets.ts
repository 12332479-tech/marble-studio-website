// Central references to generated imagery, aligned by index with dictionary content.

// One generated texture photo per stone in lib/products-data.ts, keyed by a
// slugified version of the stone's name. Files live in /public/product-images.
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function getStoneImage(name: string): string {
  return `/product-images/${slugify(name)}.jpg`
}

export const productImages = [
  "/images/slab-white-marble.png",
  "/images/slab-beige-travertine.png",
  "/images/slab-green-marble.png",
  "/images/slab-black-granite.png",
  "/images/slab-black-granite.png",
  "/images/slab-beige-travertine.png",
]

export const galleryImages = [
  { src: "/images/hero-marble.png", key: "kitchen" },
  { src: "/images/project-bathroom.png", key: "bathroom" },
  { src: "/images/project-flooring.png", key: "flooring" },
  { src: "/images/project-staircase.png", key: "staircase" },
  { src: "/images/project-fireplace.png", key: "fireplace" },
  { src: "/images/about-workshop.png", key: "workshop" },
]

export const CONTACT = {
  phone: "+961 5 123 456",
  phoneHref: "tel:+9615123456",
  email: "info@evagranite.com",
  whatsapp: "https://wa.me/9615123456",
  lat: 33.7734855,
  lng: 35.8759611,
  mapsUrl: "https://www.google.com/maps/place/Eva+Granite+and+marble/@33.7734899,35.8733862,17z/data=!3m1!4b1!4m6!3m5!1s0x151f3353e856a595:0x71ef42603cd56377!8m2!3d33.7734855!4d35.8759611",
}
