# [Udemy gatsby course](https://www.udemy.com/course/gatsby-js-developers-guide-important-parts-blog-app)

## What?
Udemy gatsby 강의. 나는 지금 우리병원 홈페이지를 gatsby로 빌드할 생각을 가지고 있다.
그래서 gatsby 기초를 배우려고 수강하고 있는데, 강의 대상이 보면 모든 대상이기 때문에, 강의 내용은 길어 보이지만, 사실상 너무 기초적인 것을 알려줘서 내가 굳이 안들어야 하는 부분도 있기 때문에 그런 부분은 스킵하면서 넘어갈 예정이다. 특히 앞 부분인 gatsby-cli를 통해서 페이지를 만들고 설정하는 부분들은 내가 tutorial에서 이미 한 부분이기 때문에 넘어갈 예정이다. ([Tutorial 정리](https://pleed0215.github.io/gatsby/v4-tutorial/))

## 3. Styles & Template
여기 강의에서는 scss로 스타일링을 할 예정이기 때문에 `gatsby-plugin-sass`을 설치해줘야 한다.
홈페이지에 검색하면 나오겠지만..
``npm install sass gatsby-plugin-sass`` npm으로 일단 설치해주고..
`gatsby-config.js` 파일에서..`gatsby-plugin-sass`를 추가해준다.

### [gatsby-browser.js?](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/)

> The file `gatsby-browser.js` lets you respond to Gatsby-specific events within the browser, and wrap your page components in additional global components. The Gatsby Browser API gives you many options for interacting with the [client-side](https://www.gatsbyjs.com/docs/glossary#client-side) of Gatsby.

요약하자면, 브라우져에서 발생하는 이벤트에 응답하거나, page component를 감싸는 추가적인 global component를 사용하기 위함이다.

강의에서는 그래서 먼저 global style을 위해 global.scss 파일을 만들어서 gatsby-browser.js에 링크하는 방법을 설명해준다.

## 4. Gatsby
