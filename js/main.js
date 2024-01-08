import './components/button.js';
import './components/outlineButton.js';
import './components/iconButton.js';
import './components/scrollBox.js';
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

const mode_btn = document.querySelector("hero-button");
const container = document.querySelector(".container");

mode_btn.addEventListener("click", () => {
    container.classList.toggle("dark-mode")
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