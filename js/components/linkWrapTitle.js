class hero_component_LinkWrap_Title extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        let text = this.getAttribute('text').replace(/(\r\n|\n|\r)/gm, "<br>");
        this.shadowRoot.innerHTML = `
                <style>
                    h2 {
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                        font-size: 22px;
                        width: calc(100% - 104px);
                        font-weight: 600;
                        line-height: 140%;
                        padding: 0 0 8px 0; 
                        margin: 0;
                    }
                    @media all and (max-width: 480px){
                        h2 {
                            width: auto;
                            padding: 0 0 24px 0;
                        }
                    }
                </style>
                <h2>${text} 시리즈의 다른 기사도 살펴보세요</h2>
            `;
        this.h2 = this.shadowRoot.querySelector('h2');
    }
}

customElements.define('link-wrap-title', hero_component_LinkWrap_Title);