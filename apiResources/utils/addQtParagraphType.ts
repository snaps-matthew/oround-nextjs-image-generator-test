export const addQtParagraphType = (htmlText:any, defaultStyle:any)=> {
  //return htmlText.replace(/"><br></ig, "-qt-paragraph-type:empty\"><br><")
  // Qt에서 <br> 처리를 이상하게 하는데 텍스트 사이의 <br>은 정상적으로 처리하나 태그가 앞이나 뒤에 붙으면 한칸으로 처리를 한다.
  // 모바일에서 문재가 되서 다 삭제하고 입력기에서 <br>만 처리하도록 한다.
  // htmlText = htmlText.replace(/><br></ig, ">&nbsp;<").replace(/<br></ig, "&nbsp;<")
  //return `<div style="font-family:'스냅스 윤고딕 700' font-size:10px">${htmlText}</div>`

  //아래처럼 스타일로 주게되면 Qt에서의 우선순위가 달라서 인라인으로 준 스타일보다 아래 스타일이 우선이 되어서 문제가 된다.
  //return `<style> p,div{font-family:'스냅스 윤고딕 700' font-size:6px}</style>${htmlText}`

  return `<div style="${defaultStyle}">${htmlText}</div>`
}

//return htmlText.replace(/(<div>|<p>)(<br>)(<\/div>|<\/p>)/ig, "<br>")
