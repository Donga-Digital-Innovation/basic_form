import './components/linkImageTitle.js';
import './components/outlineButton.js';
import './components/linkWrapTitle.js';
import './components/linkWrapText.js';
import './components/bylineInfo.js';
import './components/iconButton.js';
import './components/textButton.js';
import './components/linkImage.js';
import './components/scrollBox.js';
import './components/heroLink.js';
import './components/button.js';
import './components/text.js';

//ios, android distinguish
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = /Android/.test(navigator.userAgent);

if(isIOS){
    let vh = Math.max(document.documentElement.clientHeight, window.innerHeight) * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
} else {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

//Cookie의 SameSite 속성은 서로 다른 도메인간의 쿠키 전송에 대한 보안을 설정합니다.
//크롬 정책으로 속성값이 None에서 Lax로 바뀌었기 때문에 이를 설정해 주었습니다.
document.cookie = "safeCookie=donga;"; 
document.cookie = "crossCookie=bar; SameSite=None; Secure";

//isMobile
const isMobile = navigator.maxTouchPoints > 0;
const mouseDown = !isMobile ? "mousedown" : "touchstart";
const mouseMove = !isMobile ? "mousemove" : "touchmove";
const mouseUp = !isMobile ? "mouseup" : "touchend";

//Darkmode용 코드
const mode_btn = document.querySelector("hero-button");
const scroll_box = document.querySelectorAll("scroll-box");
const main_text = document.querySelectorAll("main-text");
const hero_outline_btn = document.querySelector("hero-outline-button");
const hero_text_btn = document.querySelector("hero-text-button");
const container = document.querySelector("#container");
const sub_header_con = document.querySelector(".sub_header_con");
const donga_logo = document.getElementById(document.querySelector('.logo svg use').getAttribute('href').substring(1)).querySelector('path');
const hero_contents_logo = document.querySelector(".hero_contents_logo");
const share_btn = document.getElementById(document.querySelectorAll('.ic svg use')[0].getAttribute('href').substring(1)).querySelector('path');
const comment_btn = document.getElementById(document.querySelectorAll('.ic svg use')[5].getAttribute('href').substring(1)).querySelector('path');
const byline = document.querySelector(".byline");
const link_wrap_header = document.querySelector(".link_wrap_header");
const byline_text = document.querySelector(".byline_text");
const hero_icon_btn = document.querySelectorAll("hero-icon-button");
const the_original = document.querySelector("#the_original");
const the_original_title_box = document.querySelector(".tit_cont");
const the_original_title = document.querySelectorAll(".tit");
const the_original_text = document.querySelectorAll(".cont_info");
const hero_link = document.querySelector("hero-link");

mode_btn.addEventListener("click", () => {
    container.classList.toggle("dark-mode");

    document.documentElement.style.setProperty('--color-primary-cyan', container.classList.contains("dark-mode") ? '#00B5B8' : '#008689');
    mode_btn.setAttribute("text", container.classList.contains("dark-mode") ? "LIGHT MODE" : "DARK MODE");
    hero_outline_btn.setAttribute("color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)");
    hero_outline_btn.setAttribute("border-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-gray4)");
    hero_outline_btn.setAttribute("hover-color", container.classList.contains("dark-mode") ? "var(--color-neutral-gray2)" : "var(--color-neutral-black-100)");
    hero_text_btn.setAttribute("color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-gray2)");
    hero_text_btn.setAttribute("fill-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-gray1-50)");
    hero_icon_btn.forEach((v) => {
        v.setAttribute("fill-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)")
        v.setAttribute("border-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-gray4)")
        v.setAttribute("hover-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-50)" : "var(--color-neutral-gray2)")
    })
    scroll_box.forEach((v) => {
        v.setAttribute("color", container.classList.contains("dark-mode") ? "var(--color-neutral-black-100)" : "var(--color-neutral-white-100)");
        v.setAttribute("back-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-75)" : "var(--color-neutral-black-75)");
    })
    main_text.forEach((v) => {
        v.setAttribute("color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)");
    })

    sub_header_con.style.background = container.classList.contains("dark-mode") ? "var(--color-neutral-gray1-100)" : "var(--color-neutral-white-100)";
    sub_header_con.style.borderBottom = container.classList.contains("dark-mode") ? "2px solid var(--color-neutral-black-100)" : "2px solid #f8f8f8";
    donga_logo.setAttribute("fill", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color, #111111)")
    hero_contents_logo.children[0].children[0].src = container.classList.contains("dark-mode") ? "../images/logo_white.svg" : "../images/logo_black.svg"
    share_btn.setAttribute("fill", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color, #111111)")
    comment_btn.setAttribute("fill", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color, #111111)")
    byline.style.background = container.classList.contains("dark-mode") ? "var(--color-neutral-black-100)" : "var(--color-neutral-white-100)";
    byline.style.color = container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)";
    link_wrap_header.style.borderBottom = container.classList.contains("dark-mode") ? "2px solid var(--color-neutral-white-50)" : "2px solid var(--color-neutral-black-50)";
    byline_text.style.color = container.classList.contains("dark-mode") ? "var(--color-neutral-gray4)" : "inherit";
    the_original.style.background = container.classList.contains("dark-mode") ? "var(--color-neutral-black-100)" : "var(--color-neutral-white-100)";
    the_original_title_box.style.borderBottom = container.classList.contains("dark-mode") ? "2px solid var(--color-neutral-white-50)" : "2px solid var(--color-neutral-black-50)";
    the_original_title.forEach((v, i) => {
        if(i !== 0){
            v.style.color = container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)";
        }
    })
    the_original_text.forEach((v) => {
        v.children[1].style.color = container.classList.contains("dark-mode") ? "var(--color-neutral-gray4)" : "var(--color-neutral-gray2)";
    })
    hero_link.setAttribute("color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)")
    hero_link.setAttribute("fill-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)")
    hero_link.setAttribute("border-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-gray4)")
    hero_link.setAttribute("hover-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-50)" : "var(--color-neutral-gray2)")
})


//article 불러오는 함수
async function fetchDynamoDBArticleData() {
    try {
        const ProjectName = "basic_form"
        const response = await fetch(`https://nejcsnqedlknfloylmfdverope0ptezn.lambda-url.ap-southeast-2.on.aws/?ProjectName=${ProjectName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const article = archieml.load(data.article_Data[0].Article) // ArchieML처리
        main_text[0].setAttribute("text", article['내용1']);
        console.log(article); // 가져온 문서 내용을 출력

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = fetchDynamoDBArticleData;