import { Select, SelectProps } from "antd";

export interface CustomSelectProps extends SelectProps {
  width?: string | number;
  height?: string | number;
}

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  return <Select {...props}></Select>;
};
export default CustomSelect;
