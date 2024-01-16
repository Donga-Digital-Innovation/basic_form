class hero_component_Outline_Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['color', 'border-color', 'hover-color']; // 관찰할 속성 지정
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color' && this.button) {
            this.button.style.color = newValue;
        } else if (name === 'border-color') {
            this.style.setProperty('--border-color', newValue);
        } else if (name === 'hover-color') {
            this.style.setProperty('--hover-color', newValue);
        }
    }

    connectedCallback(){
        let text = this.getAttribute('text');
        let color = this.getAttribute('color');
        let border_color = this.getAttribute('border-color');
        let hover_color = this.getAttribute('hover-color');

        this.style.setProperty('--border-color', border_color);
        this.style.setProperty('--hover-color', hover_color);
        this.shadowRoot.innerHTML = `
                <style>
                    button {
                        background-color: transparent;
                        color: ${color};
                        padding: 9px 17px;
                        border: 1px solid var(--border-color);
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: 700;
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                    }

                    button:hover{
                        border: 1px solid var(--hover-color);
                    }
                </style>
                <button>${text}</button>
            `;
        this.button = this.shadowRoot.querySelector('button');
    }
}

customElements.define('hero-outline-button', hero_component_Outline_Button);