//**  이메일 정규식 */
export const RegexpEmailCheck = (email: string) => {
  const re = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return re.test(email);
};

// ** 비밀번호 정규식 */
export const RegexpPasswordCheck = (password: string) => {
  const re =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&`]{8,}$/;
  return re.test(password);
};

// ** 핀 번호 정규식 */
export const RegexpWalletPasswordCheck = (password: string) => {
  const re = /^[\d]{6,6}$/;
  return re.test(password);
};

//** 닉네임 정규식 */
export const RegexpNicknameCheck = (nickname: string) => {
  const eng = /^[a-zA-Z]*$/;
  return eng.test(nickname) && nickname.length >= 2 && nickname.length <= 12;
};
