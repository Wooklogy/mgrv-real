export interface WoAppThemeProps {
  color: {
    primary?: string;
    primary_alpha?: string;
    // text and default
    text?: string;
    text_second: string;
    text_third: string;
    white: string;
    black: string;
    success: string;
    error: string;
    placehoder: string;
  };
  font_size: {
    ti: string;
    de: string;
    sm: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
    abstract: string;
    title: string;
  };
}
export const AppTheme: WoAppThemeProps = {
  color: {
    primary: "#7346F3",
    primary_alpha: "rgba(115, 70, 243,0.5)",
    text: "#4E4E4E",
    text_second: "#A5A5A5",
    text_third: "#D9D9D9",
    white: "#FFFFFF",
    black: "#000000",
    success: "#39CF48",
    error: "#F15555",
    placehoder: "#828282",
  },
  font_size: {
    ti: "0.75rem",
    de: "1rem",
    sm: "1.25rem",
    lg: "1.725rem",
    xl: "2rem",
    xxl: "2.25rem",
    xxxl: "2.75rem",
    abstract: "2.5rem",
    title: "3rem",
  },
};
export const STYLE_GRADIANT_COLOR1 = "#E0C3FC";
export const STYLE_GRADIANT_COLOR2 = "#8EC5FC";
export const HeaderHeight = 72;
export const AppResolution = [2560, 1440, 1024, 768, 600];
export const ResoulutionReturner = (
  windowWidth: number,
  pc: any,
  horizon_tablet: any,
  tablet: any,
  mobile: any
) => {
  return windowWidth >= AppResolution[2]
    ? pc
    : windowWidth < AppResolution[2] && windowWidth >= AppResolution[3]
    ? horizon_tablet
    : windowWidth < AppResolution[3] && windowWidth >= AppResolution[4]
    ? tablet
    : windowWidth < AppResolution[4]
    ? mobile
    : pc;
};
