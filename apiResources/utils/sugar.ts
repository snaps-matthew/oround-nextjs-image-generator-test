export const isMobile = () => !!(
  navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
);

export const isIOS = () => !!(
  navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
);

export const isExpiredTime = (endDate: Date) => (
  endDate && new Date().getTime() > endDate.getTime()
);

export const isNumber = (value: string) => {
  const pattern = new RegExp(/^[0-9]*$/ig);
  return pattern.test(value);
}

export const regex = {
  email: new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi),
  number: new RegExp(/.*[0-9]+.*/),
  upperCase: new RegExp(/.*[A-Z]+.*/),
  lowerCase: new RegExp(/.*[a-z]+.*/),
  specials: new RegExp(/.*[^가-힣a-zA-Z0-9].*/)
};

// export const isValidPassword = (password: string) =>
//   List.of(
//     regex.number.test(password),
//     regex.upperCase.test(password),
//     regex.lowerCase.test(password),
//     regex.specials.test(password)
//   ).filter(it => it).size >= 3;

export const addZero = (num: string | number) : string => {
  let val: number = parseInt(""+num)
  return (val < 10)? "0" : ""+ val ;
}

export const removeQueriesAndHashes = (value: string): string =>
  value.replace(/(\?.*)|(#.*)/g, '');

export const toDateString = (date: Date, separator: string = '.'): string => {
  const padMonth = addZero(date.getMonth() + 1);
  const padDate = addZero(date.getDate());

  return `${date.getFullYear()}${separator}${padMonth}${separator}${padDate}`;
};

export const toMoneyFormat = (value: number): string => {
  return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const removeCharactersExceptNumbers = (value: string): string => value.replace(/\D+/g, '');

export const uniqueKey = (): string =>
  'xxxx-xx-xxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-mixed-operators
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });


export const insertMentionLinks = (markdown: string) => {
  return markdown.replace(
    /\B(@([a-zA-Z0-9](-?[a-zA-Z0-9_])+))/g,
    `**[$1](https://github.com/$2)**`
  )
}

export const shorten = (text = '', maxLength = 140) => {
  // Normalize newlines
  let cleanText = text.replace(/\\r\\n/g, '\n')

  // Return if short enough already
  if (cleanText.length <= maxLength) {
    return cleanText
  }

  const ellip = ' ...'

  // Return the 140 chars as-is if they end in a non-word char
  const oneTooLarge = cleanText.substr(0, 141)
  if (/\W$/.test(oneTooLarge)) {
    return oneTooLarge.substr(0, 140) + ellip
  }

  // Walk backwards to the nearest non-word character
  let i = oneTooLarge.length
  while (--i) {
    if (/\W/.test(oneTooLarge[i])) {
      return oneTooLarge.substr(0, i) + ellip
    }
  }

  return oneTooLarge.substr(0, 140) + ellip
}
