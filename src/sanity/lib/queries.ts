import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(coalesce(featured, false) desc, coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  slug,
  publishedAt,
  featured,
  mainImage,
  mainImageExternalUrl,
  "categories": categories[]->title,
  "author": author->name,
  seoDescription
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  mainImageExternalUrl,
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
    mainImageExternalUrl,
    dangerLevel
}`;

export const PEST_QUERY = groq`*[_type == "pest" && slug.current == $slug][0] {
    _id,
    commonName,
    scientificName,
    slug,
    image,
    mainImageExternalUrl,
    dangerLevel,
    seasonalActivity,
    behavior,
    habitat,
    prevention,
    seoTitle,
    seoDescription
}`;

export const SERVICE_AREAS_QUERY = groq`*[_type == "serviceArea" && defined(slug.current)] | order(coalesce(orderRank, 100) asc, locationName asc) {
    _id,
    locationName,
    slug,
    orderRank,
    seoDescription,
    parent->{
        _id,
        locationName
    }
}`;

export const SERVICE_AREA_QUERY = groq`*[_type == "serviceArea" && slug.current == $slug][0] {
    _id,
    locationName,
    slug,
    seoTitle,
    seoDescription,
    parent->{
        _id,
        locationName,
        slug
    },
    "children": *[_type == "serviceArea" && references(^._id)] | order(locationName asc) {
        _id,
        locationName,
        slug
    },
    "commonPests": commonPests[]->{
        _id,
        commonName,
        slug,
        image,
        mainImageExternalUrl,
        dangerLevel
    }
}`;
