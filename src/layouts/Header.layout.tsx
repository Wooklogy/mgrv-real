import SVGLogo from "public/svg/MGRV_white.svg";
import { Dropdown, Layout, MenuProps } from "antd";
import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { SiDiscord } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import {
  AiOutlineGift,
  AiOutlineGlobal,
  AiOutlineHistory,
  AiOutlineMenu,
  AiOutlineProfile,
  AiOutlineUser,
} from "react-icons/ai";

import { BsWallet2, BsCart4 } from "react-icons/bs";
import usePrincipal from "@/hooks/usePrincipal";
import { BiCoinStack } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import { removeToken, TokenName } from "@/apis/config.api";
import { useTranslation } from "react-i18next";
import ModalAirdrop from "@/components/modals/Airdrop.modal";
import { motion } from "framer-motion";
import HistoryModal from "@/components/modals/History.modal";
import {
  recoilState_Resize,
  recoilState_ScrollY,
} from "@/recoils/states.recoil";
import { routerPath } from "@/utils/router.util";
import { LINK_DISCORD } from "@/apis/link.api";
import CustomCol from "@/components/grids/Col.grid";
import CustomText from "@/components/texts/Text";
import CustomRow from "@/components/grids/Row.grid";
import CustomButton from "@/components/buttons/Button";
import {
  AppResolution,
  AppTheme,
  HeaderHeight,
  ResoulutionReturner,
} from "@/styles/global.style";
import CustomBox from "@/components/boxs/Box.comp";
import CustomDrawer from "@/components/drawers/Drawer.comp";

interface NavigateProps {
  key?: string;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}
interface CustomLayoutHeaderProps {
  scroll_y?: number;
  router?: string;
}

