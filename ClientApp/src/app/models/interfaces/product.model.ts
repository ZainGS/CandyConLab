export interface Product {
  /// Base info
  id: number;
  UPC: number;
  brandName: string;
  vendorPartNumber: string;
  name: string;
  description: string;
  imageUrls: string[];
  productUrl?: string;
  partColor: string;
  price: number;

  /// Dimensions
  // inches
  productLength: number;
  productWidth: number;
  productHeight: number;
  // lbs
  productWeight: number;

  // For bundle checks
  isPlayerReadyPack?: boolean;
  isComboPack?: boolean;
}
