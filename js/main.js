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
const container = document.querySelector(".container");
const progress_bar = document.querySelector(".bar_progress");
const sub_header_con = document.querySelector(".sub_header_con");
const logo = document.querySelector(".logo");
const hero_contents_logo = document.querySelector(".hero_contents_logo");
const share_btn = document.querySelector(".btn_share02");
const comment_btn = document.querySelector(".btn_reply");
const byline = document.querySelector(".byline");
const link_wrap_header = document.querySelector(".link_wrap_header");
const byline_text = document.querySelector(".byline_text");
const hero_icon_btn = document.querySelectorAll("hero-icon-button");
const the_original = document.querySelector("#the_original");
const the_original_title_box = document.querySelector(".tit_cont");
const the_original_title = document.querySelectorAll(".tit");
const the_original_text = document.querySelectorAll(".cont_info");
const hero_link = document.querySelector("hero-link");
const share_layer = document.querySelector(".share_layer");
const share_layer_title = share_layer.children[0];
const share_layer_close_btn = share_layer.children[2];
const share_list = document.querySelector(".share_list");
const facebook = document.querySelector(".icon_facebook");
const twitter = document.querySelector(".icon_twitter");
const kakao = document.querySelector(".icon_kakaotalk");
const link_copy = document.querySelector(".btn_copyurl");
const url_txt = document.querySelector("#urlTxt");

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
    logo.children[0].children[0].src = container.classList.contains("dark-mode") ? "https://image.donga.com/pc/2022/images/common/btn_donga05.png" : "https://image.donga.com/pc/2022/images/common/logo_donga01.png";
    hero_contents_logo.children[0].children[0].src = container.classList.contains("dark-mode") ? "../images/logo_white.svg" : "../images/logo_black.svg"
    share_btn.style.backgroundImage = container.classList.contains("dark-mode") ? 'url(../images/share_icon_white.svg)' : 'url(../images/share_icon.svg)'
    comment_btn.style.backgroundImage = container.classList.contains("dark-mode") ? 'url(../images/comment_icon_white.svg)' : 'url(../images/comment_icon.svg)'
    progress_bar.style.borderBottom = container.classList.contains("dark-mode") ? "2px solid var(--color-neutral-white-100)" : "2px solid var(--color-neutral-black-100)";
    progress_bar.style.background = container.classList.contains("dark-mode") ? "var(--color-neutral-black-100)" : "#f8f8f8";
    byline.style.background = container.classList.contains("dark-mode") ? "var(--color-neutral-black-100)" : "var(--color-neutral-white-100)";
    byline.style.color = container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)";
    link_wrap_header.style.borderBottom = container.classList.contains("dark-mode") ? "2px solid var(--color-neutral-white-50)" : "2px solid var(--color-neutral-black-50)";
    byline_text.style.color = container.classList.contains("dark-mode") ? "var(--color-neutral-gray4)" : "inherit";
    the_original.style.background = container.classList.contains("dark-mode") ? "var(--color-neutral-black-100)" : "var(--color-neutral-white-100)";
    the_original_title_box.style.borderBottom = container.classList.contains("dark-mode") ? "2px solid var(--color-neutral-white-50)" : "2px solid var(--color-neutral-black-50)";
    the_original_title.forEach((v) => {
        v.style.color = container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)";
    })
    the_original_text.forEach((v) => {
        v.children[1].style.color = container.classList.contains("dark-mode") ? "var(--color-neutral-gray4)" : "var(--color-neutral-gray2)";
    })
    hero_link.setAttribute("color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)")
    hero_link.setAttribute("fill-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)")
    hero_link.setAttribute("border-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-gray4)")
    hero_link.setAttribute("hover-color", container.classList.contains("dark-mode") ? "var(--color-neutral-white-50)" : "var(--color-neutral-gray2)")
    share_layer.style.background = container.classList.contains("dark-mode") ? "var(--color-neutral-gray1-100)" : "var(--color-neutral-white-100)";
    share_layer_title.style.color = container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)";
    for(let i = 0; i<4; i++){
        share_list.children[i].style.color = container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)";
        if(i !== 3){
            share_list.children[i].children[0].children[0].classList.toggle("dark-mode");
        } else {
            share_list.children[i].children[1].classList.toggle("dark-mode")
        }
    }
    share_layer_close_btn.style.backgroundImage = container.classList.contains("dark-mode") ? "url(../images/close_icon_white.svg)" : "url(https://image.donga.com/pc/2022/images/common/share_close.png)"
    facebook.style.backgroundImage = container.classList.contains("dark-mode") ? "url(../images/facebook_icon_white.svg)" : "url(../images/facebook_icon.svg)";
    twitter.style.backgroundImage = container.classList.contains("dark-mode") ? "url(../images/x_icon_white.svg)" : "url(../images/x_icon.svg)";
    kakao.style.backgroundImage = container.classList.contains("dark-mode") ? "url(../images/kakao_icon_white.svg)" : "url(../images/kakao_icon.svg)";
    link_copy.style.backgroundImage = container.classList.contains("dark-mode") ? "url(../images/Link_copy_icon_white.svg)" : "url(../images/Link_copy_icon.svg)";
    url_txt.style.color = container.classList.contains("dark-mode") ? "var(--color-neutral-white-100)" : "var(--color-neutral-black-100)";
    url_txt.style.backgroundColor = container.classList.contains("dark-mode") ? "var(--color-neutral-gray1-100)" : "var(--color-neutral-white-100)";
})