const CustomHeaderLayout: React.FC<PropsWithChildren> = () => {
  const windowWidth = useRecoilValue(recoilState_Resize);
  const router = useRouter();
  const { principal, refreshPrincipal } = usePrincipal();
  const scrollY = useRecoilValue<number>(recoilState_ScrollY);
  const [visibleOTP, setVisibleOTP] = React.useState<boolean>(true);
  const [onAirdrop, setOnAirdrop] = React.useState<boolean>(false);
  const [onHistory, setOnHistory] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const [openMenu, setMenu] = React.useState<boolean>(false);
  const navigate: NavigateProps[] = [
    {
      label: t("voca.game") || "",
      key: "nav-game",
      onClick: () => {
        router.push(`${routerPath.root}/#game`);
      },
    },
    {
      label: t("voca.node") || "",
      key: "nav-node",
      onClick: () => {
        router.push("/node");
      },
    },
    {
      label: t("voca.mgrv") || "",
      key: "nav-mgrv",
      onClick: () => {
        router.push("/mgrv");
      },
    },

    {
      label: t("voca.support") || "",
      key: "nav-support",
      onClick: () => {
        router.push("/support");
      },
    },
    {
      label: t("voca.discoard") || "",
      key: "nav-discoard",
      icon: <SiDiscord className="margin-left-05" size={"1.25rem"} />,
      onClick: () => {
        window.open(LINK_DISCORD, "_blank");
      },
    },
  ];
  const handleLogout = () => {
    if (window.confirm(t("message.confirm.logout") || "")) {
      removeToken(TokenName);
      refreshPrincipal();
      setMenu(false);
    }
  };

  const profileItems: MenuProps["items"] = [
    {
      key: "hello",
      disabled: true,
      label: (
        <CustomCol span={24}>
          <CustomText
            weight={"bold"}
            width="100%"
            style={{ padding: "1rem 0" }}
          >
            {principal?.mm_nickname}
          </CustomText>
        </CustomCol>
      ),
    },
    {
      key: "profile",
      label: (
        <CustomCol span={24}>
          <CustomText
            weight={"bold"}
            hover={true}
            width="100%"
            style={{ padding: "1rem 0" }}
            onClick={() => {
              router.push(routerPath.account + "/setting");
            }}
          >
            <AiOutlineUser
              size="1.5rem"
              className="margin-right-05"
            ></AiOutlineUser>
            {t("profile.setting")}
          </CustomText>
        </CustomCol>
      ),
    },
    {
      key: "rec",
      label: (
        <CustomCol span={24}>
          <CustomText
            weight={"bold"}
            hover={true}
            clipboard_value={principal?.mm_rec_key}
            width="100%"
            style={{ padding: "1rem 0" }}
          >
            <AiOutlineProfile className="margin-right-05"></AiOutlineProfile>
            {principal?.mm_rec_key}
          </CustomText>
        </CustomCol>
      ),
    },
    {
      key: "coin",
      label: (
        <CustomCol span={24}>
          <CustomText
            weight={"bold"}
            hover={true}
            width="100%"
            style={{ padding: "1rem 0" }}
            onClick={() => {
              router.push(routerPath.inven + "/wallet");
            }}
          >
            <BiCoinStack size="1.5rem" className="margin-right-05" />
            {Number(principal?.mm_coin_balance || 0).toLocaleString()}
          </CustomText>
        </CustomCol>
      ),
    },
    {
      key: "airdrop",
      label: (
        <CustomCol span={24}>
          <CustomText
            weight={"bold"}
            hover={true}
            style={{ padding: "1rem 0" }}
            onClick={() => {
              setOnAirdrop(true);
            }}
          >
            <AiOutlineGift size="1.5rem" className="margin-right-05" />
            {t("profile.airdrop.title")}
          </CustomText>
        </CustomCol>
      ),
    },

    {
      key: "history",
      label: (
        <CustomCol span={24}>
          <CustomText
            weight={"bold"}
            hover={true}
            style={{ padding: "1rem 0" }}
            onClick={() => {
              setOnHistory(true);
            }}
          >
            <AiOutlineHistory size="1.5rem" className="margin-right-05" />
            {t("voca.history")}
          </CustomText>
        </CustomCol>
      ),
    },

    // {
    //     key: "language",
    //     label: (
    //         <CustomCol span={24}>
    //             <CustomText
    //                 onClick={() => {
    //                     i18n.language === "ko-KR"
    //                         ? i18n.changeLanguage("en-US")
    //                         : i18n.changeLanguage("ko-KR");
    //                 }}
    //                 weight={"bold"}
    //                 hover={true}
    //                 style={{ padding: "1rem 0" }}
    //             >
    //                 <AiOutlineGlobal
    //                     size="1.5rem"
    //                     className="margin-right-05"
    //                 />
    //                 {i18n.language === "en-US" ? "English" : "한국어"}
    //             </CustomText>
    //         </CustomCol>
    //     ),
    // },

    // {
    //   key: "nightmode",
    //   label: (
    //     <CustomCol span={24}>
    //       <CustomText
    //         weight={"bold"}
    //         hover={true}
    //         style={{ padding: "1rem 0" }}
    //       >
    //         <Switch className="margin-right-05" defaultChecked></Switch>
    //         Light mode
    //       </CustomText>
    //     </CustomCol>
    //   ),
    // },
    {
      key: "logout",
      label: (
        <CustomCol span={24}>
          <CustomText
            onClick={handleLogout}
            weight={"bold"}
            hover={true}
            style={{ padding: "1rem 0" }}
          >
            <MdOutlineLogout size="1.5rem" className="margin-right-05" />
            {t("voca.logout")}
          </CustomText>
        </CustomCol>
      ),
    },
  ];

  const Title = () => {
    return (
      <CustomRow>
        {principal ? (
          <CustomRow>
            <CustomText class_name="margin-right-1">
              {principal.mm_nickname}
            </CustomText>

            <CustomText weight="bold" onClick={handleLogout} hover={true}>
              {t("voca.logout")}
              <MdOutlineLogout className="margin-left-05" />
            </CustomText>
          </CustomRow>
        ) : (
          <>
            <CustomButton
              className="margin-right-1"
              cursor="pointer"
              onClick={() => {
                setMenu(false);

                router.push(routerPath.login);
              }}
            >
              <CustomText color={AppTheme.color.white} weight="bold">
                {t("voca.login")}
              </CustomText>
            </CustomButton>
            <CustomText
              class_name="nav-child"
              underline={true}
              hover={true}
              cursor="pointer"
              height={"auto"}
              onClick={() => {
                setMenu(false);
                router.push(routerPath.signup);
              }}
            >
              {t("in.1account")}
            </CustomText>
          </>
        )}
      </CustomRow>
    );
  };
  return (
    <>
      <CustomLaoutHeaderStyle scroll_y={scrollY} router={router.pathname}>
        {/* {principal &&
          !principal.otp_scret_key &&
          visibleOTP &&
          ResoulutionReturner(windowWidth, true, true, false, false) && (
            <HeaderPopContainer
              animate={{
                filter: `hue-rotate(${175}deg)`,
              }}
              transition={{
                duration: 50,
                repeatType: "reverse",
                repeat: Infinity,
              }}
            >
              <CustomRow height={"100%"} justify="space-between">
                <CustomCol
                  height={"100%"}
                  className="margin-left-5 flex align-center"
                >
                  <CustomText color={AppStyle.white_color}>
                    {t("main.otp")}
                  </CustomText>
                </CustomCol>
                <CustomCol
                  height={"100%"}
                  className="margin-right-5 flex align-center"
                >
                  <CustomText
                    color={AppStyle.white_color}
                    cursor="pointer"
                    underline={true}
                    class_name="margin-right-3"
                    onClick={() => {
                      router.push(routerPath.createWallet + "/otp1");
                    }}
                  >
                    {t("main.otp1")}
                  </CustomText>
                  <CustomText
                    color={AppStyle.white_color}
                    cursor="pointer"
                    underline={true}
                    onClick={() => {
                      setVisibleOTP(false);
                    }}
                  >
                    <AiOutlineClose />
                  </CustomText>
                </CustomCol>
              </CustomRow>
            </HeaderPopContainer>
          )} */}
        <CustomRow className="flex justify-between align-center header-container">
          <CustomCol className="flex align-center" height={"100%"}>
            <SVGLogo
              height={"35%"}
              onClick={() => {
                router.push(routerPath.root, "");
              }}
              className={"styled-logo nav-child"}
            ></SVGLogo>
          </CustomCol>
          <CustomRow className={"flex align-center justify-end"}>
            {windowWidth >= AppResolution[2] && (
              <>
                <CustomCol
                  className={"flex align-center gap-2 nav margin-right-5"}
                >
                  {navigate.map((item) => {
                    return (
                      <CustomText
                        key={item.key}
                        hover={true}
                        width={"auto"}
                        weight={"regular"}
                        cursor={"pointer"}
                        class_name="nav-child"
                        onClick={item.onClick}
                      >
                        {item.label?.toUpperCase()} {item?.icon}
                      </CustomText>
                    );
                  })}
                </CustomCol>
              </>
            )}
            {principal ? (
              <CustomCol className={"flex justify-end gap-1"}>
                <CustomText
                  size={"xl"}
                  cursor="pointer"
                  hover={true}
                  width={"auto"}
                  class_name="nav-child"
                  onClick={() => {
                    router.push(routerPath.inven + "/wallet");
                  }}
                >
                  <BsWallet2 />
                </CustomText>

                {/* <CustomText
                            size={"xl"}
                            cursor="pointer"
                            class_name="nav-child"
                            hover={true}
                            active_color={AppStyle.primary_color}
                            width={"auto"}
                        >
                            <BsCart4 />
                        </CustomText> */}
                <CustomText
                  size={"xl"}
                  cursor="pointer"
                  hover={true}
                  width={"auto"}
                  class_name="nav-child"
                >
                  <Dropdown
                    menu={{ items: profileItems }}
                    dropdownRender={(menu) => (
                      <CustomBox
                        background_color="white"
                        width={"14.25rem"}
                        style={{ overflow: "clip" }}
                        border_radius={12}
                      >
                        {menu}
                      </CustomBox>
                    )}
                  >
                    <CgProfile />
                  </Dropdown>
                </CustomText>
              </CustomCol>
            ) : (
              <>
                {ResoulutionReturner(windowWidth, true, true, false, false) && (
                  <CustomCol className={"flex justify-end gap-1 align-center "}>
                    <CustomText
                      class_name="nav-child"
                      underline={true}
                      hover={true}
                      cursor="pointer"
                      height={"auto"}
                      color={AppTheme.color.text_third}
                      onClick={() => {
                        router.push(routerPath.signup);
                      }}
                    >
                      {t("in.1account")}
                    </CustomText>
                    <CustomButton
                      cursor="pointer"
                      onClick={() => {
                        router.push(routerPath.login);
                      }}
                    >
                      <CustomText color={AppTheme.color.white} weight="bold">
                        {t("voca.login")}
                      </CustomText>
                    </CustomButton>
                  </CustomCol>
                )}
              </>
            )}
            {ResoulutionReturner(windowWidth, true, false, false, false) && (
              <CustomCol className="margin-right-1 margin-left-3">
                <CustomText
                  hover={true}
                  cursor="pointer"
                  class_name="nav-child"
                  size="2rem"
                  onClick={() => {
                    i18n.language === "ko-KR"
                      ? i18n.changeLanguage("en-US")
                      : i18n.changeLanguage("ko-KR");
                  }}
                >
                  <AiOutlineGlobal className="margin-right-05" />
                  <CustomText class_name="nav-child">
                    {i18n.language === "en-US" ? "English" : "한국어"}
                  </CustomText>
                </CustomText>
              </CustomCol>
            )}
            {ResoulutionReturner(windowWidth, false, true, true, true) && (
              <>
                <CustomText
                  class_name="margin-left-1 nav-child"
                  size={"lg"}
                  onClick={() => {
                    setMenu(true);
                  }}
                  cursor={"pointer"}
                  hover={true}
                  width={"auto"}
                >
                  <AiOutlineMenu />
                </CustomText>
                <CustomDrawer
                  open={openMenu}
                  keyboard={true}
                  title={<Title />}
                  bodyStyle={{ padding: 0 }}
                  extra={
                    <CustomText
                      class_name="margin-left-1 nav-child"
                      size={"lg"}
                      onClick={() => {
                        setMenu(false);
                      }}
                      cursor={"pointer"}
                      hover={true}
                      width={"auto"}
                    >
                      <AiOutlineMenu />
                    </CustomText>
                  }
                  onClose={() => {
                    setMenu(false);
                  }}
                  placement="right"
                  width={300}
                >
                  <>
                    {navigate.map((item) => {
                      return (
                        <MenuItem
                          key={item.key}
                          onClick={() => {
                            if (item.onClick) item.onClick();
                            setMenu(false);
                          }}
                        >
                          <CustomText
                            color={"inherit"}
                            width={"auto"}
                            weight={"regular"}
                            cursor={"pointer"}
                          >
                            {item.label?.toUpperCase()} {item?.icon}
                          </CustomText>
                        </MenuItem>
                      );
                    })}
                    <MenuItem
                      onClick={() => {
                        i18n.language === "ko-KR"
                          ? i18n.changeLanguage("en-US")
                          : i18n.changeLanguage("ko-KR");
                      }}
                    >
                      <CustomText
                        color={"inherit"}
                        width={"auto"}
                        weight={"regular"}
                        cursor={"pointer"}
                      >
                        <AiOutlineGlobal className="margin-right-05" />
                        <CustomText color={"inherit"}>
                          {i18n.language === "en-US" ? "English" : "한국어"}
                        </CustomText>
                      </CustomText>
                    </MenuItem>
                  </>
                </CustomDrawer>
              </>
            )}
          </CustomRow>
        </CustomRow>
        <ModalAirdrop isOpen={onAirdrop} setIsOpen={setOnAirdrop} />
        <HistoryModal isOpen={onHistory} setIsOpen={setOnHistory} />
      </CustomLaoutHeaderStyle>
    </>
  );
};

