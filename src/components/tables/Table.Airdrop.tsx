import { APICouponHistory } from "@/apis/coupon/coupon.api";
import usePrincipal from "@/hooks/usePrincipal";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import CustomTable, { CustomTableProps, EmptyTableStyle } from "./Table.comp";

interface DataType {
  key?: string;
  name?: string;
  code?: string;
  date: Date;
}
const CustomTableAirdrop: React.FC<CustomTableProps> = (props) => {
  const { t } = useTranslation();
  const { principal } = usePrincipal();
  const [dataSource, setDataSource] = React.useState<DataType[]>();
  const { data, isLoading } = useQuery(
    ["getAirdropHistory", principal?.mm_identity],
    APICouponHistory
  );
  React.useEffect(() => {
    const refactory: DataType[] = data?.data?.map((item: any): DataType => {
      return {
        key: item?.id,
        code: item?.code,
        date: item?.created_at,
        name: item?.name,
      };
    });
    setDataSource(refactory);
  }, [data]);

  const Columns: ColumnsType<DataType> = [
    {
      title: t("profile.airdrop.title"),
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: t("profile.airdrop.code"),
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: t("profile.airdrop.date"),
      dataIndex: "date",
      key: "date",
      align: "center",
      sorter: (a: any, b: any) => dayjs(a.date).date() - dayjs(b.date).date(),
      render: (value: any) => {
        return <>{dayjs(value).format("YYYY-MM-DD")}</>;
      },
    },
  ];
  return (
    <CustomTable
      {...props}
      columns={Columns}
      dataSource={dataSource}
      loading={isLoading}
      showSorterTooltip={false}
      pagination={{ pageSize: 10 }}
      locale={{ emptyText: <EmptyTableStyle /> }}
    ></CustomTable>
  );
};

export default CustomTableAirdrop;
