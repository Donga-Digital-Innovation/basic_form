class hero_component_ScrollBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['color', 'back-color']; // 관찰할 속성 지정
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color' && this.p) {
            this.p.style.color = newValue;
        }
        else if (name === 'back-color' && this.p) {
            this.p.style.backgroundColor = newValue;
        }
    }

    connectedCallback(){
        let text = this.getAttribute('text').replace(/(\r\n|\n|\r)/gm, "<br>");
        let color = this.getAttribute('color');
        let back_color = this.getAttribute('back-color');
        this.shadowRoot.innerHTML = `
                <style>
                    p {
                        background-color: ${back_color};
                        color: ${color};
                        font-weight: 300;
                        width: 640px;
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                        padding: 32px;
                        font-size: 18px;
                        letter-spacing: -0.02em;
                        line-height: 180%;
                        margin: 0 24px;
                        margin-bottom: 40px;
                        border-radius: 8px;
                    }
                    @media all and (max-width: 1024px){
                        p {
                            width: 342px;
                            font-size: 16px;
                            letter-spacing: -0.03em;
                            line-height: 160%;
                            padding: 16px;
                        }
                    }
                </style>
                <p>${text}</p>
            `;
        this.p = this.shadowRoot.querySelector('p');
    }
}

customElements.define('scroll-box', hero_component_ScrollBox);