export default CustomHeaderLayout;

const CustomLaoutHeaderStyle = styled(Layout.Header)<CustomLayoutHeaderProps>`
  width: 100%;
  padding: 0 !important;
  height: fit-content !important;
  box-shadow: rgb(229 232 235 / 0%) 0px 1px 0px 0px;
  background-color: ${(props) =>
    props.scroll_y ? AppTheme.color.white : "transparent"} !important;
  max-width: ${AppResolution[0]}px;
  top: 0px;
  position: fixed;
  z-index: 150;

  box-shadow: ${(props) => props.scroll_y && "0px 0px 8px rgba(0, 0, 0, 0.35)"};

  transition: top 0.5s var(--transition-curve),
    background-color 0.2s var(--transition-curve),
    box-shadow 0.2s var(--transition-curve), color 0.2s var(--transition-curve);
  .header-container {
    height: ${HeaderHeight}px !important;
    padding: 0 3rem !important;

    flex-wrap: nowrap;
    .styled-logo {
      min-width: 100px;
      cursor: pointer;
      :hover {
        fill: ${AppTheme.color.primary};
      }
    }
    .nav-child {
      ${(props) => {
        if (props.router == "/") {
          if (props?.scroll_y) {
            return css`
              fill: ${AppTheme.color.text};
              color: ${AppTheme.color.text};
            `;
          } else {
            return css`
              fill: ${AppTheme.color.white};
              color: ${AppTheme.color.white};
            `;
          }
        } else {
          return css`
            fill: ${AppTheme.color.text};
            color: ${AppTheme.color.text};
          `;
        }
      }}
    }
  }
`;

const HeaderPopContainer = styled(motion.div)`
  top: 0;
  left: 0;
  height: 5rem;
  width: 100%;
  background-color: ${AppTheme.color.primary};
`;

const MenuItem = styled(CustomRow)`
  height: 60px;
  border-bottom: 1px solid ${AppTheme.color.text_third};
  padding: 0 1rem;
  display: flex;
  justify-content: end;
  :hover {
    color: ${AppTheme.color.white} !important;
    background-color: ${AppTheme.color.primary} !important;
  }
`;
