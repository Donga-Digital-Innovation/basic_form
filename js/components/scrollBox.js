class hero_component_ScrollBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        let text = this.getAttribute('text');
        let color = this.getAttribute('color');
        let back_color = this.getAttribute('back-color');
        this.shadowRoot.innerHTML = `
                <style>
                    p {
                        background-color: ${back_color};
                        color: ${color};
                        max-width: 640px;
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                        padding: 32px;
                        font-size: 18px;
                        letter-spacing: -2%;
                        line-height: 180%;
                        border-radius: 8px;
                    }
                    @media all and (max-width: 1024px){
                        p {
                            max-width: 343px;
                            font-size: 16px;
                            letter-spacing: -3%;
                            line-height: 160%;
                            padding: 16px;
                        }
                    }
                </style>
                <p>${text}</p>
            `;
    }
}

customElements.define('scroll-box', hero_component_ScrollBox);