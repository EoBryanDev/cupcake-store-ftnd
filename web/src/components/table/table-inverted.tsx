type TProductExtraDetails = {
  id: string | null;
  description: string | null;
  unit: string | null;
  color: string | null;
  width: string | null;
  height: string | null;
  weight: string | null;
  size: string | null;
  rawMaterial: string | null;
};

interface IProps {
  productInfo: TProductExtraDetails;
}
const TableInverted: React.FC<IProps> = ({ productInfo }: IProps) => {
  return (
    <table className="w-full">
      <tbody>
        <tr className="border-t border-b py-5 text-left">
          <th className="py-2">Description</th>
          <td>{productInfo.description ?? ""}</td>
        </tr>
        <tr className="border-t border-b py-5 text-left">
          <th className="py-2">Unit</th>
          <td>{productInfo.unit ?? ""}</td>
        </tr>
        <tr className="border-t border-b py-5 text-left">
          <th className="py-2">Color</th>
          <td>{productInfo.color ?? ""}</td>
        </tr>
        <tr className="border-t border-b py-5 text-left">
          <th className="py-2">Width</th>
          <td>{productInfo.width ?? ""}</td>
        </tr>
        <tr className="border-t border-b py-5 text-left">
          <th className="py-2">Height</th>
          <td>{productInfo.height ?? ""}</td>
        </tr>
        <tr className="border-t border-b py-5 text-left">
          <th className="py-2">Peso</th>
          <td>{productInfo.weight ?? ""}</td>
        </tr>
        <tr className="border-t border-b py-5 text-left">
          <th className="py-2">Size</th>
          <td>{productInfo.size ?? ""}</td>
        </tr>
        <tr className="border-t border-b py-5 text-left">
          <th className="py-2">Ingredients</th>
          <td>{productInfo.rawMaterial ?? ""}</td>
        </tr>
      </tbody>
    </table>
  );
};
export { TableInverted };
