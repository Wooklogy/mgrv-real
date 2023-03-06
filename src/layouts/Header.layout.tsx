import { useRouter } from "next/router";
import React from "react";

interface LocalNavigateItemProps {
  key: string;
  label?: string | null;
  icon?: React.ReactNode;
}

const WoHeaderLayout: React.FC = () => {
  const router = useRouter();
  return <></>;
};
export default WoHeaderLayout;
