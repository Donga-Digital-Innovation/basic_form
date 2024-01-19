class hero_component_Text_Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['color', 'fill-color']; // 관찰할 속성 지정
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color') {
            this.style.setProperty('--text-color', newValue);
        } else if (name === 'fill-color') {
            this.style.setProperty('--fill-color', newValue);
        }
    }
    
    connectedCallback(){
        // 디폴트 값 설정을 넣어놓는 게 좋을 것 같음.
        let text = this.getAttribute('text');
        let svgData = this.getAttribute('svg-data');
        let color = this.getAttribute('color');
        let fill_color = this.getAttribute('fill-color') || "var(--color-neutral-gray1-50)";

        this.style.setProperty('--text-color', color);
        this.style.setProperty('--fill-color', fill_color);

        this.shadowRoot.innerHTML = `
                <style>
                    button {
                        font-size: 13px;
                        line-height: 100%;
                        color: var(--text-color);
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

                    svg {
                        width: 14px;
                    }

                    path {
                        fill: var(--fill-color);
                    }

                    button:hover {
                        text-decoration: underline;
                        text-decoration-thickness: 1px;
                        text-decoration-color: var(--text-color);
                        text-underline-position: under;
                    }
                </style>
                <button>${text} ${svgData}</button>
            `;
        this.button = this.shadowRoot.querySelector('button');
        this.svg = this.shadowRoot.querySelector('svg');
    }
}

customElements.define('hero-text-button', hero_component_Text_Button);