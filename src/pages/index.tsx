import CustomBoxEco from "@/components/boxs/Box.eco.comp";
import CustomBoxGame from "@/components/boxs/Box.game.comp";
import CustomBoxNews from "@/components/boxs/Box.news.comp";
import CustomBoxProduct from "@/components/boxs/Box.product.comp";
import CustomButton from "@/components/buttons/Button";
import CustomCarousel from "@/components/carousel/Carousel";
import CustomMainCarousel, {
  CustomMainCarouselItemProps,
} from "@/components/carousel/MainCarousel.carousel";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomText from "@/components/texts/Text";
import FullLayout from "@/layouts/Full.Layout";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

export default function Home() {
  const windowWidth = useRecoilValue(recoilState_Resize);
  const { t } = useTranslation();
  const mainCarouselItem: CustomMainCarouselItemProps[] = [
    {
      src: "/images/node.jpg",
      title: "Founder's Node",
      sub_title: `${t("main.chance")} ${t("main.limited")}`,
      // "이 기회를 놓치지 마세요! 추가 판매 라운드 없이 50,000대 한정판매",
      content: (
        <CustomCol span={24}>
          <CustomText weight={"bold"} size="sm" color={AppTheme.color.white}>
            {/* {t("main.sale")} */}
          </CustomText>
          <CustomText weight={"bold"} color={AppTheme.color.white}>
            현재가 $1,100
          </CustomText>
          <CustomText weight={"bold"} color={AppTheme.color.white}>
            판매라운드 896/50,000
          </CustomText>
          <CustomButton
            className="margin-top-1"
            width={"15rem"}
            height={"2.75rem"}
          >
            <CustomText
              width={"auto"}
              color={AppTheme.color.white}
              size="sm"
              weight="bold"
            >
              {t("main.1puchase")}
            </CustomText>
          </CustomButton>
        </CustomCol>
      ),
    },
  ];
  return (
    <CustomRow>
      <CustomMainCarousel
        items={mainCarouselItem}
        height={ResoulutionReturner(
          windowWidth,
          "40vw",
          "40vw",
          "100vw",
          "100vw"
        )}
      />
      <FullLayout>
        {/* <CustomCol span={8} offset={4}>
          <CustomText width={"auto"} weight="bold" size="xxl">
            우리와 함께 생태계를 건축하고 <br />
            보상을 받아보세요!
          </CustomText>
        </CustomCol>
        <CustomCol span={11} offset={1}>
          <CustomCol span={24}>
            <CustomText width={"auto"} weight="bold" size="sm">
              다양한 에어드랍 혜택과 생태계 보상이 당신을 기다리고있습니다.
            </CustomText>
          </CustomCol>
          <CustomRow className={"margin-top-05"}>
            <CustomCol span={16}>
              <CustomInput placeholder="이메일을 주소를 입력해주세요." />
            </CustomCol>
            <CustomCol span={4} className="margin-left-05">
              <CustomButton width={"100%"}>
                <CustomText width={"auto"} color={AppStyle.white_color}>
                  회원가입
                </CustomText>
              </CustomButton>
            </CustomCol>
          </CustomRow>
          <CustomRow className={"margin-top-05"}>
            <CustomCheckBox>
              <CustomText size={"ti"} color={AppStyle.input.placehoder_color}>
                약관 및 개인 정보 보호 정책에 동의합니다.
              </CustomText>
            </CustomCheckBox>
          </CustomRow>
        </CustomCol> */}
        <CustomRow className="margin-top-3" id={"game"}>
          <CustomCol span={24}>
            <CustomText size="xxxl" weight={"bold"}>
              {t("voca.play").toUpperCase()}
            </CustomText>
          </CustomCol>
          <CustomCol span={2}>
            <Divider
              className="margin-0 margin-top-05 margin-bottom-1"
              style={{
                borderColor: AppTheme.color.primary,
                borderWidth: 3,
              }}
            ></Divider>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText size="sm" weight={"bold"}>
              {t("main.world")}
            </CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-2">
          <CustomCarousel
            row_count={ResoulutionReturner(windowWidth, 4, 3, 2, 1)}
            gap={12}
            touch_mode={true}
            ratioX={16}
            dot={false}
            arrow={true}
            arrow_size={"3rem"}
            arrow_color={AppTheme.color.text}
            arrow_pos={"-1.5rem"}
            ratioY={15}
            elements={[
              <CustomBoxGame
                key={"ss"}
                title={"M POKER"}
                src={"/images/MLOGO.jpg"}
                window_link={
                  "https://www.mgrovegames.com/Client/mpoker/mpoker.msi"
                }
                android_link={
                  "https://www.mgrovegames.com/Client/mpoker/mpoker.apk"
                }
                android={true}
                window={true}
                // ios={true}
                genre={"board game"}
              ></CustomBoxGame>,
              <CustomBoxGame
                key={"ssw"}
                title={"M MATGO"}
                android={true}
                window={true}
                window_link={
                  "https://www.mgrovegames.com/Client/mpoker/mpoker.msi"
                }
                android_link={
                  "https://www.mgrovegames.com/Client/mpoker/mpoker.apk"
                }
                src={"/images/MATGO.jpg"}
                genre={"board game"}
              ></CustomBoxGame>,
              <CustomBoxGame
                key={"sse"}
                title={"MPOKER"}
                soon={true}
                src={"/images/mgrove1v1.jpg"}
                genre={"board game"}
              ></CustomBoxGame>,
              <CustomBoxGame
                key={"ssr"}
                soon={true}
                title={"MPOKER"}
                src={"/images/mgrove1v1.jpg"}
                genre={"board game"}
              ></CustomBoxGame>,
            ]}
          ></CustomCarousel>
        </CustomRow>
        <CustomRow className="margin-top-5">
          <CustomCol span={24}>
            <CustomText size="xxxl" weight={"bold"}>
              {/* ONLY MGROVE */} {t("main.latestnft")}
            </CustomText>
          </CustomCol>
          <CustomCol span={2}>
            <Divider
              className="margin-0 margin-top-05 margin-bottom-1"
              style={{
                borderColor: AppTheme.color.primary,
                borderWidth: 3,
              }}
            ></Divider>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText size="sm" weight={"bold"}>
              {t("main.limitednft")}
            </CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-2">
          <CustomCarousel
            row_count={ResoulutionReturner(windowWidth, 4, 2, 2, 1)}
            height={"fit-content"}
            gap={24}
            ratioX={19}
            dot={false}
            arrow_size={"3rem"}
            touch_mode={true}
            arrow_color={AppTheme.color.text}
            arrow_pos={"-1.5rem"}
            wrap={ResoulutionReturner(
              windowWidth,
              "false",
              "false",
              "true",
              "true"
            )}
            arrow={ResoulutionReturner(windowWidth, false, true, false, false)}
            ratioY={14}
            elements={[
              <CustomBoxEco key={"ss"} tier="platinum"></CustomBoxEco>,
              <CustomBoxEco key={"ss"} tier="gold"></CustomBoxEco>,
              <CustomBoxEco key={"ss"} tier="silver"></CustomBoxEco>,
              <CustomBoxEco key={"ss"} tier="bronze"></CustomBoxEco>,
            ]}
          ></CustomCarousel>
        </CustomRow>
        {/* <CustomRow className="margin-top-5">
          <CustomCol span={24}>
            <CustomText size="xxxl" weight={"bold"}>
              최신 NFT
            </CustomText>
          </CustomCol>
          <CustomCol span={2}>
            <Divider
              className="margin-0 margin-top-05 margin-bottom-1"
              style={{
                borderColor: AppStyle.primary_color,
                borderWidth: 3,
              }}
            ></Divider>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText size="sm" weight={"bold"}>
              한정판 NFT를 준비하세요.
            </CustomText>
          </CustomCol>
        </CustomRow> */}
        {/* <CustomRow className="margin-top-2">
          <CustomCarousel
            row_count={6}
            gap={12}
            ratioX={4}
            ratioY={5}
            arrow={true}
            spare={6}
            arrow_size={"3rem"}
            arrow_color={AppStyle.color}
            arrow_pos={"-1.5rem"}
            elements={[
              <CustomBoxProduct
                key={"ss"}
                src="/images/drop.png"
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"ss"}
                src="/images/drop.png"
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"ss"}
                src="/images/drop.png"
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"ss"}
                src="/images/drop.png"
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"ss"}
                src="/images/drop.png"
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"ss"}
                src="/images/drop.png"
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"ss"}
                src="/images/drop.png"
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"ss"}
                src="/images/drop.png"
              ></CustomBoxProduct>,
            ]}
          ></CustomCarousel>
        </CustomRow> */}
        <CustomRow className="margin-top-5">
          <CustomCol span={24}>
            <CustomText size="xxxl" weight={"bold"}>
              {t("main.latestdrops")}
            </CustomText>
          </CustomCol>
          <CustomCol span={2}>
            <Divider
              className="margin-0 margin-top-05 margin-bottom-1"
              style={{
                borderColor: AppTheme.color.primary,
                borderWidth: 3,
              }}
            ></Divider>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText size="sm" weight={"bold"}>
              {t("main.limiteddrop")}
            </CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-2">
          <CustomCarousel
            row_count={ResoulutionReturner(windowWidth, 6, 4, 3, 2)}
            gap={12}
            ratioX={4}
            ratioY={5}
            touch_mode={true}
            arrow={true}
            arrow_size={"3rem"}
            spare={6}
            arrow_color={AppTheme.color.text}
            arrow_pos={"-1.5rem"}
            elements={[
              <CustomBoxProduct
                key={"ss"}
                src="/images/drop_sample.jpg"
                soon={true}
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"ssw"}
                soon={true}
                src="/images/drop_sample.jpg"
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"sse"}
                soon={true}
                src="/images/drop_sample.jpg"
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"ssr"}
                soon={true}
                src="/images/drop_sample.jpg"
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"ssq"}
                soon={true}
                src="/images/drop_sample.jpg"
              ></CustomBoxProduct>,
              <CustomBoxProduct
                key={"ssz"}
                soon={true}
                src="/images/drop_sample.jpg"
              ></CustomBoxProduct>,
            ]}
          ></CustomCarousel>
        </CustomRow>

        <CustomRow className="margin-top-5">
          <CustomCol span={24}>
            <CustomText size="xxxl" weight={"bold"}>
              {t("main.news")}
            </CustomText>
          </CustomCol>
          <CustomCol span={2}>
            <Divider
              className="margin-0 margin-top-05 margin-bottom-1"
              style={{
                borderColor: AppTheme.color.primary,
                borderWidth: 3,
              }}
            ></Divider>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText size="sm" weight={"bold"}>
              {t("main.latestnews")}
            </CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-2">
          <CustomCol
            span={ResoulutionReturner(windowWidth, 10, 10, 10, 24)}
            className={ResoulutionReturner(
              windowWidth,
              "",
              "",
              "",
              "margin-bottom-2"
            )}
          >
            <CustomCarousel
              ratioX={16}
              ratioY={9}
              row_count={1}
              elements={
                [
                  // <YouTube
                  //   key={"mgrv-youtube"}
                  //   videoId={
                  //     i18n.language === "ko-KR" ? "M-M3C2adOss" : "9c-hn3W5L6g"
                  //   }
                  //   style={{ width: "100%", height: "100%" }}
                  //   opts={{ width: "100%", height: "100%" }}
                  // ></YouTube>,
                ]
              }
            ></CustomCarousel>
          </CustomCol>
          <CustomCol
            span={ResoulutionReturner(windowWidth, 13, 13, 13, 24)}
            offset={ResoulutionReturner(windowWidth, 1, 1, 1, 0)}
          >
            <CustomCarousel
              ratioX={16}
              ratioY={ResoulutionReturner(windowWidth, 20, 15, 16, 20)}
              gap={24}
              row_count={ResoulutionReturner(windowWidth, 3, 2, 2, 2)}
              arrow={true}
              arrow_size={"3rem"}
              touch_mode={true}
              arrow_pos={"-1.5rem"}
              arrow_color={AppTheme.color.text}
              elements={[
                <CustomBoxNews
                  src="/images/news.png"
                  key={"mgrv-youtube1"}
                ></CustomBoxNews>,
                <CustomBoxNews
                  src="/images/news.png"
                  key={"mgrv-youtube2"}
                ></CustomBoxNews>,
                <CustomBoxNews
                  src="/images/news.png"
                  key={"mgrv-youtube3"}
                ></CustomBoxNews>,
                <CustomBoxNews
                  src="/images/news.png"
                  key={"mgrv-youtube4"}
                ></CustomBoxNews>,
                <CustomBoxNews
                  src="/images/news.png"
                  key={"mgrv-youtube5"}
                ></CustomBoxNews>,
              ]}
            ></CustomCarousel>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-1">
          <CustomCol span={24}>
            <CustomText size="xl" weight={"bold"}>
              {t("main.know")}
            </CustomText>
          </CustomCol>
          <CustomCol span={2}>
            <Divider
              className="margin-0 margin-top-05 margin-bottom-1"
              style={{
                borderColor: AppTheme.color.primary,
                borderWidth: 3,
              }}
            ></Divider>
          </CustomCol>
          <CustomRow>
            <CustomCol span={24}>
              <CustomText weight={"bold"}>
                {t("main.1know")} <br />
                {t("main.2know")} <br />
                {t("main.3know")}
              </CustomText>
            </CustomCol>
          </CustomRow>
        </CustomRow>
        {/* <CustomRow style={{ marginTop: "10rem" }}>
          <CustomCol span={9} offset={3}>
            <CustomText width={"auto"} weight="bold" size="xxl">
              MGROVE의 최신 업데이트를 <br />
              받아보세요.
            </CustomText>
          </CustomCol>
          <CustomCol span={11} offset={1}>
            <CustomCol span={24}>
              <CustomText width={"auto"} weight="bold" size="sm">
                MGROVE의 이벤트 및 새로운 개발에 대한 속보에 가입하십시오.
              </CustomText>
            </CustomCol>
            <CustomRow className={"margin-top-05"}>
              <CustomCol span={16}>
                <CustomInput placeholder="이메일을 주소를 입력해주세요." />
              </CustomCol>
              <CustomCol span={4} className="margin-left-05">
                <CustomButton width={"100%"}>
                  <CustomText width={"auto"} color={AppStyle.white_color}>
                    구독하기
                  </CustomText>
                </CustomButton>
              </CustomCol>
            </CustomRow>
            <CustomRow className={"margin-top-05"}>
              <CustomCheckBox>
                <CustomText size={"ti"} color={AppStyle.input.placehoder_color}>
                  약관 및 개인 정보 보호 정책에 동의합니다.
                </CustomText>
              </CustomCheckBox>
            </CustomRow>
          </CustomCol>
        </CustomRow> */}
      </FullLayout>
      {/* {
        <CustomBanner
          className="margin-top-5"
          height={"25rem"}
          src={"/images/sampleBG_dark.jpg"}
        ></CustomBanner>
      } */}
    </CustomRow>
  );
}
