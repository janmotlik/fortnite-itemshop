import { ItemType } from "../hooks/useFetch.ts";

export function getItemType(entry: any) {
  if (entry.bundle) return ItemType.BUNDLE;
  if (entry.tracks) return ItemType.TRACK;
  if (entry.instruments) return ItemType.INSTRUMENT;
  return ItemType.NORMAL;
}

export function getName(entry: any) {
  if (entry.bundle) return entry.bundle.name;
  if (entry.brItems) return entry.brItems[0]?.name;
  if (entry.tracks) return entry.tracks[0]?.title;
  if (entry.cars) return entry.cars[0]?.name;
  return entry.instruments?.[0]?.name;
}

export function getImage(entry: any) {
  if (entry.bundle) return entry.bundle.image;
  if (entry.tracks) return entry.tracks[0].albumArt;
  if (entry.newDisplayAsset) {
    const displayAsset = entry.newDisplayAsset;
    return displayAsset.renderImages
      ? displayAsset.renderImages[0]?.image
      : displayAsset.materialInstances[0]?.images?.OfferImage;
  }
  if (entry.instruments) return entry.instruments[0].images.large;
  return entry.cars?.[0].images.large ?? "";
}