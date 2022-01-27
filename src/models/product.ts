// eslint-disable-next-line import/prefer-default-export
export class Product {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public image: string,
    public price: number,
  ) {}
}
