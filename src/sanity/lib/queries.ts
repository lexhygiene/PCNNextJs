import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "categories": categories[]->title,
  "author": author->name,
  seoDescription
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  body,
  "categories": categories[]->title,
  "author": author->name,
  seoTitle,
  seoDescription
}`;

export const PESTS_QUERY = groq`*[_type == "pest"] | order(commonName asc) {
    _id,
    commonName,
    slug,
    image,
    dangerLevel
}`;

export const PEST_QUERY = groq`*[_type == "pest" && slug.current == $slug][0] {
    _id,
    commonName,
    scientificName,
    slug,
    image,
    dangerLevel,
    seasonalActivity,
    behavior,
    habitat,
    prevention
}`;

export const SERVICE_AREAS_QUERY = groq`*[_type == "serviceArea"] | order(locationName asc) {
    _id,
    locationName,
    slug,
    seoDescription
}`;

export const SERVICE_AREA_QUERY = groq`*[_type == "serviceArea" && slug.current == $slug][0] {
    _id,
    locationName,
    slug,
    seoDescription,
    "commonPests": commonPests[]->{
        _id,
        commonName,
        slug,
        image,
        dangerLevel
    }
}`;
