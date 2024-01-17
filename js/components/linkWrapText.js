class hero_component_LinkWrap_Text extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        let text = this.getAttribute('text').replace(/(\r\n|\n|\r)/gm, "<br>");
        let link = this.getAttribute('link');
        this.shadowRoot.innerHTML = `
                <style>
                    p {
                        position: relative;
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                        font-size: 16px;
                        line-height: 150%;
                        margin: 0;
                    }
                    a {
                        color: var(--color-primary-cyan);
                        font-weight: 700;
                        text-decoration: underline;
                        margin: 0;
                    }
                </style>
                <p>${text}<br><br>신문에 연재된 텍스트 기사는 <a href=${link} target="_blank">이 링크</a>를 눌러 읽으실 수 있습니다.</p>
            `;
        this.p = this.shadowRoot.querySelector('p');
        this.a = this.shadowRoot.querySelector('a');
    }
}

customElements.define('link-wrap-text', hero_component_LinkWrap_Text);