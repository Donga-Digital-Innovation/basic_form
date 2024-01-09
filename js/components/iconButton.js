class hero_component_Icon_Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        let text = this.getAttribute('text');
        let img = this.getAttribute('img');
        let alt = this.getAttribute('alt');
        let color = this.getAttribute('color');
        this.shadowRoot.innerHTML = `
                <style>
                    button {
                        font-size: 13px;
                        line-height: 100%;
                        color: ${color};
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: transparent;
                        border: none;
                        padding: 0;
                        font-weight: 500;
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                    }

                    button img{
                        width: 14px;
                    }

                    button:hover{
                        text-decoration: underline;
                        text-decoration-thickness: 1px;
                        text-decoration-color: ${color};
                        text-underline-position: under;
                    }
                </style>
                <button>${text} <img src="${img}" alt="${alt}" /></button>
            `;
    }
}

customElements.define('hero-icon-button', hero_component_Icon_Button);