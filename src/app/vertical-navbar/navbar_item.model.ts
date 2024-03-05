// Each menu item which consists of on NavbarItem, following this data structure
export class NavbarItem
{
  name: string;
  imagePath: string;
  imagePathSelected : string;
  altText: string;

  constructor(name: string, imagePath: string, imagePathSelected: string, altText: string)
  {
    this.name = name;
    this.imagePath = imagePath;
    this.imagePathSelected = imagePathSelected;
    this.altText = altText;
  }
}
