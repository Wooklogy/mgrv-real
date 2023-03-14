import { AppTheme } from "@/styles/global.style";
import { translatePxValue } from "@/utils/style.util";
import { Table, TableProps } from "antd";
import { t } from "i18next";
import styled from "styled-components";

export interface CustomTableProps extends TableProps<any> {
  width?: string | number;
  height?: string | number;
}
const CustomTable: React.FC<CustomTableProps> = (props) => {
  return (
    <CustomTableStyle
      {...props}
      locale={{ emptyText: <EmptyTableStyle /> }}
    ></CustomTableStyle>
  );
};

export default CustomTable;

const CustomTableStyle = styled(Table)<CustomTableProps>`
  width: ${(props) => translatePxValue(props.width)};
  height: ${(props) => translatePxValue(props.height)};
  .ant-table-content {
    min-height: 25rem;
    .ant-table-placeholder {
      height: 25rem;
    }
  }
  & tr th {
    &::before {
      display: none;
    }
  }

  td.ant-table-cell {
    border-bottom: 1px solid white !important;
  }

  && tbody > tr:hover > td {
    background: ${AppTheme.color.primary_alpha} !important;
  }
  .ant-table-thead {
    th {
      background-color: ${AppTheme.color.primary} !important;
      color: ${AppTheme.color.white} !important;
    }
  }

  && .ant-checkbox-inner {
    border: 1px solid white;
    background-color: transparent;
  }
  .ant-pagination-item-active {
    a {
      color: ${AppTheme.color.primary_alpha};
    }
    border-color: ${AppTheme.color.primary_alpha};
  }
  .ant-pagination-item-active:hover {
    a {
      color: ${AppTheme.color.primary};
    }
    border-color: ${AppTheme.color.primary};
  }
`;
export const EmptyTableStyle = () => {
  return (
    <span className="empty-text">
      {/* <div>{t("w.notransactions")}</div> */}
      {/* <div>{t("w.aftertransaction")}</div> */}
    </span>
  );
};
