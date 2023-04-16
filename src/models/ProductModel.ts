export interface ProductModel {
  totalPrice: number;
  quantity: number;
  Id: number;
  Code: string;
  Name: string;
  Price: number;
  Stock: number;
  Image: string;
  Color: string;
  CaseMeterial: string;
  CaseSize: number;
  GlassMaterial: string;
  Movement: string;
  WaterResistant: number;
  Description: string;
  Warranty: number;
  Gender: string;
  IsDeleted: boolean;
  BrandId: number;
  CategoryId: number;
  Brand?: any;
  Category?: any;
  PreviewImages: string;
}
