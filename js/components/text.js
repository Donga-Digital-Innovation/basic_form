class hero_component_MainText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        let text = this.getAttribute('text').replace(/(\r\n|\n|\r)/gm, "<br>");
        let color = this.getAttribute('color');
        this.shadowRoot.innerHTML = `
                <style>
                    p {
                        color: ${color};
                        max-width: 640px;
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                        font-size: 18px;
                        letter-spacing: -2%;
                        line-height: 180%;
                        margin: 0;
                        padding-bottom: 40px;
                    }
                    @media all and (max-width: 768px){
                        p {
                            margin: 0 24px;
                            font-size: 16px;
                            letter-spacing: -3%;
                            line-height: 150%;
                        }
                    }
                </style>
                <p>${text}</p>
            `;
    }
}

customElements.define('main-text', hero_component_MainText);