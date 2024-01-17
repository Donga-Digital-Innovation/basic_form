class hero_component_LinkImage_Title extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        let text = this.getAttribute('text').replace(/(\r\n|\n|\r)/gm, "<br>");
        let num = this.getAttribute('num');
        let present = this.getAttribute('present') ? 0.4 : 1 || 1;
        this.shadowRoot.innerHTML = `
                <style>
                    h3 {
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                        font-size: 18px;
                        font-weight: 700;
                        line-height: 150%;
                        opacity: ${present};
                        margin: 16px 0 0 0;
                    }
                    span {
                        margin: 0 14px 0 0;
                    }
                    @media all and (max-width: 480px){
                        h3 {
                            margin: 14px 0 0 0;
                        }
                    }
                </style>
                <h3><span>${num}화</span>${text}</h3>
            `;
        this.h3 = this.shadowRoot.querySelector('h3');
    }
}

customElements.define('link-image-title', hero_component_LinkImage_Title);