import { AppTheme } from "@/styles/global.style";
import { translatePxValue } from "@/utils/style.util";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { message, Upload, UploadProps } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import CustomButton from "../buttons/Button";
import CustomText from "../texts/Text";

type FileSizeUnits = "BYTE" | "KB" | "MB" | "GB" | "TB";

export interface CustomUploaderProps extends UploadProps {
  width?: string | number;
  height?: string | number;
  list_position?: "left" | "right" | "top" | "bottom";
  mode?: "default" | "profile-image";
  size_unit?: FileSizeUnits;
  file_size?: number;
  icon_size?: number | string;
  color?: string;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUploadImage = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const beforeUpload = (
  file: RcFile,
  maxSize?: number,
  sizeUnit: FileSizeUnits = "MB"
) => {
  if (!maxSize) return true;
  let isFileSet: boolean = false;
  switch (sizeUnit) {
    case "BYTE":
      isFileSet = file.size <= maxSize;
      break;
    case "KB":
      isFileSet = file.size / 1024 <= maxSize;
      break;
    case "MB":
      isFileSet = file.size / 1024 / 1024 <= maxSize;
      break;
    case "GB":
      isFileSet = file.size / 1024 / 1024 / 1024 <= maxSize;
      break;
    case "TB":
      isFileSet = file.size / 1024 / 1024 / 1024 / 1024 <= maxSize;
      break;
  }
  !isFileSet &&
    message.error(
      `ERROR:파일 크기는 ${maxSize}${sizeUnit}을 넘을 수 없습니다.`
    );

  return isFileSet;
};

const CustomUploader: React.FC<CustomUploaderProps> = (props) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<string>();
  const handleRemove = (file: UploadFile) => {
    if (fileList.some((item) => item.uid === file.uid)) {
      setFileList((fileList) =>
        fileList.filter((item) => item.uid !== file.uid)
      );
      return true;
    }
    return false;
  };
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    } else if (info.file.status === "done") {
      setLoading(false);
    }
  };
  const handleImageChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    } else if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const profileUploadButton = (
    <ProfileUplaoder size={props?.file_size} icon_size={props.icon_size}>
      {loading ? (
        <CustomText
          size={props?.icon_size}
          color={props?.color || AppTheme.color.white}
        >
          <LoadingOutlined />
        </CustomText>
      ) : (
        <CustomText
          size={props?.icon_size}
          color={props?.color || AppTheme.color.white}
        >
          <UserOutlined />
        </CustomText>
      )}
    </ProfileUplaoder>
  );

  return (
    <>
      {props.mode === "profile-image" ? (
        <CustomUploadStyle
          {...props}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUploadImage}
          onChange={handleImageChange}
        >
          {imageUrl ? (
            <div className="thumnail">
              <Image src={imageUrl} alt="avatar" />
            </div>
          ) : (
            profileUploadButton
          )}
        </CustomUploadStyle>
      ) : (
        <CustomUploadStyle
          {...props}
          onChange={handleChange}
          fileList={fileList}
          onRemove={handleRemove}
          beforeUpload={(file: RcFile) => {
            beforeUpload(file, props.file_size, props.size_unit) &&
              setFileList(fileList.concat(file));
          }}
        >
          <CustomButton style_type="primary">
            <CustomText weight={700} color={AppTheme.color.white}>
              Upload
            </CustomText>
          </CustomButton>
        </CustomUploadStyle>
      )}
    </>
  );
};

export default CustomUploader;

const CustomUploadStyle = styled(Upload)<CustomUploaderProps>`
  gap: 1rem;
  width: ${(props) => translatePxValue(props.width)};
  height: ${(props) => translatePxValue(props.height)};
  display: flex;
  flex-flow: ${({ list_position }) =>
    list_position === "bottom"
      ? "column"
      : list_position === "top"
      ? "column-reverse"
      : list_position === "left"
      ? "row-reverse"
      : "row"};

  .ant-upload-list-item.ant-upload-list-item-undefined {
    margin: 2px 0;
    padding: 0.25rem 1rem;
  }
  .ant-upload-list.ant-upload-list-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    border-radius: 6px;
    border: 1px solid ${AppTheme.color.primary_alpha};
    height: fit-content;
    min-height: 2.5rem;
  }
`;

const ProfileUplaoder = styled.div<{
  size?: number | string;
  icon_size?: number | string;
}>`
  width: ${(props) => translatePxValue(props.size)};
  height: ${(props) => translatePxValue(props.size)};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.color || "white"};
  border-radius: 50%;
  overflow: hidden;
  padding: 0.5rem;
  svg {
    color: ${(props) => props.color};
    width: 100%;
  }
`;