// 문서 내용 ArchieML로 가져오기
// Google Docs API 클라이언트 초기화
// gapi.load('client', () => {
//     gapi.client.init({
//         apiKey: 'AIzaSyCfwOA1VhTqcSf11TBeDEQr3SEpch0w51Q', // Google Cloud Console에서 생성한 API 키
//         clientId: '973914274663-mskubufdipnobdj0bv97vp93nbvgn4d7.apps.googleusercontent.com', // Google Cloud Console에서 생성한 클라이언트 ID
//         discoveryDocs: ['https://docs.googleapis.com/$discovery/rest?version=v1'],
//         scope: 'https://www.googleapis.com/auth/documents.readonly', // 문서 읽기 권한
//         plugin_name:'App Name that you used in google developer console API', // 이전 방식 사용때문에 환경 개선안
//     }).then(() => {
//         const authInstance = gapi.auth2.getAuthInstance();
//         if (!authInstance.isSignedIn.get()) {
//             authInstance.signIn();
//         }
//         return gapi.client.docs.documents.get({
//             documentId: '17wpUtjNytr6i8b_jzznFBMzXQwI5yG3pcOArSD6rVEQ' // 가져올 문서의 ID
//         });
//     }).then((response) => {
//         const documentContent = response.result.body.content; 
//         let data_entire = "";
//         for(let i =1; i<documentContent.length; i++){
//             for(let j =0; j<documentContent[i].paragraph.elements.length; j++){
//                 data_entire += documentContent[i].paragraph.elements[j].textRun.content
//             }
//         }
//         const data = archieml.load(data_entire) // ArchieML처리
//         console.log(data); // 가져온 문서 내용을 출력
//     }).catch(error => {
//         console.error("Error fetching the document:", error);
//     });
// });

// function handleClientLoad() {
//     gapi.load('client:auth2', initClient);
// }

// function initClient() {
//     gapi.client.init({
//         apiKey: 'AIzaSyCfwOA1VhTqcSf11TBeDEQr3SEpch0w51Q',
//         clientId: '973914274663-mskubufdipnobdj0bv97vp93nbvgn4d7.apps.googleusercontent.com',
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
//         scope: 'https://www.googleapis.com/auth/drive.readonly',
//         plugin_name:'App Name that you used in google developer console API', // 이전 방식 사용때문에 환경 개선안
//     }).then(() => {
//         const authInstance = gapi.auth2.getAuthInstance();
//         if (!authInstance.isSignedIn.get()) {
//             authInstance.signIn();
//         }
//         return gapi.client.drive.files.get({
//             fileId: '1lmO3rCywJsdkD1wrrBpvBLUDuAjML_9U',
//             alt: 'media'
//         });
//     }).then((response) => {
//         const css = response.body;
//         const style = document.createElement('style');
//         style.textContent = css;
//         document.head.appendChild(style);
//     });
// }

// // 이벤트 리스너를 사용하여 문서가 로드된 후에 함수를 실행
// document.addEventListener('DOMContentLoaded', handleClientLoad);